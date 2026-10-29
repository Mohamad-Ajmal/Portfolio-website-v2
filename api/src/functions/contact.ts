import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import nodemailer from "nodemailer";

import { allowedServices } from "../config/contact";

import {
  buildClientEmail,
  buildOwnerEmail,
} from "../lib/contact-emails";

const OWNER_NAME = "Ajmal Ibrahimkhail";
const MAX_BODY_BYTES = 20_000;
const RESPONSE_HEADERS = { "Cache-Control": "no-store" };

function fail(
  message: string,
  status: number,
): HttpResponseInit {
  return {
    status,
    headers: RESPONSE_HEADERS,
    jsonBody: {
      message,
    },
  };
}

function getErrorCode(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "code" in error
  ) {
    return String(error.code);
  }

  return "UNKNOWN";
}

async function contact(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const contentType =
    request.headers.get("content-type");

  if (
    !contentType
      ?.toLowerCase()
      .includes("application/json")
  ) {
    return fail(
      "Unsupported request format.",
      415,
    );
  }

  let body: unknown;

  try {
    const rawBody = await request.text();

    if (
      new TextEncoder()
        .encode(rawBody)
        .length > MAX_BODY_BYTES
    ) {
      return fail(
        "Your message is too long.",
        413,
      );
    }

    body = JSON.parse(rawBody);
  } catch {
    return fail(
      "Invalid request. Please try again.",
      400,
    );
  }

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body)
  ) {
    return fail(
      "Invalid form data.",
      400,
    );
  }

  const data =
    body as Record<string, unknown>;

  function readText(key: string): string {
    const value = data[key];

    return typeof value === "string"
      ? value.trim()
      : "";
  }

  const fullName = readText("fullName");
  const email = readText("email");
  const phone = readText("phone");
  const subject = readText("subject");
  const message = readText("message");

  // -------------------------
  // Validation
  // -------------------------

  if (
    !fullName ||
    fullName.length > 100 ||
    /[\r\n]/.test(fullName)
  ) {
    return fail(
      "Please enter a valid full name.",
      400,
    );
  }

  if (
    !email ||
    email.length > 254 ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(
      email,
    )
  ) {
    return fail(
      "Please enter a valid email address.",
      400,
    );
  }

  if (
    phone.length > 40 ||
    /[\r\n]/.test(phone)
  ) {
    return fail(
      "Please check your phone number.",
      400,
    );
  }

  if (
    !allowedServices.includes(subject)
  ) {
    return fail(
      "Please choose a valid service.",
      400,
    );
  }

  if (
    !message ||
    message.length > 3000
  ) {
    return fail(
      "Please enter a message of up to 3,000 characters.",
      400,
    );
  }

  // -------------------------
  // SMTP configuration
  // -------------------------

  const user =
    process.env.SMTP_USER?.trim();

  const password =
    process.env.SMTP_PASS?.replace(
      /\s/g,
      "",
    );

  const recipient =
    process.env.CONTACT_TO?.trim() ||
    user;

  if (
    !user ||
    !password ||
    !recipient
  ) {
    context.error(
      "Contact email configuration is missing.",
    );

    return fail(
      "The form is temporarily unavailable. Please contact me directly.",
      503,
    );
  }

  const enquiry = {
    fullName,
    email,
    phone,
    subject,
    message,
  };

  const transporter =
    nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,

      auth: {
        user,
        pass: password,
      },

      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,

      disableFileAccess: true,
      disableUrlAccess: true,
    });

  // -------------------------
  // Send enquiry to owner
  // -------------------------

  try {
    const ownerResult =
      await transporter.sendMail({
        from: {
          name: `${OWNER_NAME} | Website enquiries`,
          address: user,
        },

        to: recipient,

        replyTo: {
          name: fullName,
          address: email,
        },

        ...buildOwnerEmail(enquiry),
      });

    if (
      !ownerResult.accepted.length
    ) {
      throw new Error(
        "Owner notification was not accepted.",
      );
    }
  } catch (error) {
    context.error(
      "Owner notification failed:",
      getErrorCode(error),
    );

    return fail(
      "Your message couldn’t be submitted. Please try again or contact me directly.",
      502,
    );
  }

  // -------------------------
  // Send confirmation
  // -------------------------

  let confirmationSent = false;

  try {
    const confirmationResult =
      await transporter.sendMail({
        from: {
          name: OWNER_NAME,
          address: user,
        },

        to: {
          name: fullName,
          address: email,
        },

        replyTo: {
          name: OWNER_NAME,
          address: recipient,
        },

        headers: {
          "Auto-Submitted":
            "auto-replied",

          "X-Auto-Response-Suppress":
            "All",
        },

        ...buildClientEmail(enquiry),
      });

    confirmationSent =
      confirmationResult
        .accepted
        .length > 0;

    if (!confirmationSent) {
      context.error(
        "Client confirmation was not accepted.",
      );
    }
  } catch (error) {
    context.error(
      "Client confirmation failed:",
      getErrorCode(error),
    );
  }

  return {
    status: 200,
    headers: RESPONSE_HEADERS,

    jsonBody: {
      message: confirmationSent
        ? "Thank you! Your enquiry has been submitted. A confirmation email is on its way—please check your inbox or spam folder."
        : "Thank you! Your enquiry has been submitted, but we couldn’t send the confirmation email. There’s no need to submit again.",
    },
  };
}

app.http("contact", {
  methods: ["POST"],

  authLevel: "anonymous",

  route: "contact",

  handler: contact,
});
const OWNER_NAME = "Ajmal Ibrahimkhail";

type ContactEmailData = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

function escapeHtml(value: string): string {
  const characters: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return value.replace(/[&<>"']/g, (character) => characters[character]);
}

function formatMessage(value: string): string {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, "<br />");
}

function paragraph(content: string): string {
  return `
    <p style="
      margin:0 0 18px;
      color:#262626;
      font-size:15px;
      line-height:1.85;
    ">
      ${content}
    </p>
  `;
}

function signature(): string {
  return `
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="margin-top:26px;"
    >
      <tr>
        <td style="padding-bottom:15px;">
          <p style="
            margin:0;
            color:#262626;
            font-size:15px;
            line-height:1.8;
          ">
            Best regards,
          </p>
        </td>
      </tr>

      <tr>
        <td style="border-left:3px solid #ff4c00;padding-left:14px;">
          <p style="
            margin:0;
            color:#202020;
            font-size:16px;
            line-height:1.5;
            font-weight:700;
          ">
            ${escapeHtml(OWNER_NAME)}
          </p>

          <p style="
            margin:4px 0 0;
            color:#666666;
            font-size:12px;
            line-height:1.7;
          ">
            Web &amp; app development · AI &amp; automation
          </p>
        </td>
      </tr>
    </table>
  `;
}

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <th
        scope="row"
        align="left"
        valign="top"
        style="
          width:92px;
          padding:10px 12px 10px 0;
          border-bottom:1px solid #eaded8;
          color:#666666;
          font-size:13px;
          line-height:1.7;
          font-weight:400;
        "
      >
        ${escapeHtml(label)}
      </th>

      <td
        valign="top"
        style="
          padding:10px 0;
          border-bottom:1px solid #eaded8;
          color:#262626;
          font-size:13px;
          line-height:1.7;
          word-break:break-word;
          overflow-wrap:anywhere;
        "
      >
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function enquirySummary(
  data: ContactEmailData,
  includeContactDetails: boolean,
): string {
  return `
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="
        margin-top:28px;
        border-top:1px solid #eaded8;
      "
    >
      <tr>
        <td style="padding-top:22px;">
          <h2 style="
            margin:0 0 12px;
            color:#ab4219;
            font-size:14px;
            line-height:1.5;
            font-weight:700;
          ">
            ${includeContactDetails ? "Enquiry details" : "Your enquiry"}
          </h2>

          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="border-collapse:collapse;"
          >
            <caption style="
              text-align:left;
              font-size:0;
              line-height:0;
              height:0;
              overflow:hidden;
            ">
              Submitted enquiry details
            </caption>

            ${
              includeContactDetails
                ? `
                  ${detailRow("Name", data.fullName)}
                  ${detailRow("Email", data.email)}
                  ${detailRow("Phone", data.phone || "Not provided")}
                `
                : ""
            }

            ${detailRow("Service", data.subject)}
          </table>

          <p style="
            margin:18px 0 9px;
            color:#666666;
            font-size:12px;
            line-height:1.6;
          ">
            ${includeContactDetails ? "Client message" : "Your message"}
          </p>

          <table
            role="presentation"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="background-color:#fff8f3;"
          >
            <tr>
              <td style="
                padding:16px 18px;
                border-left:2px solid #f6d2c3;
                color:#333333;
                font-size:14px;
                line-height:1.85;
                word-break:break-word;
                overflow-wrap:anywhere;
              ">
                ${formatMessage(data.message)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

function emailLayout({
  preview,
  title,
  content,
  footer,
}: {
  preview: string;
  title: string;
  content: string;
  footer: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="format-detection" content="telephone=no" />
    <title>${escapeHtml(title)}</title>
  </head>

  <body style="
    margin:0;
    padding:0;
    background-color:#faf7f5;
    color:#262626;
    font-family:Arial,Helvetica,sans-serif;
    -webkit-text-size-adjust:100%;
  ">
    <div style="
      display:none;
      max-height:0;
      max-width:0;
      overflow:hidden;
      opacity:0;
      font-size:1px;
      line-height:1px;
      mso-hide:all;
    ">
      ${escapeHtml(preview)}
    </div>

    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="background-color:#faf7f5;"
    >
      <tr>
        <td align="center" style="padding:28px 12px;">
          <!--[if mso]>
          <table role="presentation" width="600" cellpadding="0" cellspacing="0">
            <tr><td>
          <![endif]-->

          <table
            role="presentation"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
              width:100%;
              max-width:600px;
              background-color:#ffffff;
              border:1px solid #eaded8;
              border-collapse:separate;
            "
          >
            <tr>
              <td
                height="3"
                style="
                  height:3px;
                  background-color:#ab4219;
                  font-size:0;
                  line-height:0;
                "
              >&nbsp;</td>
            </tr>

            <tr>
              <td style="padding:28px 24px 22px;">
                <p style="
                  margin:0;
                  color:#ab4219;
                  font-size:18px;
                  line-height:1.5;
                  font-weight:700;
                  letter-spacing:-0.4px;
                ">
                  ${escapeHtml(OWNER_NAME)}<span style="color:#ff4c00;">.</span>
                </p>

                <p style="
                  margin:5px 0 0;
                  color:#777777;
                  font-size:11px;
                  line-height:1.6;
                  letter-spacing:0.5px;
                ">
                  DESIGN · DEVELOPMENT · AUTOMATION
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 24px;">
                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tr>
                    <td style="
                      border-top:1px solid #eaded8;
                      font-size:0;
                      line-height:0;
                    ">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:26px 24px 30px;">
                <h1 style="
                  margin:0 0 24px;
                  color:#202020;
                  font-size:21px;
                  line-height:1.45;
                  font-weight:700;
                  letter-spacing:-0.3px;
                ">
                  ${escapeHtml(title)}
                </h1>

                ${content}
              </td>
            </tr>

            <tr>
              <td style="
                padding:18px 24px;
                border-top:1px solid #eaded8;
                background-color:#fffaf7;
              ">
                <p style="
                  margin:0;
                  color:#777777;
                  font-size:11px;
                  line-height:1.8;
                ">
                  ${escapeHtml(footer)}
                </p>
              </td>
            </tr>
          </table>

          <!--[if mso]>
            </td></tr>
          </table>
          <![endif]-->
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildClientEmail(data: ContactEmailData) {
  const firstName = data.fullName.trim().split(/\s+/)[0];

  return {
    subject: "Your project enquiry — Ajmal Ibrahimkhail",

    text: [
      `Hi ${firstName},`,
      "",
      "Thank you for getting in touch and sharing what you have in mind.",
      "",
      `I’ve received your enquiry about ${data.subject}. I’ll review your message and follow up personally to discuss what you need and how I can help.`,
      "",
      "If you have a website link, a reference, or a preferred timeline to share, you can reply directly to this email.",
      "",
      "Best regards,",
      OWNER_NAME,
      "Web & app development · AI & automation",
      "",
      "YOUR ENQUIRY",
      `Service: ${data.subject}`,
      "",
      data.message,
      "",
      "This email confirms that your enquiry was received. It was sent automatically; my follow-up will be personal. If you didn’t submit this enquiry, no action is needed.",
    ].join("\n"),

    html: emailLayout({
      preview:
        "Your enquiry is with me. I’ll review the details and follow up personally.",
      title: "Thank you for your enquiry.",
      content: `
        ${paragraph(`Hi ${escapeHtml(firstName)},`)}

        ${paragraph(
          "Thank you for getting in touch and sharing what you have in mind.",
        )}

        ${paragraph(`
          I’ve received your enquiry about
          <strong>${escapeHtml(data.subject)}</strong>.
          I’ll review your message and follow up personally to
          discuss what you need and how I can help.
        `)}

        ${paragraph(`
          If you have a website link, a reference, or a preferred
          timeline to share, you can reply directly to this email.
        `)}

        ${signature()}

        ${enquirySummary(data, false)}
      `,
      footer:
        "This email confirms that your enquiry was received. It was sent automatically; my follow-up will be personal. If you didn’t submit this enquiry, no action is needed.",
    }),
  };
}

export function buildOwnerEmail(data: ContactEmailData) {
  return {
    subject: `Project enquiry: ${data.subject} — ${data.fullName}`,

    text: [
      "New project enquiry",
      "",
      `${data.fullName} submitted an enquiry through your website.`,
      "",
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Service: ${data.subject}`,
      "",
      "CLIENT MESSAGE",
      data.message,
      "",
      "Reply to this email to contact the sender directly.",
    ].join("\n"),

    html: emailLayout({
      preview: `${data.fullName} — ${data.subject}`,
      title: "New project enquiry",
      content: `
        ${paragraph(`
          <strong>${escapeHtml(data.fullName)}</strong>
          submitted an enquiry through your website.
          Review their message and contact details below.
        `)}

        ${enquirySummary(data, true)}

        <p style="
          margin:24px 0 0;
          color:#555555;
          font-size:13px;
          line-height:1.8;
        ">
          <strong style="color:#ab4219;">Ready to follow up?</strong><br />
          Reply to this email to contact the sender directly.
        </p>
      `,
      footer:
        "Website contact form notification. Contact details and message content were provided by the sender.",
    }),
  };
}
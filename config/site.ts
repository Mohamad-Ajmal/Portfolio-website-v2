import type { Service } from "../types/services";
import type { ComponentProps } from "react";
import type ServiceCard from "../components/ui/ServiceCard";

type ServiceCardProps = ComponentProps<typeof ServiceCard>;

const LOGO_VERSION = "2";
export const siteConfig = {
  name: "Ajmal Ibrahimkhail",
  initials: "AI",

  // After adding public/images/profile.jpg, use:
  avatar: `/images/Profile-Picture.jpg?v=${LOGO_VERSION}`,

  // Paste your actual LinkedIn profile URL here.
  // The social button appears once this is provided.
  linkedinUrl: "https://www.linkedin.com/in/ajmalibrahimkhail",
};

export const navigation = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
] as const;

export type ClientLogo = {
  id: number;
  name: string;
  src: string;
};

export type StatisticIcon =
  | "calendar"
  | "projects"
  | "clients"
  | "success";

export type HeroStatistic = {
  icon: StatisticIcon;
  value: string;
  label: string;
};



export const clientLogos: ClientLogo[] = [
  {
    id: 1,
    name: "Kardan University",
    src: `/images/logos/Kardan-Univeristy.png?v=${LOGO_VERSION}`,
  },
  {
    id: 2,
    name: "Canadian School of Tashkent",
    src: `/images/logos/csttashkent_logo.jpg?v=${LOGO_VERSION}`,
  },
  {
    id: 3,
    name: "Kardan Center for Professional Development",
    src: `/images/logos/KCPDlogo.png?v=${LOGO_VERSION}`,
  },
  {
    id: 4,
    name: "Femstech World Wide",
    src: `/images/logos/fems-tech.png?v=${LOGO_VERSION}`,
  },
  {
    id: 5,
    name: "Kardan International School",
    src: `/images/logos/Kardan-International-School.png?v=${LOGO_VERSION}`,
  },
  {
    id: 6,
    name: "Kardan Private School",
    src: `/images/logos/Kardan-Private-School.png?v=${LOGO_VERSION}`,
  },
  {
    id: 7,
    name: "Kardan Girls School",
    src: `/images/logos/Kardan-Girls-School.png?v=${LOGO_VERSION}`,
  },
  {
    id: 8,
    name: "SMSF Audit Online",
    src: `/images/logos/smsf-logo.png?v=${LOGO_VERSION}`,
  },
  {
    id: 9,
    name: "Kardan University",
    src: `/images/logos/Kardan-Univeristy.png?v=${LOGO_VERSION}`,
  },
  {
    id: 10,
    name: "Canadian School of Tashkent",
    src: `/images/logos/csttashkent_logo.jpg?v=${LOGO_VERSION}`,
  },
  {
    id: 11,
    name: "Kardan Center for Professional Development",
    src: `/images/logos/KCPDlogo.png?v=${LOGO_VERSION}`,
  },
  {
    id: 12,
    name: "Femstech World Wide",
    src: `/images/logos/fems-tech.png?v=${LOGO_VERSION}`,
  },
];

// Sample figures from your current design.
export const heroStatistics: HeroStatistic[] = [
  {
    icon: "calendar",
    value: "2022",
    label: "In the industry",
  },
  {
    icon: "projects",
    value: "17+",
    label: "Projects completed",
  },
  {
    icon: "clients",
    value: "98%",
    label: "Client satisfaction",
  },
  {
    icon: "success",
    value: "100%",
    label: "Project success rate",
  },
];

export const heroContent = {
  heading: "Everything you need, under one roof.",
  bookingLabel: "Book a 1:1 Call",
  bookingHref: "https://calendly.com/ajmal-ibrahimkhail-work/30min",
  clientsHeading: "Trusted by these brands, & more...",
};

export const designQuote = {
  paragraphs: [
    [
      { text: "Don’t think what’s the " },
      { text: "cheapest", bold: true },
      { text: " way to do it or what’s the " },
      { text: "fastest", bold: true },
      { text: " way to do it." },
    ],
    [
      { text: "Think, what’s the " },
      { text: "most amazing", bold: true },
      { text: " way to do it?" },
    ],
  ],
  author: "Richard Branson",
} satisfies {
  paragraphs: { text: string; bold?: boolean }[][];
  author: string;
};


export const servicesIntro = {
  heading: [
    "Yes, you really can build",
    "it all with one partner.",
  ],
  description:
    "Websites, custom systems, AI automation, and hosting—all in one place.",
  buttonLabel: "Let’s talk",
  buttonHref: "/#contact",
};

export const serviceCards: Service[] = [
  {
    id: "website-development",
    title: "Website Design & Development",
    description:
      "Give your business a website that makes a strong first impression, explains what you offer, and helps customers take the next step.",
    theme: "rose",
    tabs: [
      {
        id: "business-websites",
        label: "Business websites",
        introduction:
          "A professional website built around your brand and the people you want to reach.",
        features: [
          "Custom design that reflects your business",
          "Responsive layouts for every screen",
          "Clear navigation and calls to action",
          "Fast-loading, accessible pages",
          "Easy content management",
        ],
        image: {
          src: "/images/services/business-websites.webp",
          alt: "Business website project preview",
        },
      },
      {
        id: "landing-pages",
        label: "Landing pages",
        introduction:
          "Turn campaign traffic into meaningful enquiries with a focused landing page.",
        features: [
          "A clear offer and focused message",
          "Layouts tailored to your campaign",
          "Lead forms and booking integrations",
          "Mobile-friendly browsing",
          "Analytics and conversion tracking",
        ],
        image: {
          src: "/images/services/landing-pages.webp",
          alt: "Landing page project preview",
        },
      },
      {
        id: "website-redesign",
        label: "Website redesign",
        introduction:
          "Give your existing website a clearer structure and a fresh, modern design.",
        features: [
          "Review of your current website",
          "Updated design and navigation",
          "Improved mobile experience",
          "Content migration and URL redirects",
          "Performance improvements",
        ],
        image: {
          src: "/images/services/website-redesign.webp",
          alt: "Website redesign project preview",
        },
      },
    ],
  },

  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    description:
      "Bring your business closer to your customers with an app designed around your brand, your services, and the way people use their phones.",
    theme: "orange",
    tabs: [
      {
        id: "ios-android",
        label: "iOS & Android",
        introduction:
          "Give your customers a consistent experience on iPhone and Android with a custom Flutter app.",
        features: [
          "Cross-platform development with Flutter",
          "Design tailored to your brand",
          "Secure sign-in and account management",
          "Integration with your existing systems",
          "Testing across screen sizes and devices",
        ],
        image: {
          src: "/images/services/mobile-app.webp",
          alt: "Branded mobile app displayed on iPhone and Android",
        },
      },
      {
        id: "push-notifications",
        label: "Push notifications",
        introduction:
          "Keep users informed with timely updates, useful reminders, and messages they can manage.",
        features: [
          "Notifications for important events and updates",
          "Messages tailored to user groups",
          "Scheduled reminders and announcements",
          "Notification preferences and permissions",
          "Links that open the relevant app screen",
        ],
        image: {
          src: "/images/services/push-notifications.webp",
          alt: "Mobile app notifications and message preferences",
        },
      },
      {
        id: "custom-app-screens",
        label: "Custom screens",
        introduction:
          "Build an app around what your users need to do, with clear navigation and thoughtfully designed screens.",
        features: [
          "Custom dashboards and user profiles",
          "Forms, bookings, and service requests",
          "Searchable content and organized records",
          "API-connected content and updates",
          "Clear loading, empty, and error states",
        ],
        image: {
          src: "/images/services/custom-app-screens.webp",
          alt: "Custom mobile app screens and dashboard",
        },
      },
      {
        id: "app-store-submission",
        label: "App store submission",
        introduction:
          "Get support preparing, testing, and submitting your app to the Apple App Store and Google Play.",
        features: [
          "Developer account setup guidance",
          "App icons, screenshots, and listing preparation",
          "Release builds and pre-launch testing",
          "Store submission and review-response support",
          "Version updates and release management",
        ],
        image: {
          src: "/images/services/app-store-submission.webp",
          alt: "Mobile app store listing and release preview",
        },
      },
    ],
  },

  {
    id: "ai-automation",
    title: "AI & Automation",
    description:
      "Reduce repetitive work, connect your tools, and give your team more time for the tasks that need their attention.",
    theme: "purple",
    tabs: [
      {
        id: "workflows",
        label: "Workflows",
        introduction:
          "Keep everyday tasks moving with workflows built around the way your business operates.",
        features: [
          "Automated notifications and follow-ups",
          "Connected forms, spreadsheets, and systems",
          "Approval flows with human review",
          "Scheduled reports and data updates",
          "Error tracking and workflow monitoring",
        ],
        image: {
          src: "/images/services/automation-workflow.webp",
          alt: "Business automation workflow preview",
        },
      },
      {
        id: "ai-assistants",
        label: "AI assistants",
        introduction:
          "Help customers and staff find answers using your approved business information.",
        features: [
          "Assistants connected to your content",
          "Website chat integration",
          "Human handoff when needed",
          "Responses tailored to your use case",
          "Testing and ongoing improvements",
        ],
        image: {
          src: "/images/services/ai-assistant.webp",
          alt: "AI assistant interface preview",
        },
      },
      {
        id: "integrations",
        label: "Integrations",
        introduction:
          "Connect your existing tools so information reaches the right place.",
        features: [
          "API integrations between platforms",
          "Data synchronization",
          "Connected forms and CRM tools",
          "Webhook-based automation",
          "Logging and failure notifications",
        ],
        image: {
          src: "/images/services/integrations.webp",
          alt: "Connected business tools preview",
        },
      },
    ],
  },

  {
    id: "custom-management-systems",
    title: "Custom Management Systems",
    description:
      "Bring your operations together with software designed around your processes, your team, and your reporting needs.",
    theme: "blue",
    tabs: [
      {
        id: "management-portals",
        label: "Management portals",
        introduction:
          "Give your team one place to manage daily work and find the information they need.",
        features: [
          "Workflows tailored to your operations",
          "User roles and access permissions",
          "Searchable records and document management",
          "Activity history and audit trails",
          "Tools designed for your team",
        ],
        image: {
          src: "/images/services/management-portal.webp",
          alt: "Custom management portal preview",
        },
      },
      {
        id: "dashboards",
        label: "Dashboards & reports",
        introduction:
          "Turn operational data into clear reports that support everyday decisions.",
        features: [
          "Dashboards built around your priorities",
          "Filters by date, department, or category",
          "Exportable reports",
          "Charts and performance summaries",
          "Role-based access to information",
        ],
        image: {
          src: "/images/services/dashboard.webp",
          alt: "Management dashboard and reports preview",
        },
      },
    ],
  },

  {
    id: "hosting-maintenance",
    title: "Hosting & Maintenance",
    description:
      "Keep your website running with hosting setup, regular maintenance, and practical support as your needs grow.",
    theme: "peach",
    tabs: [
      {
        id: "hosting",
        label: "Hosting setup",
        introduction:
          "A hosting environment configured for your website and its requirements.",
        features: [
          "Hosting selection and configuration",
          "Domain and DNS setup",
          "SSL certificate configuration",
          "Website deployment and migration",
          "Backup configuration",
        ],
        image: {
          src: "/images/services/hosting.webp",
          alt: "Website hosting management preview",
        },
      },
      {
        id: "maintenance",
        label: "Maintenance",
        introduction:
          "Keep your website up to date as your content, tools, and business evolve.",
        features: [
          "Scheduled software updates",
          "Backup checks",
          "Performance monitoring",
          "Content and layout adjustments",
          "Troubleshooting and technical support",
        ],
        image: {
          src: "/images/services/maintenance.webp",
          alt: "Website maintenance overview",
        },
      },
    ],
  },
];
export type ToolItem = {
  name: string;
};

export const toolsSection = {
  heading: "Your ideas.",
  highlight: "Built with the right tools.",
 rows: [
  [
    // Marketing first, followed by AI and automation.
    { name: "HubSpot" },
    { name: "Mailchimp" },
    { name: "Google Analytics" },
    { name: "n8n" },
    { name: "Make" },
    { name: "Zapier" },
    { name: "OpenAI" },
    { name: "Claude" },
  ],
  [
    // Design, development, and infrastructure.
    { name: "Figma" },
    { name: "Next.js" },
    { name: "React JS" },
    { name: "Flutter" },
    { name: "Tailwind CSS" },
    { name: "JavaScript" },
    { name: "HTML" },
    { name: "Node.js" },
    { name: "Laravel" },
    { name: "MySQL" },
    { name: "PostgreSQL" },
    { name: "Firebase" },
    { name: "REST API" },
    { name: "GitHub" },
    { name: "Docker" },
    { name: "Azure" },
  ],

  ] satisfies ToolItem[][],
};

export type Testimonial = {
  id: string;
  title: string;
  quote: string;
  name: string;
  role: string;
  avatar?: string;
  rating?: number;
  logo?: {
    src: string;
    alt: string;
  };
};

export const testimonialsSection = {
  heading: "Good work. Happy clients.",
  description: "Hear from the people behind the projects.",

  items: [
    {
      id: "website-client",
      title: "Website design & development",
      quote:
        "We had a clear idea of what we wanted, but needed someone we could trust to bring it together. Ajmal guided us through the process with patience and clear communication. We felt comfortable knowing where things stood.",
      name: "Elias Akeri",
      role: "Founder, Akeri Tax Accountants",
       rating: 5,
      // avatar: "/images/testimonials/client-1.webp",
    },
    {
      id: "automation-client",
      title: "AI & automation",
      quote:
        "I had the pleasure of working with Mr. Ajmal Ibrahimkhail in the MIS Department at Kardan University. He is a skilled and reliable Full Stack Developer with strong technical knowledge and a professional work ethic.",
      name: "Hedayatullah Hedayat",
      role: "Web Developer, Kardan University",
       rating: 5,
      // avatar: "/images/testimonials/client-2.webp",
      // rating: 5,
    },
    // {
    //   id: "management-client",
    //   title: "Custom management system",
    //   quote:
    //     "Replace this text with your client's approved feedback about their management system.",
    //   name: "Bashir Ibrahimi",
    //   role: "Degital Marketing Specialist, Noor-ul-mustfa school",
    //    rating: 5,
    //   // avatar: "/images/testimonials/client-3.webp",
    //   // rating: 5,
    // },
    // {
    //   id: "support-client",
    //   title: "Hosting & ongoing support",
    //   quote:
    //     "Replace this text with your client's approved feedback about their hosting and support.",
    //   name: "Client name",
    //   role: "Position, Company",
    //    rating: 5,
    //   // avatar: "/images/testimonials/client-4.webp",
    //   // rating: 5,
    // },
  ] satisfies Testimonial[],
};

export type PortfolioProject = {
  id: string;
  projectType: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  href?: string;
};

export const portfolioSection = {
  heading: "See what I’ve built for businesses like yours.",
  description:
    "Websites and digital experiences built around each business.",

  projects: [
    {
      id: "univeristy-website",
      projectType: "Custome",
      title: "Kardan University Website",
      description:
        "A modern website for Kardan University, featuring a clean design, responsive layout, and easy navigation for students and faculty.",
      image: {
        src: "/images/projects/kardan.webp",
        alt: "Kardan University website",
      },
      href: "https://kardan.edu.af",
    },
    {
      id: "worpress-website",
      projectType: "WordPress",
      title: "Audit SMSF Online Pty Ltd",
      description:
        "Redesigned the website for Audit SMSF Online Pty Ltd, clearly presenting its specialist audit services and commitment to quality and trust.",
      image: {
        src: "/images/projects/SMSF Audit.webp",
        alt: "Audit SMSF Online Pty Ltd website",
      },
       href: "https://auditsmsfonline.com.au",
    },
    {
      id: "school-website",
      projectType: "Custome",
      title: "Kardan Schools Website",
      description:
        "Designed the Kardan Schools website to help students, parents, and staff find essential information through a modern, user-friendly platform.",
      image: {
        src: "/images/projects/kardan school.webp",
        alt: "Kardan Schools website",
      },
     href: "https://kardanschool.edu.af",
    },
  ] satisfies PortfolioProject[],
};

export const aboutSection = {
  eyebrow: "About me",
  heading: "Meet Ajmal.",
  headingHighlight: "Your creative partner.",

  paragraphs: [
    "You’ve put time, energy, and a lot of yourself into your business. When you trust someone to build a part of it, you want to know they’re listening—and that the work matters to them, too.",
    "That’s where I start. Before we talk about designs or technology, I want to understand what you’re trying to achieve, what’s getting in your way, and what would make life easier for you and your customers. That might mean a website you’re proud to share, an app that brings your services closer, or a system that takes repetitive work off your hands.",
    "You’ll work directly with me, with honest conversations, clear explanations, and room to ask questions along the way. I’ll help you decide what’s worth building, pay attention to the details, and help you look after it once it’s live. Because the work should keep being useful long after launch.",
  ],

  image: {
    src: `/images/Profile-Picture.jpg?v=${LOGO_VERSION}`,
    alt: "Portrait of the designer and developer",
  },

  highlights: [
    {
      id: "development",
      title: "Design & development",
      description: "Built around your business",
    },
    {
      id: "automation",
      title: "AI & automation",
      description: "Simplify your daily work",
    },
  ],

  buttonLabel: "Book a 1:1 Call",
  buttonHref: "/#contact",
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqSection = {
  heading: "Frequently asked questions",

  items: [
    {
      id: "getting-started",
      question: "I have an idea, but don’t know where to start. Can you help?",
      answer:
        "Absolutely. You don’t need a technical brief or a finished plan. Tell me about your business, what you want to achieve, and what isn’t working right now. We’ll work out what you need and agree on a sensible starting point.",
    },
    {
      id: "services",
      question: "What can you help me build?",
      answer:
        "I work on websites, mobile apps, custom management systems, and AI automation. I can also help connect your existing tools, set up hosting, or improve a website you already have. We’ll choose the approach that fits your project.",
    },
    {
      id: "project-cost",
      question: "How much will my project cost?",
      answer:
        "That depends on what we’re building, the features you need, and any existing systems involved. After we discuss your requirements, I’ll put together a proposal outlining the work and its cost so you can make an informed decision.",
    },
    {
      id: "project-timeline",
      question: "How long will it take?",
      answer:
        "A focused website and a custom app have very different timelines. Once the scope is clear, we’ll agree on a schedule and key milestones. I’ll also explain what I need from you—such as content, access, or feedback—to keep things moving.",
    },
    {
      id: "existing-website",
      question: "Can you improve my existing website or system?",
      answer:
        "Yes. I can review what you already have and help identify what needs attention. Depending on its condition and your goals, that could mean improving the design, fixing usability issues, adding features, or planning a rebuild.",
    },
    {
      id: "direct-contact",
      question: "Will I work directly with you?",
      answer:
        "Yes. You’ll speak directly with me about the design, development, and progress of your project. You’ll have opportunities to review the work, ask questions, and give feedback along the way.",
    },
    {
      id: "after-launch",
      question: "What happens after launch?",
      answer:
        "Before launch, we’ll discuss the handover and any ongoing support you need. I can help with hosting, maintenance, updates, and future improvements, with the scope and cost agreed in advance.",
    },
    {
      id: "next-step",
      question: "How do we get started?",
      answer:
        "Get in touch with a little about your business and what you have in mind. If you have a website, examples you like, or a target launch date, share those too. We’ll talk through the project and decide on the next steps.",
    },
  ] satisfies FAQItem[],
};

export const ctaSection = {
  eyebrow: "Your next project starts here",
  heading: "Let’s build something",
  headingHighlight: "worth putting your name on.",
  description:
    "A new website, a useful app, or a simpler way to run your business. Tell me what you have in mind, and we’ll work out the next step together.",

  contactLabel: "Send me a Message",
  contactHref: "/contact",

  bookingLabel: "Book a 1:1 call",
  bookingHref: "", // Add your actual booking URL to show this button.

  note: "",
};

export const contactPage = {
  heading: "Connect with me",
  description:
    "Have something in mind? Share a little about your business and what you’d like to build or improve.",

  email: "Ajmal.Ibrahimkhail.work@gmail.com",
  phone: "+93 764 201 305",
  whatsappNumber: "+93 764 201 305", 
  location: "Kabul, Afghanistan",
  telegramUsername: "Ajmalibrahimkhail", 

  socialLinks: {
    linkedin: "www.linkedin.com/in/ajmalibrahimkhail",
    github: "https://github.com/Mohamad-Ajmal",
    instagram: "",
  },

  services: [
    "Website Design & Development",
    "Mobile App Development",
    "AI & Automation",
    "Custom Management Systems",
    "Hosting & Maintenance",
    "Something else / I need advice",
  ],
};
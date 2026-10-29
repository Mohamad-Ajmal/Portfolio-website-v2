import * as SiIcons from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { TbApi, TbCloud, TbCode, TbDatabase } from "react-icons/tb";
import type { IconType } from "react-icons";

import Container from "../ui/Container";
import { toolsSection } from "../../config/site";
import { Braces } from "lucide-react";
import { SiN8N } from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";

type ToolItem = {
  name: string;
};

type ToolAppearance = {
  icon: IconType;
  color: string;
};

const simpleIcons = SiIcons as unknown as Record<
  string,
  IconType | undefined
>;

function getSimpleIcon(
  name: string,
  fallback: IconType = TbCode,
): IconType {
  return simpleIcons[name] ?? fallback;
}

const toolIcons: Record<string, ToolAppearance> = {
  // Marketing
  HubSpot: {
    icon: getSimpleIcon("SiHubspot"),
    color: "#FF7A59",
  },
  Mailchimp: {
    icon: getSimpleIcon("SiMailchimp"),
    color: "#241C15",
  },
  "Google Analytics": {
    icon: getSimpleIcon("SiGoogleanalytics"),
    color: "#E37400",
  },

  // AI and automation
 n8n: {
    icon: SiN8N,
    color: "#EA4B71",
  },
  Make: {
    icon: getSimpleIcon("SiMake"),
    color: "#6D00CC",
  },
  Zapier: {
    icon: getSimpleIcon("SiZapier"),
    color: "#FF4F00",
  },
  OpenAI: {
    icon: RiOpenaiFill,
    color: "#171717",
    },
  Claude: {
    icon: getSimpleIcon("SiClaude"),
    color: "#D97757",
  },

  // Design and frontend
  Figma: {
    icon: getSimpleIcon("SiFigma"),
    color: "#F24E1E",
  },
  HTML: {
    icon: getSimpleIcon("SiHtml5"),
    color: "#E34F26",
  },
  JavaScript: {
    icon: getSimpleIcon("SiJavascript"),
    color: "#C49B00",
  },
  React: {
    icon: getSimpleIcon("SiReact"),
    color: "#149ECA",
  },
  "React JS": {
    icon: getSimpleIcon("SiReact"),
    color: "#149ECA",
  },
  "Next.js": {
    icon: getSimpleIcon("SiNextdotjs"),
    color: "#171717",
  },
  "Next JS": {
    icon: getSimpleIcon("SiNextdotjs"),
    color: "#171717",
  },
  "Tailwind CSS": {
    icon: getSimpleIcon("SiTailwindcss"),
    color: "#06B6D4",
  },
  Flutter: {
    icon: getSimpleIcon("SiFlutter"),
    color: "#0288D1",
  },

  // Backend and databases
  "Node.js": {
    icon: getSimpleIcon("SiNodedotjs"),
    color: "#43853D",
  },
  Laravel: {
    icon: getSimpleIcon("SiLaravel"),
    color: "#FF2D20",
  },
  MySQL: {
    icon: getSimpleIcon("SiMysql"),
    color: "#4479A1",
  },
  PostgreSQL: {
    icon: getSimpleIcon("SiPostgresql"),
    color: "#4169E1",
  },
  "REST API": {
    icon: Braces,
    color: "#AB4219",
    },

  // Hosting and development tools
  Firebase: {
    icon: getSimpleIcon("SiFirebase"),
    color: "#DD7500",
  },
  GitHub: {
    icon: getSimpleIcon("SiGithub"),
    color: "#181717",
  },
  Docker: {
    icon: getSimpleIcon("SiDocker"),
    color: "#2496ED",
  },
  Azure: {
    icon: getSimpleIcon("SiMicrosoftazure", TbCloud),
    color: "#0078D4",
  },
};

function ToolTile({ name }: ToolItem) {
  const { icon: Icon, color } = toolIcons[name] ?? {
    icon: TbCode,
    color: "#AB4219",
  };

  return (
    <div
      className="flex min-h-32 w-28 shrink-0 flex-col
                 items-center justify-center gap-4
                 rounded-[20px] border border-[#ab4219]/15
                 bg-white px-3 py-5
                 transition-colors duration-200
                 hover:border-[#ab4219]/50
                 sm:min-h-36 sm:w-32 sm:gap-5
                 lg:min-h-40 lg:w-36
                 motion-reduce:transition-none"
    >
      <Icon
        aria-hidden="true"
        color={color}
        className="size-11 shrink-0 sm:size-12 lg:size-14"
      />

      <span
        className="text-center text-sm font-semibold
                   leading-snug text-black"
      >
        {name}
      </span>
    </div>
  );
}

type ToolRowProps = {
  items: readonly ToolItem[];
  reverse?: boolean;
};

function ToolRow({ items, reverse = false }: ToolRowProps) {
  if (items.length === 0) return null;

  // Keep each repeated group wider than the slider viewport.
  const repetitions = Math.max(1, Math.ceil(10 / items.length));

  const repeatedItems = Array.from(
    { length: repetitions },
    () => items,
  ).flat();

  return (
    <div className="tools-slider min-w-0 overflow-hidden">
      {/* Continuous animation without edge fades or shadows. */}
      <div
        aria-hidden="true"
        className={`tools-marquee-track flex w-max
                    motion-reduce:hidden ${
                      reverse ? "tools-marquee-reverse" : ""
                    }`}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 gap-4 pr-4 sm:gap-5 sm:pr-5"
          >
            {repeatedItems.map((tool, index) => (
              <ToolTile
                key={`${copy}-${tool.name}-${index}`}
                name={tool.name}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Accessible list; visible when reduced motion is enabled. */}
      <ul
        className="sr-only motion-reduce:not-sr-only
                   motion-reduce:flex motion-reduce:flex-wrap
                   motion-reduce:justify-center motion-reduce:gap-4"
      >
        {items.map((tool, index) => (
          <li key={`${tool.name}-${index}`}>
            <ToolTile name={tool.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ToolsSection() {
  return (
    <section
      aria-labelledby="tools-heading"
      className="bg-[#f6d2c3] pb-14 sm:pb-16 lg:pb-20"
    >
      <Container>
        <div
          className="overflow-hidden rounded-[28px]
                     border border-[#ab4219]/20 bg-[#fff5ef]
                     p-5 sm:rounded-[32px] sm:p-8 lg:p-10"
        >
          <div
            className="grid min-w-0 items-center gap-9 sm:gap-10
                       lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]
                       lg:gap-12"
          >
            {/* Left: two sliders moving in opposite directions. */}
            <div
              className="order-2 min-w-0 space-y-4
                         sm:space-y-5 lg:order-1"
            >
              {toolsSection.rows.map((items, index) => (
                <ToolRow
                  key={index}
                  items={items}
                  reverse={index % 2 !== 0}
                />
              ))}
            </div>

            {/* Right: title only. */}
            <div className="order-1 min-w-0 lg:order-2">
              <h2
                id="tools-heading"
                className="text-center text-[32px] font-bold
                           leading-[1.12] tracking-tight
                           sm:text-[40px]
                           lg:text-left lg:text-[44px]"
              >
                <span className="block text-black">
                  {toolsSection.heading}
                </span>

                <span className="mt-3 block text-[#ff4c00]">
                  {toolsSection.highlight}
                </span>
              </h2>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, ImageIcon } from "lucide-react";

import type { PortfolioProject } from "../../config/site";

export default function ProjectCard({
  id,
  projectType,
  title,
  description,
  image,
  href,
}: PortfolioProject) {
  const [failedImage, setFailedImage] = useState<string | null>(null);

  const showImage = Boolean(image.src) && failedImage !== image.src;
  const liveUrl = href?.trim();

  const hasLiveUrl = Boolean(
    liveUrl && /^https?:\/\/[^\s]+$/i.test(liveUrl),
  );

  return (
    <article
      aria-labelledby={`project-${id}-heading`}
      className="group flex h-full min-w-0 flex-col
                 overflow-hidden rounded-[26px] bg-[#fff8f3]
                 ring-1 ring-[#ab4219]/10
                 transition-[transform,box-shadow] duration-300
                 hover:shadow-[0_18px_40px_-26px_#ab421970]
                 motion-safe:hover:-translate-y-1
                 motion-reduce:transition-none"
    >
      {/* Edge-to-edge project image */}
      <div
        className="relative aspect-[4/3] w-full
                   overflow-hidden bg-[#f6d2c3]"
      >
        {showImage ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 350px,
                   (min-width: 640px) 50vw,
                   100vw"
            onError={() => setFailedImage(image.src)}
            className="object-cover object-top
                       transition-transform duration-700
                       motion-safe:group-hover:scale-[1.035]
                       motion-reduce:transition-none"
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col
                       items-center justify-center gap-3
                       px-6 text-center"
          >
            <ImageIcon
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-9 text-[#ab4219]/60"
            />

            <p className="text-sm font-medium text-[#ab4219]">
              Project preview coming soon
            </p>
          </div>
        )}
      </div>

      {/* Project details */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-6 sm:px-7">
        <p
          className="text-xs font-semibold uppercase
                     tracking-[0.1em] text-[#ab4219]"
        >
          {projectType}
        </p>

        <h3
          id={`project-${id}-heading`}
          className="mt-3 text-xl font-bold
                     leading-[1.35] tracking-tight text-[#ff4c00]"
        >
          {title}
        </h3>

        <p className="mt-3 text-[15px] leading-[1.8] text-black">
          {description}
        </p>

        {/* Bottom-aligned website link */}
        <div className="mt-auto pt-6">
          <div className="border-t border-[#ab4219]/15 pt-3">
            {hasLiveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${title} live website (opens in a new tab)`}
                className="group/link inline-flex min-h-11
                           items-center gap-2 rounded-sm
                           text-sm font-semibold text-[#ab4219]
                           focus-visible:outline-2
                           focus-visible:outline-offset-4
                           focus-visible:outline-[#ab4219]"
              >
                <span
                  className="underline-offset-4
                             group-hover/link:underline"
                >
                  Visit site
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={1.8}
                  className="size-5 shrink-0
                             transition-transform duration-200
                             motion-safe:group-hover/link:-translate-y-0.5
                             motion-safe:group-hover/link:translate-x-0.5
                             motion-reduce:transition-none"
                />
              </a>
            ) : (
              <p className="py-3 text-sm text-black/60">
                Live preview coming soon
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
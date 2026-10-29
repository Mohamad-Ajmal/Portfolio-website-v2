import type { ReactNode } from "react";

type SectionHeadingProps = {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export default function SectionHeading({
  id,
  title,
  description,
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`mx-auto flex max-w-[1000px]
                  flex-col items-center text-center ${className}`}
    >
      <h2
        id={id}
        className="text-[34px] font-bold leading-[1.08]
                   tracking-[-0.035em] text-heading
                   sm:text-[46px] md:text-[56px] lg:text-[64px]"
      >
        {title}
      </h2>

      {description && (
        <p
          className="mx-auto mt-6 max-w-[720px]
                     text-base leading-relaxed text-black
                     sm:text-lg lg:text-xl"
        >
          {description}
        </p>
      )}

      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}
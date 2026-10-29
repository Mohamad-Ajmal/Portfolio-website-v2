import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type GradientLinkProps = ComponentPropsWithoutRef<typeof Link>;

export default function GradientLink({
  children,
  className = "",
  ...props
}: GradientLinkProps) {
  return (
    <Link
      {...props}
      className={`inline-flex min-h-14 items-center justify-center
                  gap-3 rounded-full
                  bg-[linear-gradient(100deg,#ff4c00_0%,#ab4219_100%)]
                  px-8 py-4 text-base font-bold text-white
                  shadow-[0_8px_22px_#ab421926]
                  transition-[transform,box-shadow] duration-200
                  hover:-translate-y-1
                  hover:shadow-[0_12px_28px_#ab421938]
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-brand-dark
                  motion-reduce:transform-none
                  motion-reduce:transition-none
                  ${className}`}
    >
      {children}
    </Link>
  );
}
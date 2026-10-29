import Link from "next/link";
import type {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
} from "react";

type Variant = "primary" | "outline";
type Size = "default" | "icon";

type AppearanceProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

const variants: Record<Variant, string> = {
  primary:
    "border border-brand-dark bg-brand-dark text-white " +
    "hover:border-brand-hover hover:bg-brand-hover",

  outline:
    "border border-brand-dark bg-transparent text-brand-dark " +
    "hover:bg-section",
};

const sizes: Record<Size, string> = {
  default: "min-h-11 gap-2 rounded-xl px-5 py-2.5 text-sm",
  icon: "size-11 shrink-0 rounded-xl",
};

function buttonStyles({
  variant = "primary",
  size = "default",
  className = "",
}: AppearanceProps) {
  return [
    "inline-flex items-center justify-center font-semibold",
    "transition-colors motion-reduce:transition-none",
    "focus-visible:outline-2 focus-visible:outline-offset-4",
    "focus-visible:outline-brand-dark",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  ].join(" ");
}

type ButtonProps = ComponentPropsWithRef<"button"> & AppearanceProps;

export function Button({
  ref,
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> &
  AppearanceProps;

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}
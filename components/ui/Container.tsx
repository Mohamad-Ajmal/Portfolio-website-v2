import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  wide?: boolean;
};

export default function Container({
  children,
  className = "",
  wide = false,
  ...props
}: ContainerProps) {
  return (
    <div
      {...props}
      className={`mx-auto w-full px-5 sm:px-8 lg:px-12
                  ${wide ? "max-w-[1800px]" : "max-w-6xl"}
                  ${className}`}
    >
      {children}
    </div>
  );
}
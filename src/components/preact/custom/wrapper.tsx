/** @jsxImportSource preact */

import type { ComponentProps } from "preact";

import { twMerge } from "tailwind-merge";

export const Wrapper = ({
  className = "",
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={twMerge(
        [
          "px-4",
          "py-12",
          "border",
          "border-dashed",
          "border-neutral-300",
          "dark:border-neutral-700",
          "bg-neutral-100/30",
          "dark:bg-neutral-900/30",
          "rounded-3xl",
          "flex",
          "min-h-[40vh]",
          "justify-center",
          "items-center",
          "content-center",
          "flex-col",
        ].join(" "),
        className as string
      )}
      {...props}
    />
  );
};

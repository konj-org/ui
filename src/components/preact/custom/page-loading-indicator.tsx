/** @jsxImportSource preact */

import { Loading } from "@/components/preact/styled/loading";

export const PageLoadingIndicator = () => {
  return (
    <div
      className={[
        "h-[3rem]",
        "fixed",
        "rounded-full",
        "backdrop-blur-xl",
        "bg-neutral-200/90",
        "dark:bg-neutral-800/90",
        "md:bg-neutral-800/90",
        "md:text-neutral-50",
        "top-8",
        "left-8",
        "opacity-0",
        "data-[visible=true]:opacity-100",
        "transition-opacity",
        "duration-100",
        "px-8",
        "flex",
        "items-center",
        "content-center",
        "gap-2",
        "text-sm",
        "z-10",
      ].join(" ")}
      id="page-loading-indicator"
      data-visible={false}
    >
      <Loading className="md:dark:!stroke-neutral-50" />
      <p className="my-0">Loading...</p>
    </div>
  );
};

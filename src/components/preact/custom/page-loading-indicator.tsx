/** @jsxImportSource preact */

import { Loading } from "@/components/preact/styled/loading";

export const PageLoadingIndicator = () => {
  return (
    <div
      className={[
        "pointer-events-none",
        "touch-none",
        "select-none",
        "h-[3rem]",
        "fixed",
        "rounded-full",
        "backdrop-blur-md",
        "bg-neutral-800/70",
        "text-white",
        "top-8",
        "mt-[env(safe-area-inset-bottom)]",
        "left-[50%]",
        "translate-x-[-50%]",
        "md:left-8",
        "md:translate-x-0",
        "opacity-0",
        "data-[visible=true]:opacity-100",
        "transition-opacity",
        "duration-200",
        "px-8",
        "flex",
        "items-center",
        "content-center",
        "gap-2",
        "text-sm",
        "z-[15]",
      ].join(" ")}
      id="page-loading-indicator"
      data-visible={false}
    >
      <Loading className="md:dark:!stroke-neutral-50" />
      <p className="my-0 text-sm opacity-75">Loading...</p>
    </div>
  );
};

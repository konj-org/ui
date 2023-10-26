/** @jsxImportSource preact */

// Types
import type { NavbarActiveStates } from "./links";

// Preact
import { Fragment } from "preact";
import { useRef, useState } from "preact/hooks";
import { useCallback } from "preact/compat";

// Signals
import { useSignal } from "@preact/signals";

// SubComponents
import { ResultCard } from "./result-card";
import { SearchBar } from "./search-bar";

// Hooks
import { usePathname } from "@/hooks/custom/use-pathname";
import { useSearch } from "@/hooks/custom/use-search";

// Data
import { links } from "./links";

export const DesktopNavbar = () => {
  // Refs
  const timeoutRefs = useRef<null | number>(null);

  // Hooks
  const { componentResults, hooksResults, search } = useSearch();
  const pathname = usePathname();

  // States
  const [filter, setFilter] = useState<"components" | "hooks" | undefined>(
    undefined
  );
  const [activeItem, setActiveItem] = useState<NavbarActiveStates | undefined>(
    undefined
  );

  // Signals
  const searchParam = useSignal<string>("");

  const onExpand = useCallback(
    (status: NavbarActiveStates | undefined) => {
      if (timeoutRefs.current !== null) {
        clearTimeout(timeoutRefs.current);
      }

      setActiveItem(status);
      setFilter(status);
    },
    [setActiveItem]
  );

  const onMouseLeave = useCallback(() => {
    timeoutRefs.current !== null && clearTimeout(timeoutRefs.current);

    timeoutRefs.current = setTimeout(
      () => setActiveItem(undefined),
      100
    ) as unknown as number;
  }, []);

  const onPointerEnter = useCallback(() => {
    timeoutRefs.current !== null && clearTimeout(timeoutRefs.current);
  }, []);

  // Navigation proxy
  const onNavigate = useCallback(() => {
    document
      .getElementById("page-loading-indicator")
      ?.setAttribute("data-visible", "true");

    setActiveItem(undefined);
  }, []);

  return (
    <Fragment>
      {/* Fades the content behind the navbar */}
      <div
        aria-label="hidden"
        className={[
          "hidden",
          "md:block",
          "pointer-events-none",
          "fixed",
          "top-0",
          "z-10",
          "w-full",
          "h-[5rem]",
          "bg-gradient-to-b",
          "from-10%",
          "from-neutral-50",
          "dark:from-neutral-950",
          "to-transparent",
        ].join(" ")}
      />
      <nav
        onPointerEnter={onPointerEnter}
        onPointerLeave={onMouseLeave}
        data-expanded={activeItem !== undefined}
        style={
          "--clip-path:inset(2rem var(--side-gap) calc(100% - var(--height) - 2rem) var(--side-gap) round 4em);" +
          "clip-path: var(--clip-path);" +
          "--max-height: 60vh;"
        }
        class={[
          "text-white",
          "overflow-hidden",
          "[--height:_3rem;]",
          "md:[--default-side-gap:_15%;]",
          "lg:[--default-side-gap:_25%;]",
          "xl:[--default-side-gap:_30%;]",
          "md:[--expanded-side-gap:_7.5%;]",
          "lg:[--expanded-side-gap:_15%;]",
          "xl:[--expanded-side-gap:_20%;]",
          "[--side-gap:var(--default-side-gap)]",
          "h-[var(--max-height);]",
          "z-[1000]",
          "hidden",
          "md:flex",
          "bg-neutral-800/70",
          "backdrop-blur-md",
          "fixed",
          "top-0",
          "left-0",
          "w-full",
          "pt-8",
          "text-sm",
          "data-[expanded=true]:[--height:_calc(var(--max-height)_-_2rem);]",
          "data-[expanded=true]:[--side-gap:var(--expanded-side-gap)]",
          "data-[expanded=true]:bg-neutral-900/90",
          "motion-safe:duration-300",
          "motion-safe:ease-elastic",
          "motion-safe:transition-all",
          "flex-col",
          "items-stretch",
          "transform-gpu",
        ].join(" ")}
      >
        <div
          class={[
            "min-h-[3rem]",
            "h-[3rem]",
            "px-4",
            "w-[60%]",
            "mx-auto",
            "flex",
            "justify-center",
            "items-center",
            "content-center",
          ].join(" ")}
        >
          <ul class={["flex", "gap-2"].join(" ")}>
            {links.map(({ title, to, expandable, key }) => (
              <li class="list-none" key={key}>
                <a
                  onClick={onNavigate}
                  onMouseEnter={
                    expandable ? onExpand.bind(null, expandable) : undefined
                  }
                  class={[
                    "px-6",
                    "py-[.5rem]",
                    "transition-colors",
                    "rounded-3xl",
                    "hover:bg-neutral-700",
                    "duration-200",
                    "data-[active=true]:text-primary-300",
                    "hover:data-[active=true]:bg-neutral-700",
                    "ease-[ease-in-out]",
                    "select-none",
                    "cursor-pointer",
                  ].join(" ")}
                  href={to}
                  data-active={to === pathname.value}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div class="flex-grow w-full max-w-[min(50%,_theme(maxWidth.3xl))] overflow-hidden mx-auto relative grid grid-rows-[5rem,1fr] py-4">
          {(activeItem === "components" || activeItem === "hooks") && (
            <Fragment>
              <SearchBar
                searchParam={searchParam}
                onSearch={search}
                filter={filter}
                clearFilters={setFilter.bind(null, undefined)}
              />
              <div className="overflow-y-auto">
                {componentResults.value.length !== 0 && (
                  <ResultCard
                    baseHref="/components/"
                    onClick={onNavigate}
                    title="Components"
                    items={componentResults}
                  />
                )}
                {hooksResults.value.length !== 0 && (
                  <ResultCard
                    baseHref="/hooks/"
                    onClick={onNavigate}
                    title="Hooks"
                    items={hooksResults}
                  />
                )}
                {componentResults.value.length + hooksResults.value.length ===
                  0 && (
                  <p className="h-full flex justify-center items-center opacity-75">
                    {searchParam.value.length === 0
                      ? "Search your desired component"
                      : `Couldn't match any thing with "${searchParam.value}"`}
                  </p>
                )}
              </div>
            </Fragment>
          )}
        </div>
      </nav>
    </Fragment>
  );
};

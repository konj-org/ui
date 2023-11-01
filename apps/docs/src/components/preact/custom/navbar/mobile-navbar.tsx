/** @jsxImportSource preact */

// Preact
import { Fragment } from "preact";
import { useCallback, useState } from "preact/hooks";

import { useSignal } from "@preact/signals";

// SubComponents
import { SearchIcon } from "./icons";
import { SearchBar } from "./search-bar";
import { ResultCard } from "./result-card";
import { AnchoredDialog } from "@konj-org/preact-ui";

// Hooks
import { usePathname } from "@/hooks/custom/use-pathname";
import { useSearch } from "@/hooks/custom/use-search";

// Data
import { links } from "./links";

export const MobileNavbar = () => {
  const [modal, setModal] = useState(false);

  // Hooks
  const { componentResults, hooksResults, search } = useSearch();
  const pathname = usePathname();

  // Signals
  const searchParam = useSignal<string>("");

  // Navigation proxy
  const onNavigate = useCallback(() => {
    document
      .getElementById("page-loading-indicator")
      ?.setAttribute("data-visible", "true");
    setModal(false);
  }, []);

  return (
    <Fragment>
      <AnchoredDialog title="Search" state={modal} setState={setModal}>
        <SearchBar onSearch={search} searchParam={searchParam} />
        <div className="overflow-y-auto grow mt-2">
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
          {componentResults.value.length + hooksResults.value.length === 0 && (
            <p className="h-full flex justify-center items-center opacity-75">
              {searchParam.value.length === 0
                ? "Search your desired component"
                : `Couldn't match any thing with "${searchParam.value}"`}
            </p>
          )}
        </div>
      </AnchoredDialog>
      <nav
        className={[
          "z-50",
          "md:hidden",
          "border-t",
          "border-neutral-300",
          "dark:border-neutral-700",
          "fixed",
          "bottom-0",
          "left-0",
          "w-screen",
          "px-8",
          "py-4",
          "pb-[calc(env(safe-area-inset-bottom)_+_theme(spacing.4))]",
          "dark:bg-neutral-800/90",
          "bg-neutral-200/90",
          "backdrop-blur-xl",
        ].join(" ")}
      >
        <ul className={["block", "grid", "grid-cols-5", "gap-2"].join(" ")}>
          {links.map(({ title, to, icon: Icon, key, external }) => (
            <li
              class={[
                "list-none",
                "flex",
                "flex-col",
                "gap-1",
                "items-center",
                "transition-colors",
                "duration-200",
                "data-[active=true]:text-primary-300",
                "ease-[ease-in-out]",
                "select-none",
                "cursor-pointer",
                "outline-none",
              ].join(" ")}
              key={key}
            >
              <a
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                onClick={
                  to !== pathname.value && !external ? onNavigate : undefined
                }
                className="text-[0.6rem] h-full opacity-75 flex justify-between content-between items-center flex-col"
                href={to}
                data-active={to === pathname.value}
              >
                <Icon className="w-5 h-5" />
                <span>{title}</span>
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={setModal.bind(null, true)}
              class={[
                "w-full",
                "flex",
                "flex-col",
                "gap-1",
                "items-center",
                "transition-colors",
                "duration-200",
                "select-none",
                "cursor-pointer",
                "outline-none",
              ].join(" ")}
            >
              <SearchIcon className="w-5 h-5" />
              <a className="text-[0.6rem] opacity-75">Search</a>
            </button>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

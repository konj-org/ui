/** @jsxImportSource preact */

// Preact
import { useCallback, useEffect } from "preact/hooks";

// Signals
import { useSignal } from "@preact/signals";

// Types
import type { ComponentProps } from "preact";
import type { CodeboxProps } from "./codebox";
import type { UILibraries } from "@/data/types";

// Classes
import { buttonClassName } from "@/components/preact/styled/button";

// ---------------------- //
// --- Icons ------------ //
// ---------------------- //

/**
 * The following icon is provided by Heroicons
 *  @see {@link https://github.com/tailwindlabs/heroicons}
 *  @license MIT
 */
const ShareIcon = ({
  xmlns = "http://www.w3.org/2000/svg",
  viewBox = "0 0 24 24",
  fill = "currentColor",
  className = "w-6 h-6",
  ...props
}: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns={xmlns}
      viewBox={viewBox}
      fill={fill}
      className={className}
      {...props}
    >
      <path
        fill-rule="evenodd"
        d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
        clip-rule="evenodd"
      />
    </svg>
  );
};

/**
 * The following icon is provided by Heroicons
 *  @see {@link https://github.com/tailwindlabs/heroicons}
 *  @license MIT
 */
const ClipboardDocumentListIcon = ({
  xmlns = "http://www.w3.org/2000/svg",
  viewBox = "0 0 24 24",
  fill = "currentColor",
  className = "w-6 h-6",
  ...props
}: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns={xmlns}
      viewBox={viewBox}
      fill={fill}
      className={className}
      {...props}
    >
      <path
        fill-rule="evenodd"
        d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
        clip-rule="evenodd"
      />
      <path
        fill-rule="evenodd"
        d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
        clip-rule="evenodd"
      />
    </svg>
  );
};

// ---------------------- //
// --- Props ------------ //
// ---------------------- //

interface Props extends CodeboxProps {
  library: UILibraries;
}

// ---------------------- //
// --- Component -------- //
// ---------------------- //

const Codeshare = ({ code, itemType, library }: Props) => {
  const possibleToShare = useSignal(false);

  // Checks for the 'navigator.share'
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (typeof navigator.share !== "undefined") possibleToShare.value = true;
  }, []);

  /** Shares the current page with navigator share */
  const share = useCallback(() => {
    try {
      navigator.share({
        title: "Konj UI",
        text: `Checkout this ${itemType} from konj UI.`,
        url: window.location.href,
      });
    } catch (err) {
      console.error(err);
    }
  }, [library]);

  /** Copies the raw component code */
  const copy = useCallback(() => {
    try {
      navigator.clipboard.writeText(code[library]!.raw);
    } catch (err) {
      console.error(err);
    }
  }, [library]);

  return (
    <div className="flex rounded-[calc(theme(borderRadius.xl)_+_theme(spacing.1))] bg-neutral-900 p-1 ml-auto [&_*]:text-neutral-50">
      <button
        disabled={!possibleToShare.value}
        aria-label={"Share this " + itemType}
        onClick={share}
        style="padding: 0.6rem !important;"
        className={buttonClassName({
          compiledVariant: "theme-ghost",
          color: "theme",
          variant: "ghost",
          square: true,
          compact: true,
        })}
      >
        <ShareIcon className="w-4 h-4" />
      </button>
      <button
        onClick={copy}
        aria-label={"Copy source code of this " + itemType}
        style="padding: 0.6rem !important;"
        className={buttonClassName({
          compiledVariant: "dark-filled",
          color: "dark",
          variant: "filled",
          square: true,
          compact: true,
        })}
      >
        <ClipboardDocumentListIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Codeshare;

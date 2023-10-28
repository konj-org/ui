/** @jsxImportSource preact */

// Types
import type { UIComponent, UIHook } from "@/data/types";
import type { Signal } from "@preact/signals";

interface ResultCardProps {
  title: string;
  onClick?: () => void;
  baseHref: string;
  items: Signal<UIComponent[] | UIHook[]>;
}

export const ResultCard = ({
  baseHref,
  title,
  items,
  onClick,
}: ResultCardProps) => {
  return (
    <div
      className={[
        "px-1",
        "delay-75",
        "my-8",
        "first:mt-0",
        "last:mb-0",
        "rounded-3xl",
        "pb-2",
      ].join(" ")}
    >
      <p className="text-md font-semibold opacity-50 px-6 py-2">{title}</p>
      <div className="grid gap-2">
        {items.value.map(({ description, key, title }) => (
          <a
            onClick={onClick}
            key={key}
            href={baseHref + key}
            className={[
              "outline-none",
              "border",
              "border-transparent",
              "bg-neutral-200",
              "[&:is(:hover,:active,:focus,:focus-visible)]:bg-neutral-300",
              "[&:is(:hover,:active,:focus,:focus-visible)]:border-neutral-400",
              "dark:bg-neutral-800",
              "dark:[&:is(:hover,:active,:focus,:focus-visible)]:bg-neutral-700",
              "dark:[&:is(:hover,:active,:focus,:focus-visible)]:border-neutral-600",
              "md:bg-neutral-800",
              "md:[&:is(:hover,:active,:focus,:focus-visible)]:bg-neutral-700",
              "md:[&:is(:hover,:active,:focus,:focus-visible)]:border-neutral-600",
              "transition-colors",
              "px-6",
              "py-4",
              "rounded-[calc(theme(borderRadius.3xl)_-_theme(spacing.2))]",
              "block",
              "z-10",
            ].join(" ")}
          >
            <p className="font-semibold mb-1">{title}</p>
            <p className="text-xs opacity-60 font-light">{description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

/** @jsxImportSource preact */

import { createElement } from "preact";
import { useCallback, useRef } from "preact/hooks";

// SubComponents
import { Button, type ButtonProps } from "@/components/preact/styled/button";

// Types
import type { DButton } from "@/components/preact/primitive/default-components";
import type { ComponentProps, ComponentType } from "preact";

// Third Party Utils
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

/** Applies a series of styles */
const applyStyles = (el: HTMLElement, values: [string, string][]) =>
  values.forEach((item) => el.style.setProperty(item[0], item[1]));

/** Applies a series of styles */
const removeStyles = (el: HTMLElement, values: string[]) =>
  values.forEach((item) => el.style.removeProperty(item));

//----- Internal Types -----//
type Item<T extends ComponentType<any> = typeof DButton> =
  | { id: string; children: JSX.Element }
  | Omit<
      ButtonProps<T>,
      | "id"
      | "onClick"
      | "onPointerEnter"
      | "key"
      | "variant"
      | "className"
      | "component"
    >;

//----- Utils -----//
type MatchType = "complete" | "part-of-id" | "part-of-selected";

const isActive = ({
  id,
  selected,
  matchType,
}: {
  id: string;
  selected?: string;
  matchType: MatchType;
}) => {
  if (typeof selected === "undefined") return false;

  switch (matchType) {
    case "complete":
      return id === selected;
    case "part-of-selected":
      return selected.includes(id);
    case "part-of-id":
      return id.includes(selected);
  }
};

//----- Styles -----//
const SegmentedControlClassNames = cva(
  [
    "flex",
    "p-2",
    "gap-2",
    "rounded-3xl",
    "w-fit",
    "after:bg-[var(--bg-color,_transparent)]",
    "after:rounded-3xl",
    "after:inset-0",
    "after:block",
    "after:absolute",
    "after:-z-20",
    "relative",
    "max-w-full",
    "overflow-x-auto",
    "md:motion-safe:before:dark:bg-primary-400/25",
    "md:motion-safe:before:bg-primary-700/20",
    "md:motion-safe:before:left-0",
    "md:motion-safe:before:top-0",
    "md:motion-safe:before:h-full",
    "md:motion-safe:before:block",
    "md:motion-safe:before:absolute",
    "md:motion-safe:before:[clip-path:_inset(var(--start-y,_0)_var(--end-x,_50%)_var(--end-y,_0)_var(--start-x,_50%)_round_theme(borderRadius.3xl))]",
    "md:motion-safe:before:rounded-[var(--radius,_0)]",
    "md:motion-safe:before:origin-left",
    "md:motion-safe:before:transition-all",
    "md:motion-safe:before:pointer-events-none",
    "md:motion-safe:before:w-full",
    "md:motion-safe:before:opacity-[var(--opacity,_0)]",
    "md:motion-safe:before:-z-10",
    "md:motion-safe:before:[transition-duration:_var(--duration,_150ms)]",
  ],
  {
    variants: {
      keepBg: {
        true: [
          "dark:[--bg-color:_theme(colors.neutral.900)]",
          "[--bg-color:_theme(colors.neutral.100)]",
        ],
        false: [],
      },
    },
    defaultVariants: {
      keepBg: true,
    },
  }
);

//----- Exported Types -----//
export interface SegmentedControlProps<
  T extends ComponentType<any> = typeof DButton
> extends Omit<
    ComponentProps<"div">,
    | "children"
    | "onPointerLeave"
    | "onPointerCancel"
    | "selected"
    | "onSelected"
  > {
  items: Item<T>[];
  selected?: undefined | string;
  onSelected?: undefined | ((v: string) => void);
  buttonComponents?: T;
  keepBg?: boolean;
  matchType?: MatchType;
}

//----- Main Component -----//
export const SegmentedControl = <
  T extends ComponentType<any> = typeof DButton
>({
  items,
  selected,
  onSelected,
  className,
  buttonComponents,
  keepBg = true,
  matchType = "complete",
  ...props
}: SegmentedControlProps<T>) => {
  const segmentedControlWrapperRef = useRef<HTMLDivElement | null>(null);
  const initialHoverTarget = useRef(true);

  /** Starts the button hovering effect */
  const onHover = useCallback((id: string) => {
    const wrapper = segmentedControlWrapperRef.current;
    if (wrapper === null) return;

    let targetEl: HTMLButtonElement | null = null;

    // Finding the target el
    wrapper.childNodes.forEach((el) => {
      if (
        (el as HTMLElement).hasAttribute("id") &&
        `segmentedControl-${id}` === (el as HTMLElement).id
      ) {
        targetEl = el as HTMLButtonElement;
      }
    });

    // Verifying the target el
    if (targetEl === null) return;

    // Getting the positioning of elements
    const {
      width: itemWidth,
      top: itemTop,
      bottom: itemBottom,
      left: itemLeft,
      right: itemRight,
    } = (targetEl as HTMLButtonElement).getBoundingClientRect();
    const {
      width: wrapperWidth,
      height: wrapperHeight,
      top: wrapperTop,
      bottom: wrapperBottom,
      left: wrapperLeft,
      right: wrapperRight,
    } = wrapper.getBoundingClientRect();

    // Calculating the positions
    const startX = ((itemLeft - wrapperLeft) / wrapperWidth) * 100;
    const endX = (Math.abs(itemRight - wrapperRight) / wrapperWidth) * 100;
    const startY = ((itemTop - wrapperTop) / wrapperHeight) * 100;
    const endY = (Math.abs(wrapperBottom - itemBottom) / wrapperHeight) * 100;

    // Incase its the initial hover:
    //    - Positioning the hover element in the center of target element
    //    - Specifying the top and the bottom
    //    - Modifying the `initialHoverTarget`
    if (initialHoverTarget.current) {
      const itemCenter = itemWidth / 2 + itemLeft;
      const centerX = ((itemCenter - wrapperLeft) / wrapperWidth) * 100;

      applyStyles(wrapper, [
        ["--start-x", centerX - 2 + "%"],
        ["--end-x", 98 - centerX + "%"],
        ["--start-y", startY + "%"],
        ["--end-y", endY + "%"],
        ["--duration", "0s"],
      ]);

      initialHoverTarget.current = false;
    }

    // Modifying the hover element to the size and the position of target element
    setTimeout(() => {
      removeStyles(wrapper, ["--duration"]);

      applyStyles(wrapper, [
        ["--start-x", startX + "%"],
        ["--end-x", endX + "%"],
        ["--opacity", "1"],
      ]);
    }, 1);
  }, []);

  /** Ends the button hovering effect */
  const onHoverEnd = useCallback(() => {
    const wrapper = segmentedControlWrapperRef.current;
    if (wrapper === null) return;

    wrapper.style.removeProperty("--opacity");
    initialHoverTarget.current = true;
  }, []);

  return (
    <div
      onPointerLeave={onHoverEnd}
      onPointerCancel={onHoverEnd}
      ref={segmentedControlWrapperRef}
      className={twMerge(
        SegmentedControlClassNames({ keepBg }),
        className as string
      )}
      {...props}
    >
      {items.map(({ id, children, ...props }) => {
        //-- Checking if the item is the active item --//
        const state = isActive({
          id,
          selected: selected ? selected : "",
          matchType,
        });

        return createElement(
          Button,
          // @ts-ignore
          {
            key: id,
            component: buttonComponents,
            onPointerEnter: onHover.bind(null, id),
            variant: state ? "subtle" : "ghost",
            ["data-active"]: state,
            onClick: onSelected && onSelected.bind(null, id),
            className: [
              "!rounded-[calc(theme(borderRadius.3xl)_+_theme(space.2))]",
              "hover:dark:bg-primary-300/25",
              "hover:bg-primary-300",
              "md:motion-safe:hover:bg-transparent",
              "md:motion-safe:hover:bg-transparent",
            ].join(" "),
            id: `segmentedControl-${id}`,
            ...props,
          },
          children
        );
      })}
    </div>
  );
};

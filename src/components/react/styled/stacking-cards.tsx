// Types
import type { ComponentProps, ReactElement, TouchEventHandler } from "react";

// React
import {
  Children,
  cloneElement,
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";

// Tw Merge
import { twMerge } from "tailwind-merge";

// -------------------------------------------------------- //
// ---- Constants ----------------------------------------- //
// -------------------------------------------------------- //

const translateXClampedBy = 20;

// -------------------------------------------------------- //
// ---- Stacking Card ------------------------------------- //
// -------------------------------------------------------- //

interface StackingCardProps extends ComponentProps<"div"> {
  key: string;
  index?: number;
  reverseIndex?: number;
  onSelect?: () => void;
  onMoveTo?: (to: number) => void;
  mode?: "stacked" | "expanded";
  nextIndex?: number;
}

/** `StackingCard` should be used as the children of `StackingCards` */
export const StackingCard = ({
  nextIndex,
  onSelect,
  className = "",
  style = {},
  children,
  mode,
  index,
  reverseIndex,
  onMoveTo,
  ...props
}: StackingCardProps) => {
  const deltaRef = useRef<null | number>(null);
  const cardRef = useRef<null | HTMLDivElement>(null);
  const startingX = useRef<null | number>(null);

  const onTouchStart = useCallback<TouchEventHandler<HTMLDivElement>>(
    (e) => {
      if (e.touches[0]) startingX.current = e.touches[0].clientX;
    },
    [index]
  );

  /** Checks if the cards needs to be closed and cleans up the refs */
  const onTouchEnd = useCallback<TouchEventHandler<HTMLDivElement>>(
    (e) => {
      cardRef.current?.style.removeProperty("transition-duration");
      setTimeout(() => {
        cardRef.current?.style.setProperty("--translate-x", "0px");

        /** The amount that is needed for card to be closed */
        const clampingPercentageToClose = 0.5;
        if (
          deltaRef.current !== null &&
          (deltaRef.current > translateXClampedBy * clampingPercentageToClose ||
            deltaRef.current < -translateXClampedBy * clampingPercentageToClose)
        ) {
          onTouchEnd(e);
          onMoveTo && onMoveTo(nextIndex!);
        }

        deltaRef.current = null;
        startingX.current = null;
      }, 0);
    },
    [nextIndex]
  );

  /** Adds sliding interactivity to the card */
  const onTouchMove = useCallback<TouchEventHandler<HTMLDivElement>>(
    (e) => {
      if (index !== 0) return;

      // Validating the references
      if (
        startingX.current === null ||
        typeof e.touches[0] === "undefined" ||
        cardRef.current === null
      )
        return;

      // Calculating the X translate
      const { width } = (e.target as HTMLButtonElement).getBoundingClientRect();
      const delta = ((e.touches[0].clientX - startingX.current) / width) * 50;

      // Clamping the X translate
      const clampedDelta =
        delta > translateXClampedBy
          ? translateXClampedBy
          : delta < -translateXClampedBy
          ? -translateXClampedBy
          : delta;

      // Setting CSS variables
      cardRef.current.style.setProperty("--translate-x", clampedDelta + "%");
      cardRef.current.style.setProperty("transition-duration", "10ms");

      // Storing the delta
      deltaRef.current = clampedDelta;
    },
    [index, onTouchEnd, onMoveTo]
  );

  return (
    <div
      ref={cardRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      style={{
        // @ts-ignore
        "--translate-x": "0px",
        "--index": `${index}`,
        "--reverse-index": `${reverseIndex}`,
        "--reduction": `${(index! * 0.05).toFixed(2)}`,
        ...style,
      }}
      data-mode={mode}
      data-front-card={index === 0}
      onClick={onSelect}
      className={twMerge(
        [
          "w-full",
          "absolute",
          "p-4",
          "rounded-3xl",
          "backdrop-blur-xl",
          "border",
          "bg-neutral-200/80",
          "dark:bg-neutral-800/80",
          "border-neutral-100",
          "dark:border-neutral-900",
          "aspect-[var(--ratio)]",
          "overflow-hidden",
          "motion-safe:transition-all",
          "z-[var(--reverse-index)]",
          "translate-x-[var(--translate-x)]",
          "origin-top",
          "cursor-default",
          "duration-200",
          "data-[front-card=true]:!touch-none",
          // stacked
          "data-[mode=stacked]:opacity-[calc(1_-_var(--reduction))]",
          "data-[mode=stacked]:scale-[calc(1_-_var(--reduction))]",
          "data-[mode=stacked]:translate-y-[calc(var(--reverse-index)_*_(var(--spacer)_-_(var(--reduction)*1rem)))]",
          // Hovering while stacked
          "md:data-[mode=stacked]:data-[front-card=false]:hover:cursor-pointer",
          "md:data-[mode=stacked]:hover:opacity-100",
          "md:data-[front-card=false]:data-[mode=stacked]:hover:translate-y-[calc((var(--reverse-index)_-_1)_*_(var(--spacer)_-_(var(--reduction)*1rem)))]",
          // Expanded
          "data-[mode=expanded]:translate-y-[calc(var(--index)_*_(var(--item-height)_+_.25rem))]",
        ].join(" "),
        className as string
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// -------------------------------------------------------- //
// ---- Stacking Cards ------------------------------------ //
// -------------------------------------------------------- //

interface StackingCardsProps extends ComponentProps<"div"> {
  heightRatio?: number;
  widthRatio?: number;
  expandedLabel?: string;
  stackedLabel?: string;
  showLessLabel?: string;
  title: string;
}

/** Wrapper for `StackingCard` */
export const StackingCards = ({
  title,
  children,
  heightRatio = 3,
  widthRatio = 5,
  expandedLabel = "Expand",
  stackedLabel = "Stack",
  showLessLabel = "Show Less",
  style = {},
  className = "",
  ...props
}: StackingCardsProps) => {
  // References
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const selectedIndexRef = useRef(0);
  const resizeObserver = useRef(
    typeof window === "undefined"
      ? null
      : new ResizeObserver(() => {
          if (wrapperRef.current === null) return;
          const { width } = wrapperRef.current.getBoundingClientRect();
          const currentWidth = wrapperRef.current.style
            .getPropertyValue("--item-height")
            .slice(0, -2);

          if (width.toFixed(0) !== currentWidth)
            wrapperRef.current.style.setProperty(
              "--item-height",
              (width * (heightRatio / widthRatio)).toFixed(0) + "px"
            );
        })
  );

  // States
  const [hydrated, setHydrated] = useState(false);
  const [mode, setMode] = useState<"stacked" | "expanded">("stacked");
  const [mappedIndexes, setMappedIndexes] = useState(
    (children ? Children.map(children, (_, i) => i) : []) as number[]
  );

  // Actions
  const onSelect = useCallback(
    (itemIndex: number, expandOnMobile = false) => {
      if (selectedIndexRef.current === itemIndex || mode === "expanded") return;

      // Checking the screen width
      const { matches: isDesktop } = window.matchMedia("(min-width: 768px)");

      // Expanding the cards incase on mobile
      if (!isDesktop && expandOnMobile) return setMode("expanded");

      setMappedIndexes((mappedIndexes) => {
        /** The current position of selected item */
        let selectedItemValue = mappedIndexes[itemIndex]!;

        return mappedIndexes.map((value, index) => {
          // Incase the item is the selected item we need to move it to the front
          if (index === itemIndex) return 0;

          // Incase the item is in front of current item, it needs to be moved back
          if (selectedItemValue >= value) return value + 1;

          // In any other case item will remain at it's current place
          return value;
        });
      });
      selectedIndexRef.current = itemIndex;
    },
    [mode]
  );

  // Hydrates the component with the width of wrapper
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (typeof window === "undefined" || wrapper === null) return;

    const { height } = wrapper.getBoundingClientRect();
    wrapper.style.setProperty("--item-height", height + "px");
    setHydrated(true);
    resizeObserver.current?.observe(window.document.body);

    return () => {
      resizeObserver.current?.unobserve(window.document.body);
    };
  }, []);

  /** Toggles the mode */
  const toggleState = useCallback(
    () => setMode((curr) => (curr === "expanded" ? "stacked" : "expanded")),
    []
  );

  /** Amount of needed padding for the element */
  const paddingTop = useMemo(() => {
    const spacer = 2 * (heightRatio / widthRatio);
    let length = 0;
    let total = 0;
    Children.forEach(children, (_, i) => {
      length++;
      total = total + (spacer - i * 0.05);
    });
    return total - spacer * (0.05 * length);
  }, [children]);

  return (
    <div
      data-hydrated={hydrated}
      className={twMerge(
        ["my-4", "data-[hydrated=false]:pb-[var(--padding-top)]"].join(" "),
        className as string
      )}
      style={{
        // @ts-ignore
        "--spacer": `${2 * (heightRatio / widthRatio)}rem`,
        "--padding-top": `${paddingTop}rem`,
        "--item-height": "0px",
        "--child-count": `${mappedIndexes.length}`,
        "--ratio": `${widthRatio}/${heightRatio}`,
        "--w-ratio": `${widthRatio}`,
        "--h-ratio": `${heightRatio}`,
        ...style,
      }}
      {...props}
    >
      <div className="flex justify-between items-end content-end pb-4">
        <p className="text-2xl font-bold my-0 text-black dark:text-white">
          {title}
        </p>
        <button
          data-mode={mode}
          onClick={toggleState}
          className={[
            "flex",
            "gap-1",
            "px-5",
            "py-2",
            "items-center",
            "content-center",
            "text-sm",
            "rounded-3xl",
            "bg-neutral-100",
            "dark:bg-neutral-900",
            "active:bg-neutral-200",
            "active:dark:bg-neutral-800",
            "transition-colors",
            "data-[mode=stacked]:opacity-0",
            "data-[mode=stacked]:pointer-events-none",
            "md:data-[mode=stacked]:opacity-100",
            "md:data-[mode=stacked]:pointer-events-auto",
            "[&_span[data-desktop-only]]:hidden",
            "md:[&_span[data-desktop-only]]:block",
            "md:[&_span[data-mobile-only]]:hidden",
          ].join(" ")}
        >
          <span data-desktop-only>
            {mode !== "expanded" && expandedLabel}
            {mode !== "stacked" && stackedLabel}
          </span>
          <span data-mobile-only>{showLessLabel}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="w-6 h-6 transition-transform data-[rotated=true]:rotate-180"
            fill="currentColor"
            data-rotated={mode === "expanded"}
          >
            <path d="M480-357q-6 0-11-2t-10-7L261-564q-9-9-9-21t9-21q9-9 21.5-9t21.5 9l176 176 176-176q9-9 21-9t21 9q9 9 9 21.5t-9 21.5L501-366q-5 5-10 7t-11 2Z" />
          </svg>
        </button>
      </div>
      <div
        ref={wrapperRef}
        data-hydrated={hydrated}
        data-mode={mode}
        className={twMerge(
          [
            "data-[hydrated=false]:aspect-[var(--ratio)]",
            "data-[hydrated=true]:data-[mode=stacked]:max-h-[calc(var(--padding-top)_+_var(--item-height))]",
            "data-[hydrated=true]:data-[mode=expanded]:max-h-[calc(var(--child-count)_*_(var(--item-height)_+_.25rem)_-_.25rem)]",
            "data-[hydrated=true]:h-[99999vh]",
            "data-[hydrated=true]:motion-safe:transition-[max-height]",
            "w-full",
            "relative",
            "w-full",
            "mx-auto",
          ].join(" ")
        )}
      >
        {Children.map(children, (child, index) =>
          cloneElement(child as ReactElement, {
            nextIndex: index < mappedIndexes.length - 1 ? index + 1 : 0,
            index: mappedIndexes[index],
            mode,
            reverseIndex: mappedIndexes.length - 1 - mappedIndexes[index]!,
            onSelect: onSelect.bind(null, index, true),
            onMoveTo: onSelect,
          })
        )}
      </div>
    </div>
  );
};

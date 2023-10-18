/** @jsxImportSource preact */

import type { JSX } from "preact/compat";

// CVA
import { type VariantProps, cva } from "class-variance-authority";

// Sub-Component
import { Button } from "@/components/preact/styled/button";
import { Dialog } from "@/components/preact/primitive/dialog";

// Types
import type { DialogProps } from "../primitive/dialog";

// Hooks
import { useTouchDialogDrag } from "@/hooks/preact/use-touch-dialog-drag";

export interface AnchoredDialogProps
  extends Omit<DialogProps, "className" | "ref"> {
  title: string;
}

const anchoredDialogClassNames = cva(
  [
    "opacity-100",
    "motion-reduce:opacity-0",
    "w-[100%]",
    "top-[calc(10dvh_+_env(safe-area-inset-top)_+_env(safe-area-inset-bottom))]",
    "h-[calc(90dvh_-_env(safe-area-inset-top)_-_env(safe-area-inset-bottom))]",
    "standalone:iphone-portrait:top-[calc(0dvh_+_env(safe-area-inset-top)_+_env(safe-area-inset-bottom))]",
    "standalone:iphone-portrait:h-[calc(100dvh_-_env(safe-area-inset-top)_-_env(safe-area-inset-bottom))]",
    "left-0",
    "bottom-auto",
    "p-6",
    "md:p-12",
    "bg-neutral-100",
    "dark:bg-neutral-900",
    "rounded-t-3xl",
    "justify-start",
    "motion-safe:translate-y-[100%]",
    "data-[display=true]:translate-y-0",
    "md:max-asw-[90vw]",
    "md:rounded-3xl",
    "md:top-[50%]",
    "md:left-auto",
    "md:right-[50%]",
    "md:bottom-auto",
    "md:m-0",
    "md:translate-y-[-50%]",
    "md:transition-[transform,opacity,filter]",
    "md:translate-x-[50%]",
    "md:scale-105",
    "md:data-[display=true]:scale-100",
    "md:opacity-0",
    "md:data-[display=true]:opacity-1",
    "md:data-[display=true]:translate-y-[-50%]",
    "md:blur-sm",
    "md:data-[display=true]:blur-0",
    "md:duration-[var(--transition-duration)]",
    "md:border",
    "md:dark:border-neutral-700",
    "md:border-neutral-300",
    "standalone:iphone-portrait:rounded-t-[3rem]",
    "standalone:iphone-portrait:pl-[calc(theme(space.6)_-_env(safe-area-inset-left))]",
    "standalone:iphone-portrait:pr-[calc(theme(space.6)_-_env(safe-area-inset-right))]",
    "standalone:iphone-portrait:pb-[calc(theme(space.6)_+_env(safe-area-inset-bottom))]",
    "[box-shadow:_0_75vh_0_50vh_theme(colors.neutral.100)]",
    "dark:[box-shadow:_0_75vh_0_50vh_theme(colors.neutral.900)]",
    "md:[box-shadow:_none_!important]",
  ],
  {
    variants: {
      slim: {
        true: ["md:aspect-[4/6]", "md:h-[80vh]", "md:w-auto"],
        false: ["md:aspect-[5/4]", "md:h-auto", "md:w-[max(900px,_60vw)]"],
      },
    },
    defaultVariants: {
      slim: false,
    },
  }
);

/**
 * Anchored Sheets provide an elegant way to display information and actions
 */
export const AnchoredDialog = ({
  children,
  title,
  setState,
  slim = false,
  ...props
}: AnchoredDialogProps &
  VariantProps<typeof anchoredDialogClassNames>): JSX.Element => {
  const { ref, onTouchEnd, onTouchMove } = useTouchDialogDrag({
    onClose: setState?.bind(null, false),
  });

  return (
    <Dialog
      ref={ref}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      className={anchoredDialogClassNames({ slim })}
      transitionDuration={350}
      setState={setState}
      {...props}
    >
      <header
        data-draggable={true}
        className="mb-6 flex justify-end md:justify-between align-middle items-center w-[100%] relative"
      >
        <p
          data-draggable={true}
          className="absolute md:static top-[50%] left-[50%] md:top-auto md:left-auto translate-x-[-50%] translate-y-[-50%] md:translate-x-0 md:translate-y-0 p-0 m-0 text-center text-xl font-semibold"
        >
          {title}
        </p>
        <Button
          square={true}
          onClick={() => setState && setState(false)}
          className="rounded-[100%]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </header>
      {children && (
        <div
          data-draggable={true}
          data-scrollable={true}
          className={[
            "max-h-[100%]",
            "w-[100%]",
            "overflow-hidden",
            "grow",
            "flex-col",
            "flex",
            "justify-start",
            "grow",
            "pb-[calc(1rem_+_env(safe-area-inset-bottom))]",
            "standalone:iphone-portrait:pb-0",
            "md:pb-0",
          ].join(" ")}
        >
          {children}
        </div>
      )}
    </Dialog>
  );
};

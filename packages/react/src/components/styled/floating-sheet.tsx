import { lazy, Suspense, type ComponentProps } from "react";

// SubComponent
import { Button } from "./button";
const Dialog = lazy(() =>
  import("@/components/primitive/dialog").then((module) => ({
    default: module.Dialog,
  }))
);

// Types
import type { DialogProps } from "@/components/primitive/dialog";

// Icon
/**
 * The following icon is provided by Heroicons
 *  @see {@link https://github.com/tailwindlabs/heroicons}
 *  @license MIT
 */
const XMarkIcon = ({
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
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
};

// CVA
import { cva } from "class-variance-authority";

// Hooks
import { useTouchDialogDrag } from "@/hooks/use-touch-dialog-drag";

const floatingSheetClassNames = cva([
  "flex-col",
  "justify-between",
  "rounded-3xl",
  "border",
  "p-6",
  "border-neutral-200",
  "bg-neutral-100",
  "dark:border-neutral-800",
  "dark:bg-neutral-900",
  "md:dark:border-neutral-700",
  "md:border-neutral-300",
  "opacity-100",
  "motion-safe:translate-y-[calc(100%_+_theme(space.6))]",
  "motion-reduce:opacity-0",
  "data-[display=true]:opacity-100",
  "bottom-3",
  "top-auto",
  "max-w-none",
  "md:aspect-video",
  "md:w-auto",
  "md:m-0",
  "md:left-[50%]",
  "md:translate-x-[-50%]",
  "md:max-h-[max(300px,_30vh)]",
  "data-[display=true]:translate-y-0",
  "left-[calc(theme(space.3)_+_env(safe-area-inset-left))]",
  "right-[calc(theme(space.3)_+_env(safe-area-inset-right))]",
  "w-[calc(100vw_-_theme(space.6)_-_env(safe-area-inset-left)-_env(safe-area-inset-right))]",
  // ------------ PWA Safari styles ------------ //
  "standalone:iphone-portrait:rounded-[3rem]",
  "standalone:iphone-portrait:p-8",
  "standalone:iphone-portrait:w-[calc(100vw_-_theme(space.10)_-_env(safe-area-inset-left)-_env(safe-area-inset-right))]",
  "standalone:iphone-portrait:left-[calc(theme(space.5)_+_env(safe-area-inset-left))]",
  "standalone:iphone-portrait:right-[calc(theme(space.5)_+_env(safe-area-inset-right))]",
  "standalone:iphone-portrait:bottom-5",
  "standalone:iphone-portrait:motion-safe:translate-y-[calc(100%_+_theme(space.8)]",
]);

type ActionEvent = {
  action: () => void;
  title: string;
};

export interface FloatingSheetProps
  extends Omit<DialogProps, "className" | "ref"> {
  title: string;
  subtitle?: string;
  actions?: {
    accept?: ActionEvent;
    dismiss?: ActionEvent;
  };
}

/**
 * Display small amount of text with related actions.
 *
 * @param {FloatingSheetProps} props
 * @returns {JSX.Element}
 */
export const FloatingSheet = ({
  children,
  title,
  subtitle,
  actions,
  setState,
  ...props
}: FloatingSheetProps): JSX.Element => {
  const { onTouchEnd, onTouchMove, ref } = useTouchDialogDrag({
    onClose: setState?.bind(null, false),
    maxScroll: 300,
  });

  return (
    <Suspense fallback={null}>
      <Dialog
        ref={ref}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        className={floatingSheetClassNames()}
        transitionDuration={350}
        setState={setState}
        {...props}
      >
        <Button
          square={true}
          onClick={() => setState && setState(false)}
          className="absolute top-6 right-6 rounded-[100%]"
        >
          <XMarkIcon className="w-4 h-4" />
        </Button>
        <header
          data-draggable={true}
          className="flex flex-col justify-center align-middle items-center"
        >
          <p
            data-draggable={true}
            className="font-semibold text-2xl p-0 mt-2 mb-2 only:mb-0 text-center"
          >
            {title}
          </p>
          {subtitle && (
            <p
              data-draggable={true}
              className="p-0 m-0 text-center text-xs font-light opacity-75"
            >
              {subtitle}
            </p>
          )}
        </header>
        {children && <p className="mt-6 p-0 text-sm opacity-75">{children}</p>}
        {actions && (
          <div data-draggable={true} className="pt-12 w-[100%] flex">
            {actions.dismiss && (
              <Button
                className="grow"
                variant="ghost"
                onClick={() => {
                  setState && setState(false);
                  actions.dismiss?.action();
                }}
              >
                {actions.dismiss.title}
              </Button>
            )}
            {actions.accept && (
              <Button
                className="grow"
                color="primary"
                onClick={() => {
                  setState && setState(false);
                  actions.accept?.action();
                }}
              >
                {actions.accept.title}
              </Button>
            )}
          </div>
        )}
      </Dialog>
    </Suspense>
  );
};

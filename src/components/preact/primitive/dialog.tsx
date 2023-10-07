/** @jsxImportSource preact */

// Types
import type { StateUpdater } from "preact/hooks";
import type { ComponentProps } from "preact";
import type { JSX } from "preact";

// Preact
import { useEffect, useRef, useCallback, useState } from "preact/hooks";
import { createPortal, forwardRef } from "preact/compat";

// CVA
import { cva } from "class-variance-authority";

// TW Merge
import { twMerge } from "tailwind-merge";

export interface DialogProps
  extends Omit<ComponentProps<"dialog">, "onFocusCapture" | "onBlur"> {
  state: boolean; // Defines the current state of the dialog element
  setState?: StateUpdater<boolean> | undefined; // Sets the current state of the dialog element
  onExit?: () => void; // Will get called after the end of dialog animation
  className?: string; // Will be appended to the default dialog classes
  transitionDuration?: number; // Duration of the animation
  animateOpacity?: boolean; // Weather if opacity should be animated
  animateTransform?: boolean; // Weather if transition should be animated
  closable?: boolean; // Weather if the dialog can be closed be other means
}

const dialogStyles = cva(
  [
    "not-prose",
    "max-h-none",
    "max-w-none",
    "origin-center",
    "flex-col",
    "content-center",
    "items-center",
    "justify-center",
    "fill-neutral-900",
    "text-neutral-900",
    "duration-[var(--transition-duration)]",
    "backdrop:bg-neutral-200/0",
    "backdrop:opacity-0",
    "backdrop:backdrop-blur-lg",
    "backdrop:md:backdrop-blur-md",
    "backdrop:transition-all",
    "backdrop:bg-neutral-950/25",
    "backdrop:dark:bg-neutral-950/50",
    "backdrop:transition-all",
    "data-[display=false]:pointer-events-none",
    "data-[display=true]:opacity-100",
    "data-[display=true]:backdrop:opacity-100",
    "dark:fill-neutral-100",
    "dark:text-neutral-100",
  ],
  {
    variants: {
      transitions: {
        all: ["transition-all", "opacity-0"],
        opacityOnly: ["transition-opacity", "opacity-0"],
        transformOnly: ["transition-transform", "opacity-100"],
      },
    },
    defaultVariants: {
      transitions: "all",
    },
  }
);

const getVariant = (animateOpacity: boolean, animateTransform: boolean) => {
  if (animateOpacity && animateTransform) return "all";
  if (animateOpacity) return "opacityOnly";
  if (animateTransform) return "transformOnly";
  return "all";
};

/** Calculates the width of the scrollbar */
const calcScrollBarWidth = () => {
  if (typeof document === "undefined") return 0;

  const innerWidth = document.body.getBoundingClientRect().width;
  const windowWidth = window.innerWidth;

  return windowWidth - innerWidth;
};

const preventEvent: JSX.TouchEventHandler<any> = (e) => e.preventDefault();

/**
 * Base Dialog element, mainly for internal usage.
 */
export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      state,
      setState,
      transitionDuration = 300,
      className = "",
      animateOpacity = true,
      animateTransform = true,
      closable = true,
      onExit: onExitCB,
      children,
      ...props
    },
    ref?
  ) => {
    const hasModifiedBodyRef = useRef(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
      if (typeof window !== "undefined") setIsBrowser(true);
    }, []);

    useEffect(() => {
      const el =
        typeof ref === "undefined" || ref === null
          ? dialogRef.current
          : (ref as { current: HTMLDialogElement }).current;
      const timeouts: number[] = [];
      const isTheOnlyModal = document.body.getAttribute("data-modal-open");

      const scrollbarWidth = calcScrollBarWidth();

      if (el === null) return;
      el.style.setProperty("--transition-duration", `${transitionDuration}ms`);

      if (state === true) {
        el.showModal();

        // Only modifying the body incase this is the only open modal
        if (!isTheOnlyModal) {
          document.documentElement.style.setProperty(
            "padding-right",
            `${scrollbarWidth}px`
          );
          document.documentElement.style.setProperty("overflow", "hidden");

          // Notifying that there is a open modal
          document.documentElement.setAttribute("data-modal-open", "true");
          hasModifiedBodyRef.current = true;

          (el.firstElementChild as HTMLElement | null)?.focus();
        }

        el.style.display = "flex";

        requestAnimationFrame(() => el.setAttribute("data-display", "true"));
      } else {
        el.setAttribute("data-display", "false");
        timeouts.push(
          setTimeout(() => {
            requestAnimationFrame(() => {
              el.close();
              el.style.display = "none";

              // Incase we have modified the body, we need to change it back to default
              if (hasModifiedBodyRef.current) {
                document.documentElement.style.removeProperty("padding-right");
                document.documentElement.style.removeProperty("overflow");

                // Cleanup
                document.documentElement.removeAttribute("data-modal-open");
                hasModifiedBodyRef.current = false;
              }

              onExitCB && onExitCB();
            });
          }, transitionDuration) as unknown as number
        );
      }

      return () => timeouts.forEach((t) => clearTimeout(t));
    }, [state, transitionDuration, ref, onExitCB]);

    /**
     * Closes the dialog incase it is closable and user clicked outside of the dialog contents
     */
    const onClick: JSX.MouseEventHandler<HTMLDialogElement> = useCallback(
      (e) => {
        if (!closable) return;

        const el =
          typeof ref === "undefined" || ref === null
            ? dialogRef.current
            : (ref as { current: HTMLDialogElement }).current;

        if (el === null) return;

        const { top, bottom, left, right } = el.getBoundingClientRect();
        const { clientX, clientY } = e;

        if (
          clientX < left ||
          clientX > right ||
          clientY < top ||
          clientY > bottom
        ) {
          setState && setState(false);
        }
      },
      [closable, ref, setState]
    );

    /** Closes the modal in an elegant way */
    const onExit = useCallback<JSX.GenericEventHandler<HTMLDialogElement>>(
      (e) => {
        e.preventDefault();

        const el =
          typeof ref === "undefined" || ref === null
            ? dialogRef.current
            : (ref as { current: HTMLDialogElement }).current;

        const eventOnTheSameElement = (e.target as HTMLDivElement).isSameNode(
          el
        );

        // Only closing the element in case all the following criterias are met
        // eventOnTheSameElement -> the close/cancel event happened on the current element
        // closable -> the prop 'closable' is set to true
        // setState -> the prop 'setState' is not undefined
        if (eventOnTheSameElement && closable && setState) {
          setState(false);
        }
      },
      [closable, setState, ref]
    );

    return (
      <>
        {isBrowser ? (
          createPortal(
            <dialog
              ref={typeof ref === "undefined" || ref === null ? dialogRef : ref}
              className={twMerge(
                dialogStyles({
                  transitions: getVariant(animateOpacity, animateTransform),
                }),
                className
              )}
              data-dialog-open={state}
              data-draggable={true}
              onClick={onClick}
              onClose={onExit}
              onCancel={onExit}
              onTouchMove={preventEvent}
              {...props}
            >
              {children}
            </dialog>,
            document.body
          )
        ) : (
          <></>
        )}
      </>
    );
  }
);

Dialog.displayName = "Dialog";

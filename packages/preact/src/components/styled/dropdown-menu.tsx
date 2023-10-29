import type { JSX } from "preact";
import { forwardRef, type ForwardedRef } from "preact/compat";

// Dialog
import type { DialogProps } from "@/components/primitive/dialog";
import { Dialog } from "@/components/primitive/dialog";

// CVA
import { cva } from "class-variance-authority";

const popoverClasses = cva(
  [
    "backdrop-blur-lg",
    "not-prose",
    "left-[var(--left,_auto)]",
    "right-[var(--right,_auto)]",
    "top-[var(--top,_auto)]",
    "bottom-[var(--bottom,_auto)]",
    "w-auto",
    "backdrop:opacity-0!",
    "border",
    "rounded-[calc(theme(borderRadius.xl)_+_theme(space.1))]",
    "overflow-y-auto",
    "overflow-x-hidden",
    "border-neutral-300",
    "bg-neutral-100/75",
    "dark:border-neutral-700",
    "dark:bg-neutral-900/75",
    "w-fit",
    "justify-start",
    "flex-col",
    "data-[display=false]:pointer-events-none",
    "opacity-0",
    "data-[display=false]:blur-sm",
    "data-[display=true]:blur-0",
    "data-[display=true]:backdrop:opacity-0",
    "data-[display=true]:opacity-100",
    "fixed",
    "p-1",
    "m-0",
    "my-1",
    "z-50",
    "duration-100",
  ],
  {
    variants: {
      isNested: {
        false: [
          "motion-safe:data-[display=false]:data-[append-to=top]:translate-y-2",
          "motion-safe:data-[display=false]:data-[append-to=bottom]:-translate-y-2",
          "motion-safe:data-[display=true]:data-[append-to=bottom]:translate-y-0",
          "motion-safe:data-[display=true]:data-[append-to=top]:translate-y-0",
        ],
        true: [
          "motion-safe:data-[display=false]:data-[append-to=top]:translate-y-2",
          "motion-safe:data-[display=false]:data-[append-to=bottom]:-translate-y-2",
          "motion-safe:data-[display=true]:data-[append-to=bottom]:-translate-y-1",
          "motion-safe:data-[display=true]:data-[append-to=top]:translate-y-1",
        ],
      },
    },
    defaultVariants: {
      isNested: false,
    },
  }
);

export interface DropdownMenuProps extends Omit<DialogProps, "ref"> {
  close: () => void;
  isNested?: boolean;
}

export const DropdownItem = forwardRef(
  (
    {
      label,
      event,
      onPointerEnter,
      info,
      icon,
    }: {
      label: string;
      event?: () => void;
      onPointerEnter?: () => void;
      info?: string;
      icon?: JSX.Element;
    },
    ref?: ForwardedRef<HTMLButtonElement | null>
  ) => (
    <button
      className={[
        "select-none",
        "bg-transparent",
        "border-none",
        "rounded-xl",
        "py-1",
        "px-4",
        "hover:bg-primary-700/25",
        "dark:hover:bg-primary-400/25",
        "focus-visible:bg-primary-700/30",
        "dark:focus-visible:bg-primary-400/30",
        "transition-colors",
        "flex",
        "justify-between",
        "align-middle",
        "items-center",
        "gap-8",
        "w-[100%]",
        "outline-none",
        "duration-75",
        "text-xs",
        "md:text-sm",
        "text-left",
        "hover:opacity-100",
        "[&:hover_*]:opacity-100",
      ].join(" ")}
      onClick={event}
      onPointerEnter={onPointerEnter}
      ref={ref ? ref : null}
    >
      <span>{label}</span>
      <span className="opacity-50 uppercase transition-all duration-150">
        {info}
      </span>
      {icon}
    </button>
  )
);

DropdownItem.displayName = "DropdownItem";

export const DropdownGroup = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => (
  <div className="last:border-b-0 border-b py-1 first:pt-0 last:pb-0 border-neutral-300 dark:border-neutral-700 w-[100%]">
    {children}
  </div>
);

export const DropdownMenu = forwardRef(
  (
    {
      state,
      setState,
      close,
      children,
      isNested = false,
      ...props
    }: DropdownMenuProps,
    ref?: ForwardedRef<HTMLDialogElement | null>
  ) => {
    return (
      <Dialog
        state={state}
        setState={setState}
        className={popoverClasses({ isNested })}
        onExit={close}
        ref={ref ? ref : null}
        {...props}
      >
        {children}
      </Dialog>
    );
  }
);

DropdownMenu.displayName = "DropdownMenu";

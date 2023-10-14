import { lazy, Suspense } from "react";

// Sub-Component
const Dialog = lazy(() =>
  import("@/components/react/primitive/dialog").then((module) => ({
    default: module.Dialog,
  }))
);

// Types
import type { DialogProps } from "@/components/react/primitive/dialog";

// CVA
import { cva } from "class-variance-authority";

interface Action {
  title: string;
  action: () => void;
  type: "warn" | "error" | "confirm" | "dismiss";
}

export interface AlertDialogProps
  extends Omit<DialogProps, "className" | "closable" | "children" | "ref"> {
  title: string;
  subtitle?: string;
  actions: {
    accept?: Action;
    dismiss?: Action;
  };
}

const dialogClasses = cva([
  "backdrop-blur-md",
  "bg-neutral-100/75",
  "dark:bg-neutral-900/75",
  "rounded-3xl",
  "p-0",
  "not-prose",
  "data-[display=true]:scale-100",
  "data-[display=false]:scale-95",
  "data-[display=true]:blur-0",
  "data-[display=false]:blur-md",
]);

const buttonClasses = cva(
  [
    "whitespace-nowrap",
    "text-sm",
    "py-3",
    "px-8",
    "grow",
    "dark:border-neutral-800",
    "border-neutral-200",
    "capitalize",
    "border-t-2",
    "first:border-r",
    "last:border-l",
    "only:last:border-r-0",
    "only:last:border-l-0",
  ],
  {
    variants: {
      actionType: {
        dismiss: [],
        warn: ["text-yellow-500"],
        error: ["text-red-500"],
        confirm: ["text-blue-500"],
      },
    },
  }
);

/**
 * AlertDialog provide an elegant way to display alerts
 */
export const AlertDialog = ({
  title,
  subtitle,
  actions: { accept, dismiss },
  setState,
  ...props
}: AlertDialogProps): JSX.Element => {
  return (
    <Suspense fallback={null}>
      <Dialog
        className={dialogClasses()}
        setState={setState}
        closable={false}
        {...props}
      >
        <header className="py-6 flex flex-col justify-center align-middle items-center">
          <p className="mb-1 last:mb-0 text-md font-semibold">{title}</p>
          <p className="text-xs opacity-60">{subtitle}</p>
        </header>
        <div className="grid grid-cols-2">
          {accept && (
            <button
              className={buttonClasses({ actionType: accept.type })}
              onClick={() => {
                setState && setState(false);
                setState && accept.action();
              }}
            >
              {accept.title}
            </button>
          )}
          {dismiss && (
            <button
              className={buttonClasses({ actionType: dismiss.type })}
              onClick={() => {
                setState && setState(false);
                setState && dismiss.action();
              }}
            >
              {dismiss.title}
            </button>
          )}
        </div>
      </Dialog>
    </Suspense>
  );
};

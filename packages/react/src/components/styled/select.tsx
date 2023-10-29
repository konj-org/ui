import {
  type ReactNode,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
  Suspense,
  type ComponentProps,
} from "react";

// Dialog
const Dialog = lazy(() =>
  import("@/components/primitive/dialog").then((module) => ({
    default: module.Dialog,
  }))
);

// Icons
/**
 * The following icon is provided by Heroicons
 *  @see {@link https://github.com/tailwindlabs/heroicons}
 *  @license MIT
 */
const ChevronDownIcon = ({
  xmlns = "http://www.w3.org/2000/svg",
  viewBox = "0 0 24 24",
  className = "w-6 h-6",
  strokeWidth = 1.5,
  stroke = "currentColor",
  ...props
}: ComponentProps<"svg">) => (
  <svg
    xmlns={xmlns}
    viewBox={viewBox}
    className={className}
    strokeWidth={strokeWidth}
    stroke={stroke}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

// CVA
import { cva } from "class-variance-authority";

// Hooks
import { usePopover } from "@/hooks/use-popover";

const popoverClasses = cva([
  "left-[var(--left,_auto)]",
  "right-[var(--right,_auto)]",
  "top-[var(--top,_auto)]",
  "bottom-[var(--bottom,_auto)]",
  "w-auto",
  "backdrop:opacity-0!",
  "border",
  "rounded-xl",
  "overflow-y-auto",
  "overflow-x-hidden",
  "border-neutral-200",
  "bg-neutral-100",
  "dark:border-neutral-800",
  "dark:bg-neutral-900",
  "w-fit",
  "justify-start",
  "flex-col",
  "data-[display=false]:pointer-events-none",
  "opacity-0",
  "data-[display=false]:blur-sm",
  "data-[display=true]:blur-0",
  "data-[display=true]:backdrop:opacity-0",
  "data-[display=true]:opacity-100",
  "motion-safe:data-[display=false]:data-[append-to=top]:translate-y-2",
  "motion-safe:data-[display=false]:data-[append-to=bottom]:-translate-y-2",
  "motion-safe:data-[display=true]:data-[append-to=bottom]:translate-y-0",
  "motion-safe:data-[display=true]:data-[append-to=top]:translate-y-0",
  "fixed",
  "my-2",
  "mx-0",
  "p-0",
  "z-50",
  "duration-150",
]);

const mainButtonClasses = cva([
  "flex",
  "justify-start",
  "align-middle",
  "items-center",
  "gap-2",
  "transition-colors",
  "text-sm",
  "gap-2",
  "px-4",
  "py-2",
  "border",
  "border-neutral-200",
  "bg-neutral-100",
  "dark:border-neutral-800",
  "dark:bg-neutral-900",
  "rounded-xl",
  "enabled:hover:bg-neutral-200",
  "focus-visible:bg-neutral-200",
  "dark:enabled:hover:bg-neutral-800",
  "dark:focus-visible:bg-neutral-800",
  "disabled:cursor-not-allowed",
  "disabled:opacity-75",
]);

const popoverButtonClasses = cva([
  "flex",
  "w-[100%]",
  "justify-start",
  "align-middle",
  "items-center",
  "gap-2",
  "px-4",
  "py-2",
  "text-sm",
  "data-[selected=true]:bg-primary-300/50",
  "transition-colors",
  "enabled:hover:bg-neutral-300",
  "dark:enabled:hover:bg-neutral-800",
  "focus-visible:bg-neutral-300",
  "dark:focus-visible:bg-neutral-800",
  "outline-none",
]);

interface Value {
  label: ReactNode;
  key: string;
}

export interface SelectProps {
  label: string;
  placeholder?: string;
  defaultValueKey?: string;
  values: Value[];
  onValue?: (v: string) => void;
  value?: string;
  className?: string;
  disabled?: boolean;
}

const findDefaultValue = (values: Value[], key?: string) => {
  let defaultValue: Value | null = null;
  values.forEach((value) => {
    if (value.key === key) defaultValue = value;
  });

  if (typeof key !== undefined && defaultValue === null)
    console.error(`Select Component: Could found ${key} between the values`);

  return defaultValue;
};

export const Select = ({
  label,
  values,
  value,
  placeholder = "Select",
  defaultValueKey,
  onValue,
  className = "",
  disabled,
}: SelectProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [selectedValue, setSelectedValue] = useState<Value | null>(
    findDefaultValue(values, value ? value : defaultValueKey)
  );
  const [dialogS, setDialogS] = useState(false);
  const { close, open } = usePopover({
    dialogRef,
    invokerRef: buttonRef,
    setState: setDialogS,
  });

  useEffect(() => {
    if (typeof value === "undefined") return;

    setSelectedValue(findDefaultValue(values, value));
  }, [value, values]);

  const onSelect = useCallback(
    (v: Value) => {
      setSelectedValue(v);
      setDialogS(false);
      onValue && onValue(v.key);
    },
    [onValue]
  );

  return (
    <div className={className}>
      <label className="text-md block pb-2 capitalize">{label}</label>
      <button
        disabled={disabled}
        onClick={!disabled ? open : undefined}
        className={mainButtonClasses()}
        ref={buttonRef}
      >
        {selectedValue ? selectedValue.label : placeholder}
        <ChevronDownIcon className="w-4 h-4" />
      </button>
      <Suspense fallback={null}>
        <Dialog
          state={dialogS}
          setState={setDialogS}
          className={popoverClasses()}
          onExit={close}
          ref={dialogRef}
        >
          {values.map((value) => {
            return (
              <button
                key={value.key}
                className={popoverButtonClasses()}
                data-selected={selectedValue?.key === value.key}
                onClick={onSelect.bind(null, value)}
              >
                {value.label}
              </button>
            );
          })}
        </Dialog>
      </Suspense>
    </div>
  );
};

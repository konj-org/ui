import {
  type ReactNode,
  type ComponentProps,
  type ElementType,
  createElement,
  Fragment,
} from "react";

// Types
import type { VariantProps } from "class-variance-authority";

// CVA
import { cva } from "class-variance-authority";

// TW Merge
import { twMerge } from "tailwind-merge";

// Sub Components
import { Loading } from "@/components/react/styled/loading";

const borderColor = "border-[var(--border-color)]";

export const buttonClassName = cva(
  [
    "text-center",
    "capitalize",
    "py-2",
    "px-5",
    "text-sm",
    "inline-flex",
    "justify-center",
    "items-center",
    "height",
    "leading-none",
    "transition-colors",
    "duration-200",
    "rounded-3xl",
    "border",
    "border-transparent",
    "gap-2",
    "hover:cursor-pointer",
    "disabled:opacity-75",
    "disabled:hover:cursor-not-allowed",
    "disabled:data-[loading=true]:hover:cursor-wait",
    "relative",
  ],
  {
    variants: {
      variant: {
        filled: ["no-underline"],
        outline: ["no-underline", borderColor, "text-50", "dark:text-950"],
        ghost: ["no-underline"],
        subtle: ["no-underline", "text-50", "dark:text-950"],
        underline: ["underline", "underline-offset-2"],
      },
      compact: {
        true: ["py-1", "px-3"],
        false: [],
      },
      square: {
        true: ["p-2"],
        false: [],
      },
      compiledVariant: {
        //* Theme
        "theme-filled": [
          "text-neutral-950",
          "fill-neutral-950",
          "bg-neutral-300",
          "hover:bg-neutral-200",
          "focus-visible:bg-neutral-200",
          "active:bg-neutral-100",
          "dark:text-neutral-50",
          "dark:fill-neutral-50",
          "dark:bg-neutral-800",
          "dark:hover:bg-neutral-700",
          "dark:focus-visible:bg-neutral-700",
          "dark:active:bg-neutral-600",
        ],
        "theme-subtle": [
          "text-neutral-950",
          "fill-neutral-950",
          "bg-neutral-300/50",
          "hover:bg-neutral-200/50",
          "focus-visible:bg-neutral-200/50",
          "active:bg-neutral-100/50",
          "dark:text-neutral-50",
          "dark:fill-neutral-50",
          "dark:bg-neutral-800/50",
          "dark:hover:bg-neutral-700/50",
          "dark:focus-visible:bg-neutral-700/50",
          "dark:active:bg-neutral-600/50",
        ],
        "theme-ghost": [
          "text-neutral-900",
          "fill-neutral-900",
          "hover:text-neutral-800",
          "hover:fill-neutral-800",
          "focus-visible:text-neutral-800",
          "focus-visible:fill-neutral-800",
          "active:text-neutral-700",
          "active:fill-neutral-700",
          "dark:text-neutral-100",
          "dark:fill-neutral-100",
          "dark:hover:text-neutral-200",
          "dark:hover:fill-neutral-200",
          "dark:focus-visible:text-neutral-200",
          "dark:focus-visible:fill-neutral-200",
          "dark:active:text-neutral-300",
          "dark:active:fill-neutral-300",
        ],

        //* Light
        "light-filled": [
          "text-neutral-950",
          "fill-neutral-950",
          "bg-neutral-300",
          "hover:bg-neutral-200",
          "focus-visible:bg-neutral-200",
          "active:bg-neutral-100",
        ],
        "light-subtle": [
          "text-neutral-950",
          "fill-neutral-950",
          "bg-neutral-300/50",
          "hover:bg-neutral-200/50",
          "focus-visible:bg-neutral-200/50",
          "active:bg-neutral-100/50",
        ],
        "light-ghost": [
          "text-neutral-900",
          "fill-neutral-900",
          "hover:text-neutral-800",
          "hover:fill-neutral-800",
          "focus-visible:text-neutral-800",
          "focus-visible:fill-neutral-800",
          "active:text-neutral-700",
          "active:fill-neutral-700",
        ],

        //* Dark
        "dark-filled": [
          "text-neutral-50",
          "fill-neutral-50",
          "bg-neutral-800",
          "hover:bg-neutral-700",
          "focus-visible:bg-neutral-700",
          "active:bg-neutral-600",
        ],
        "dark-subtle": [
          "text-neutral-50",
          "fill-neutral-50",
          "bg-neutral-800/50",
          "hover:bg-neutral-700/50",
          "focus-visible:bg-neutral-700/50",
          "active:bg-neutral-600/50",
        ],
        "dark-ghost": [
          "text-neutral-100",
          "fill-neutral-100",
          "hover:text-neutral-200",
          "hover:fill-neutral-200",
          "focus-visible:text-neutral-200",
          "focus-visible:fill-neutral-200",
          "active:text-neutral-300",
          "active:fill-neutral-300",
        ],

        //* Primary
        "primary-filled": [
          "text-primary-100",
          "fill-primary-100",
          "bg-primary-500",
          "hover:bg-primary-600",
          "focus-visible:bg-primary-600",
          "active:bg-primary-700",
          "dark:text-primary-950",
          "dark:fill-primary-950",
          "dark:bg-primary-400",
          "dark:hover:bg-primary-500",
          "dark:focus-visible:bg-primary-500",
          "dark:active:bg-primary-600",
        ],
        "primary-subtle": [
          "text-primary-950",
          "fill-primary-950",
          "bg-primary-500/50",
          "hover:bg-primary-600/50",
          "focus-visible:bg-primary-600/50",
          "active:bg-primary-700/50",
          "dark:text-primary-100",
          "dark:fill-primary-100",
          "dark:bg-primary-400/50",
          "dark:hover:bg-primary-500/50",
          "dark:focus-visible:bg-primary-500/50",
          "dark:active:bg-primary-600/50",
        ],
        "primary-ghost": [
          "text-primary-600",
          "hover:text-primary-700",
          "focus-visible:text-primary-700",
          "active:text-primary-800",
          "dark:text-primary-400",
          "dark:hover:text-primary-500",
          "dark:focus-visible:text-primary-500",
          "dark:active:text-primary-600",
        ],

        //* Danger
        "danger-filled": [
          "text-red-100",
          "fill-red-100",
          "bg-red-500",
          "hover:bg-red-600",
          "focus-visible:bg-red-600",
          "active:bg-red-700",
          "dark:text-red-950",
          "dark:fill-red-950",
          "dark:bg-red-400",
          "dark:hover:bg-red-500",
          "dark:focus-visible:bg-red-500",
          "dark:active:bg-red-600",
        ],
        "danger-subtle": [
          "text-red-950",
          "fill-red-950",
          "bg-red-500/50",
          "hover:bg-red-600/50",
          "focus-visible:bg-red-600/50",
          "active:bg-red-700/50",
          "dark:text-red-100",
          "dark:fill-red-100",
          "dark:bg-red-400/50",
          "dark:hover:bg-red-500/50",
          "dark:focus-visible:bg-red-500/50",
          "dark:active:bg-red-600/50",
        ],
        "danger-ghost": [
          "text-red-600",
          "hover:text-red-700",
          "focus-visible:text-red-700",
          "active:text-red-800",
          "dark:text-red-400",
          "dark:hover:text-red-500",
          "dark:focus-visible:text-red-500",
          "dark:active:text-red-600",
        ],

        //* Link
        "link-filled": [
          "text-blue-100",
          "fill-blue-100",
          "bg-blue-500",
          "hover:bg-blue-600",
          "focus-visible:bg-blue-600",
          "active:bg-blue-700",
          "dark:text-blue-950",
          "dark:fill-blue-950",
          "dark:bg-blue-400",
          "dark:hover:bg-blue-500",
          "dark:focus-visible:bg-blue-500",
          "dark:active:bg-blue-600",
        ],
        "link-subtle": [
          "text-blue-950",
          "fill-blue-950",
          "bg-blue-500/50",
          "hover:bg-blue-600/50",
          "focus-visible:bg-blue-600/50",
          "active:bg-blue-700/50",
          "dark:text-blue-100",
          "dark:fill-blue-100",
          "dark:bg-blue-400/50",
          "dark:hover:bg-blue-500/50",
          "dark:focus-visible:bg-blue-500/50",
          "dark:active:bg-blue-600/50",
        ],
        "link-ghost": [
          "text-blue-600",
          "hover:text-blue-700",
          "focus-visible:text-blue-700",
          "active:text-blue-800",
          "dark:text-blue-400",
          "dark:hover:text-blue-500",
          "dark:focus-visible:text-blue-500",
          "dark:active:text-blue-600",
        ],

        //* Successful
        "successful-filled": [
          "text-green-100",
          "fill-green-100",
          "bg-green-500",
          "hover:bg-green-600",
          "focus-visible:bg-green-600",
          "active:bg-green-700",
          "dark:text-green-950",
          "dark:fill-green-950",
          "dark:bg-green-400",
          "dark:hover:bg-green-500",
          "dark:focus-visible:bg-green-500",
          "dark:active:bg-green-600",
        ],
        "successful-subtle": [
          "text-green-950",
          "fill-green-950",
          "bg-green-500/50",
          "hover:bg-green-600/50",
          "focus-visible:bg-green-600/50",
          "active:bg-green-700/50",
          "dark:text-green-100",
          "dark:fill-green-100",
          "dark:bg-green-400/50",
          "dark:hover:bg-green-500/50",
          "dark:focus-visible:bg-green-500/50",
          "dark:active:bg-green-600/50",
        ],
        "successful-ghost": [
          "text-green-600",
          "hover:text-green-700",
          "focus-visible:text-green-700",
          "active:text-green-800",
          "dark:text-green-400",
          "dark:hover:text-green-500",
          "dark:focus-visible:text-green-500",
          "dark:active:text-green-600",
        ],

        //* Warning
        "warning-filled": [
          "text-yellow-100",
          "fill-yellow-100",
          "bg-yellow-500",
          "hover:bg-yellow-600",
          "focus-visible:bg-yellow-600",
          "active:bg-yellow-700",
          "dark:text-yellow-950",
          "dark:fill-yellow-950",
          "dark:bg-yellow-400",
          "dark:hover:bg-yellow-500",
          "dark:focus-visible:bg-yellow-500",
          "dark:active:bg-yellow-600",
        ],
        "warning-subtle": [
          "text-yellow-950",
          "fill-yellow-950",
          "bg-yellow-500/50",
          "hover:bg-yellow-600/50",
          "focus-visible:bg-yellow-600/50",
          "active:bg-yellow-700/50",
          "dark:text-yellow-100",
          "dark:fill-yellow-100",
          "dark:bg-yellow-400/50",
          "dark:hover:bg-yellow-500/50",
          "dark:focus-visible:bg-yellow-500/50",
          "dark:active:bg-yellow-600/50",
        ],
        "warning-ghost": [
          "text-yellow-500",
          "hover:text-yellow-600",
          "focus-visible:text-yellow-600",
          "active:text-yellow-700",
          "dark:text-yellow-400",
          "dark:hover:text-yellow-500",
          "dark:focus-visible:text-yellow-500",
          "dark:active:text-yellow-600",
        ],
      },
      color: {
        theme: [
          "[--border-color:_theme(colors.neutral.300)]",
          "hover:[--border-color:_theme(colors.neutral.200)]",
          "focus-visible:[--border-color:_theme(colors.neutral.200)]",
          "active:[--border-color:_theme(colors.neutral.100)]",
          "dark:[--border-color:_theme(colors.neutral.800)]",
          "dark:hover:[--border-color:_theme(colors.neutral.700)]",
          "dark:focus-visible:[--border-color:_theme(colors.neutral.700)]",
          "dark:active:[--border-color:_theme(colors.neutral.600)]",
        ],
        light: [
          "[--border-color:_theme(colors.neutral.300)]",
          "hover:[--border-color:_theme(colors.neutral.200)]",
          "focus-visible:[--border-color:_theme(colors.neutral.200)]",
          "active:[--border-color:_theme(colors.neutral.100)]",
        ],
        dark: [
          "[--border-color:_theme(colors.neutral.800)]",
          "hover:[--border-color:_theme(colors.neutral.700)]",
          "focus-visible:[--border-color:_theme(colors.neutral.700)]",
          "active:[--border-color:_theme(colors.neutral.600)]",
        ],
        primary: [
          "[--border-color:_theme(colors.primary.500)]",
          "hover:[--border-color:_theme(colors.primary.600)]",
          "focus-visible:[--border-color:_theme(colors.primary.600)]",
          "active:[--border-color:_theme(colors.primary.700)]",
          "dark:[--border-color:_theme(colors.primary.400)]",
          "dark:hover:[--border-color:_theme(colors.primary.500)]",
          "dark:focus-visible:[--border-color:_theme(colors.primary.500)]",
          "dark:active:[--border-color:_theme(colors.primary.600)]",
        ],
        danger: [
          "[--border-color:_theme(colors.red.500)]",
          "hover:[--border-color:_theme(colors.red.600)]",
          "focus-visible:[--border-color:_theme(colors.red.600)]",
          "active:[--border-color:_theme(colors.red.700)]",
          "dark:[--border-color:_theme(colors.red.400)]",
          "dark:hover:[--border-color:_theme(colors.red.500)]",
          "dark:focus-visible:[--border-color:_theme(colors.red.500)]",
          "dark:active:[--border-color:_theme(colors.red.600)]",
        ],
        link: [
          "[--border-color:_theme(colors.blue.500)]",
          "hover:[--border-color:_theme(colors.blue.600)]",
          "focus-visible:[--border-color:_theme(colors.blue.600)]",
          "active:[--border-color:_theme(colors.blue.700)]",
          "dark:[--border-color:_theme(colors.blue.400)]",
          "dark:hover:[--border-color:_theme(colors.blue.500)]",
          "dark:focus-visible:[--border-color:_theme(colors.blue.500)]",
          "dark:active:[--border-color:_theme(colors.blue.600)]",
        ],
        successful: [
          "[--border-color:_theme(colors.green.500)]",
          "hover:[--border-color:_theme(colors.green.600)]",
          "focus-visible:[--border-color:_theme(colors.green.600)]",
          "active:[--border-color:_theme(colors.green.700)]",
          "dark:[--border-color:_theme(colors.green.400)]",
          "dark:hover:[--border-color:_theme(colors.green.500)]",
          "dark:focus-visible:[--border-color:_theme(colors.green.500)]",
          "dark:active:[--border-color:_theme(colors.green.600)]",
        ],
        warning: [
          "[--border-color:_theme(colors.yellow.500)]",
          "hover:[--border-color:_theme(colors.yellow.600)]",
          "focus-visible:[--border-color:_theme(colors.yellow.600)]",
          "active:[--border-color:_theme(colors.yellow.700)]",
          "dark:[--border-color:_theme(colors.yellow.400)]",
          "dark:hover:[--border-color:_theme(colors.yellow.500)]",
          "dark:focus-visible:[--border-color:_theme(colors.yellow.500)]",
          "dark:active:[--border-color:_theme(colors.yellow.600)]",
        ],
      },
    },
    defaultVariants: {
      variant: "subtle",
      color: "theme",
      compiledVariant: "theme-ghost",
    },
  }
);

const compileVariants = ({
  color,
  compact,
  variant,
  ...others
}: VariantProps<typeof buttonClassName>) => {
  let replacedVariant = null;
  switch (variant) {
    case "filled": {
      replacedVariant = "filled";
      break;
    }
    case "ghost": {
      replacedVariant = "ghost";
      break;
    }
    case "underline": {
      replacedVariant = "ghost";
      break;
    }
    default: {
      replacedVariant = "subtle";
      break;
    }
  }

  const generatedVariant = `${color}-${replacedVariant}` as VariantProps<
    typeof buttonClassName
  >["compiledVariant"];

  return {
    color,
    compact,
    variant,
    compiledVariant: generatedVariant,
    ...others,
  };
};

interface BaseButtonProps<T extends ElementType>
  extends Omit<VariantProps<typeof buttonClassName>, "compiledVariant"> {
  component?: T | undefined;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  compact?: boolean;
  className?: string;
  square?: boolean;
  loading?: boolean;
}

export type ButtonProps<T extends ElementType> = BaseButtonProps<T> &
  Omit<ComponentProps<T>, keyof BaseButtonProps<T>>;

/**
 * Button Element
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 * @example
 */
export const Button = <T extends ElementType = "button">({
  children,
  variant = "subtle",
  color = "theme",
  iconLeft,
  iconRight,
  compact = false,
  square = false,
  className,
  component,
  loading,
  disabled,
  onClick,
  ...props
}: ButtonProps<T>): JSX.Element =>
  createElement(
    component ? component : "button",
    {
      role: "button",
      onClick: !loading || !disabled ? onClick : undefined,
      disabled: loading || disabled,
      ["data-loading"]: loading,
      className: twMerge(
        buttonClassName(
          compileVariants({
            color,
            compact,
            square,
            variant,
          })
        ),
        className
      ),
      ...props,
    },
    <Fragment>
      {loading && (
        <Loading
          data-loading
          className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-4 h-4"
        />
      )}
      {iconLeft && (
        <span className="block whitespace-nowrap w-fit h-full">{iconLeft}</span>
      )}
      <span
        data-loading={loading}
        className="block whitespace-nowrap w-fit h-full transition-opacity data-[loading=true]:opacity-0"
      >
        {children}
      </span>
      {iconRight && (
        <span className="block whitespace-nowrap w-fit h-full">
          {iconRight}
        </span>
      )}
    </Fragment>
  );

/** @jsxImportSource preact */

import type { ComponentProps } from "preact";
import { twMerge } from "tailwind-merge";

interface LoadingProps
  extends Omit<
    ComponentProps<"svg">,
    "children" | "viewBox" | "fill" | "xmlns"
  > {
  strokeWidth?: number;
}

const calcStyle = ({ index }: { index: number }): string => {
  const delay = 120;
  const totalItems = 8;

  const compiledStyles = [
    `animation-duration: ${delay * totalItems}ms`,
    `animation-delay: ${delay * index}ms`,
    `opacity: 1`,
  ];

  return compiledStyles.join(";");
};

export const Loading = ({
  className = "",
  strokeWidth = 1.75,
  ...props
}: LoadingProps) => {
  return (
    <svg
      {...props}
      className={twMerge(
        ["w-6", "h-6", "stroke-neutral-950", "dark:stroke-neutral-50"].join(
          " "
        ),
        className as string
      )}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.17156 6.02159L9 8.88037"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-loading"
        style={calcStyle({ index: 8 })}
      />
      <path
        d="M4 11.9141L8 11.9141"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-loading"
        style={calcStyle({ index: 7 })}
      />
      <path
        d="M6.17151 17.8052L8.99994 14.9464"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-loading"
        style={calcStyle({ index: 6 })}
      />
      <path
        d="M12 20V15.957"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-loading"
        style={calcStyle({ index: 5 })}
      />
      <path
        d="M17.8284 17.8051L15 14.9463"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-loading"
        style={calcStyle({ index: 4 })}
      />
      <path
        d="M20 11.9141H16"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-loading"
        style={calcStyle({ index: 3 })}
      />
      <path
        d="M17.8285 6.02148L15.0001 8.88026"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-loading"
        style={calcStyle({ index: 2 })}
      />
      <path
        d="M12 4V8.04294"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-loading"
        style={calcStyle({ index: 1 })}
      />
    </svg>
  );
};

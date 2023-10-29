import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  lazy,
  Suspense,
} from "react";

// CVA
import { cva } from "class-variance-authority";

// TW-Merge
import { twMerge } from "tailwind-merge";

// Sub-Components
const Dialog = lazy(() =>
  import("@/components/primitive/dialog").then((module) => ({
    default: module.Dialog,
  }))
);

// Hooks
import { useTouchDialogDrag } from "@/hooks/use-touch-dialog-drag";

// Types
import type { DialogProps } from "@/components/primitive/dialog";

interface Action {
  title: string;
  key: string;
  action: () => void;
  closeOnAction?: boolean;
  type?: "danger" | "normal";
}

interface ActionSheetProps
  extends Omit<
    DialogProps,
    "animateOpacity" | "animateTransform" | "children" | "ref"
  > {
  title: string;
  mainAction?: Action;
  actions: Action[];
}

const Group = ({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={
        "backdrop-blur-md md:backdrop-blur-none md:bg-transparent md:dark:bg-transparent flex w-[100%] md:gap-2 md:rounded-none grow flex-col items-center justify-center rounded-2xl overflow-hidden bg-neutral-200/50 text-center dark:bg-neutral-800/50 " +
        className
      }
      {...props}
    />
  );
};

const ActionButton = ({
  className = "",
  main = false,
  ...props
}: ComponentProps<"button"> & { main?: boolean }) => {
  return (
    <button
      {...props}
      data-main={`${main}`}
      className={twMerge(
        [
          "capitalize",
          "transition-colors",
          "rounded-none",
          "fill-stale-900",
          "w-[100%]",
          "md:rounded-xl",
          "md:dark:bg-neutral-700",
          "md:bg-neutral-200",
          "md:border-t-0",
          "border-t",
          "border-t-neutral-700/10",
          "fill-neutral-900",
          "p-3",
          "text-sm",
          "only:border-t-0",
          "data-[type=danger]:text-red-600",
          "data-[type=normal]:text-sky-500",
          "dark:border-t-neutral-200/10",
          "dark:fill-neutral-100",
          "dark:text-neutral-100",
          "dark:data-[type=danger]:text-red-400",
          "dark:data-[type=normal]:text-blue-400",
          "md:hover:bg-neutral-300",
          "md:dark:hover:bg-neutral-600",
          "md:py-2",
          "data-[main=true]:py-4",
          "md:data-[main=true]:py-2",
        ].join(" "),
        className
      )}
    />
  );
};

const actionSheetStyles = cva([
  "not-prose",
  "md:shadow-xl",
  "md:border",
  "md:dark:border-neutral-700",
  "md:dark:bg-neutral-900",
  "md:border-neutral-300",
  "md:bg-neutral-100",
  "md:p-4",
  "md:rounded-[calc(theme(borderRadius.xl)_+_theme(space.4))]",
  "bottom-[calc(calc(env(safe-area-inset-bottom)_+_theme(space.3)))]",
  "left-[calc(theme(space.3)_+_env(safe-area-inset-left))]",
  "right-[calc(theme(space.3)_+_env(safe-area-inset-right))]",
  "w-[calc(100vw_-_theme(space.6)_-_env(safe-area-inset-left)-_env(safe-area-inset-right))]",
  "data-[display=true]:translate-y-0",
  "top-auto",
  "motion-safe:translate-y-[calc(100%_+_env(safe-area-inset-bottom)_+_theme(space.3))]",
  "bg-transparent",
  "p-0",
  "md:bottom-auto",
  "md:left-[50%]",
  "md:top-[50%]",
  "md:right-auto",
  "md:w-[min(300px,40vw)]",
  "md:translate-x-[-50%]",
  "md:translate-y-[-50%]",
  "md:data-[display=true]:translate-y-[-50%]",
  "md:data-[display=true]:blur-0",
  "md:blur-md",
  "md:data-[display=true]:scale-100",
  "md:scale-105",
]);

/**
 * Simple mobile friendly action sheet
 *
 * @param {ActionSheetProps} props
 * @returns {JSX.Element}
 */
export const ActionSheet = ({
  setState,
  state,
  title,
  actions,
  mainAction,
  ...props
}: ActionSheetProps): JSX.Element => {
  const { onTouchEnd, onTouchMove, ref } = useTouchDialogDrag({
    animateOpacity: true,
    onClose: setState?.bind(null, false),
    maxScroll: 300,
  });

  return (
    <Suspense fallback={null}>
      <Dialog
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        ref={ref}
        state={state}
        setState={setState}
        className={actionSheetStyles()}
        {...props}
      >
        <Group>
          <p
            data-draggable={true}
            className="text-xs md:text-lg text-inherit text-neutral-900 opacity-75 dark:text-neutral-100 w-full p-3 md:pt-4 md:pb-8"
          >
            {title}
          </p>
          {actions.map(
            ({ action, key, title, closeOnAction = true, type = "normal" }) => (
              <ActionButton
                data-draggable={true}
                key={key}
                onClick={() => {
                  closeOnAction && setState && setState(false);
                  action();
                }}
                data-type={type}
              >
                {title}
              </ActionButton>
            )
          )}
        </Group>
        {mainAction && (
          <Group data-draggable={true} className="mt-2">
            <ActionButton
              main
              data-draggable={true}
              className="font-semibold"
              onClick={() => {
                mainAction.closeOnAction !== false &&
                  setState &&
                  setState(false);
                mainAction.action();
              }}
              data-type={
                mainAction.type !== undefined ? mainAction.type : "normal"
              }
            >
              {mainAction.title}
            </ActionButton>
          </Group>
        )}
      </Dialog>
    </Suspense>
  );
};

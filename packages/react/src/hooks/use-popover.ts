import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
  useCallback,
} from "react";

interface UsePopoverProps {
  setState: Dispatch<SetStateAction<boolean>>;
  invokerRef: MutableRefObject<HTMLElement | null>;
  dialogRef: MutableRefObject<HTMLDialogElement | null>;
  appendTo?: "center" | "side";
}

export const usePopover = ({
  setState,
  invokerRef,
  dialogRef,
  appendTo = "center",
}: UsePopoverProps) => {
  /** Cleans the CSS variables */
  const close = useCallback(() => {
    if (dialogRef.current === null) return;

    dialogRef.current.style.removeProperty("--left");
    dialogRef.current.style.removeProperty("--right");
    dialogRef.current.style.removeProperty("--top");
    dialogRef.current.style.removeProperty("--bottom");
  }, [dialogRef]);

  /** Opens the Popover element */
  const open = useCallback(() => {
    if (invokerRef.current === null || dialogRef.current === null) return;

    const { top, right, left, width, bottom } =
      invokerRef.current.getBoundingClientRect();

    // Appending the popover to the bottom incase the there is a sufficient space in the bottom of the invoker element
    const appendOnBottom = top < window.innerHeight * 0.5;

    // Appending the popover on the right side incase the there is a sufficient space in right side of the invoker element
    const appendOnRight = left + width / 2 < window.innerWidth * 0.5;

    // Setting general stylings
    dialogRef.current.style.display = "flex";
    dialogRef.current.setAttribute(
      "data-append-to",
      appendOnBottom ? "bottom" : "top"
    );

    switch (appendTo) {
      case "center": {
        // Positioned on right side of the element
        if (appendOnRight) {
          dialogRef.current.style.setProperty("--left", left + "px");
        }

        // Positioned on left side of the element
        if (!appendOnRight) {
          dialogRef.current.style.setProperty(
            "--right",
            `${window.innerWidth - right}px`
          );
        }

        // Positioned on top of the element
        if (!appendOnBottom)
          dialogRef.current.style.setProperty(
            "--bottom",
            `${window.innerHeight - top}px`
          );

        // Positioned on the bottom of the element
        if (appendOnBottom)
          dialogRef.current.style.setProperty("--top", bottom + "px");

        break;
      }
      case "side": {
        // Positioned on right side of the element
        if (appendOnRight) {
          dialogRef.current.style.setProperty("--left", right + "px");
        }

        // Positioned on left side of the element
        if (!appendOnRight) {
          dialogRef.current.style.setProperty(
            "--right",
            `${window.innerWidth - left}px`
          );
        }

        // Positioned on top of the element
        if (!appendOnBottom)
          dialogRef.current.style.setProperty(
            "--bottom",
            `${window.innerHeight - bottom}px`
          );

        // Positioned on the bottom of the element
        if (appendOnBottom)
          dialogRef.current.style.setProperty("--top", top + "px");

        break;
      }
    }

    // Opening the modal
    requestAnimationFrame(() => {
      setState && setState(true);
    });
  }, [setState, invokerRef, dialogRef, appendTo]);

  return {
    open,
    close,
  };
};

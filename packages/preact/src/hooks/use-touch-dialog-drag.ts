import { useCallback, useRef, useState } from "preact/hooks";

const simpleClamp = (delta: number, maxScroll: number) => {
  const windowHeight = window.innerHeight;
  const movedPercent = delta / windowHeight / 2;

  return movedPercent * maxScroll;
};

export const useTouchDialogDrag = ({
  onClose,
  animateOpacity = false,
  maxScroll = 200,
}: {
  onClose?: (() => void) | undefined;
  maxScroll?: number;
  animateOpacity?: boolean;
}) => {
  const [startingPos, setStartingPos] = useState<null | number>(null);
  const [lastPos, setLastPos] = useState<null | number>(null);
  const ref = useRef<HTMLDialogElement>(null);

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      const { current } = ref;
      if (current === null) return;

      const { touches, target } = e;

      if ((target as HTMLElement).getAttribute("data-draggable") === null)
        return;

      if (startingPos === null) {
        setStartingPos(touches[0]!.screenY);
      } else {
        const delta = touches[0]!.screenY - startingPos;

        // Incase drag direction is in opposite to closing we will clamp it
        const movedBy = delta < 0 ? simpleClamp(delta, maxScroll) : delta;

        current.style.setProperty("transform", `translateY(${movedBy}px)`);
        if (animateOpacity && delta > 0)
          current.style.setProperty("opacity", `${1 - delta / 100}`);

        current.style.setProperty("transition", "none");
        setLastPos(touches[0]!.screenY);
      }
    },
    [startingPos, maxScroll, animateOpacity]
  );

  const onTouchEnd = useCallback(() => {
    const { current } = ref;
    if (current === null) return;

    current.style.removeProperty("transform");
    animateOpacity && current.style.removeProperty("opacity");
    current.style.removeProperty("transition");

    if (
      lastPos !== null &&
      startingPos !== null &&
      startingPos - lastPos < -100
    ) {
      onClose && onClose();
    }

    setStartingPos(null);
    setLastPos(null);
  }, [startingPos, lastPos, onClose, animateOpacity]);

  return {
    onTouchMove,
    onTouchEnd,
    ref,
  };
};

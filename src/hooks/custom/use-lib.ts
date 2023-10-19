import type { UILibraries } from "@/data/types";
import { signal } from "@preact/signals";
import { useCallback, useEffect } from "preact/hooks";

export const librarySignal = signal<UILibraries>("react");

const localStorageKey = "KONJ_UI_PREFERRED_LIB";
const possibleLibraries: UILibraries[] = ["preact", "react", "solid"];

export const useLibrary: () => [UILibraries, (v: UILibraries) => void] = () => {
  const setLibrary = useCallback((v: UILibraries) => {
    localStorage.setItem(localStorageKey, v);
    librarySignal.value = v;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const v = localStorage.getItem(localStorageKey);

    if (
      v !== null &&
      v !== librarySignal.peek() &&
      possibleLibraries.includes(v as UILibraries)
    ) {
      librarySignal.value = v as UILibraries;
    }
  }, []);

  return [librarySignal.value, setLibrary];
};

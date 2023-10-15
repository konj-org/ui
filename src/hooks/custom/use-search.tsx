// Types
import type { UIComponent } from "@/data/components";
import type { UIHook } from "@/data/hooks";

// Preact
import { useCallback } from "preact/hooks";

// Signals
import { useSignal } from "@preact/signals";

// Fuse.js
import Fuse from "fuse.js";

// Data
import components from "@/data/components";
import hooks from "@/data/hooks";

const componentsFuse = new Fuse(Object.values(components), {
  keys: ["title", "description", "category", "model"],
});
const hooksFuse = new Fuse(Object.values(hooks), {
  keys: ["title", "description"],
});

export const useSearch = () => {
  const componentResults = useSignal<UIComponent[]>([]);
  const hooksResults = useSignal<UIHook[]>([]);

  const search = useCallback(
    (param: string) => {
      const cResults = componentsFuse
        .search(param)
        .map(({ item }) => item) as UIComponent[];

      const hResults = hooksFuse
        .search(param)
        .map(({ item }) => item) as UIHook[];

      componentResults.value = cResults;
      hooksResults.value = hResults;

      return [cResults, hResults];
    },
    [componentResults]
  );

  return {
    hooksResults,
    componentResults,
    search,
  };
};

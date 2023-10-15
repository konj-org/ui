import type { UIHook } from "./types";

/** The Single source of truth for hooks */
const hooks = {
  "use-touch-dialog-drag": {
    key: "use-touch-dialog-drag",
    title: "useTouchDialogDrag",
    description:
      "An internal Hook, used in modal components, with swiping capability.",
    filename: "use-touch-dialog-drag.ts",
    internalDependencies: { react: [], preact: [] },
    supports: ["preact", "react"],
  },
} satisfies { [key: string]: UIHook };

export default hooks;

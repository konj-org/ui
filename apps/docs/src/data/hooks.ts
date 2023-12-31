import type { UIHook } from "./types";

/** The Single source of truth for hooks */
const hooks = {
  "use-touch-dialog-drag": {
    key: "use-touch-dialog-drag",
    title: "use Touch Dialog Drag",
    description:
      "An internal Hook, used in modal components, with swiping capability.",
    filename: "use-touch-dialog-drag.ts",
    internalDependencies: { react: [], preact: [] },
    supports: ["preact", "react"],
  },
  "use-popover": {
    key: "use-popover",
    title: "use Popover",
    description: "A hook used with dropdown menu, to display and hide items.",
    filename: "use-popover.ts",
    internalDependencies: { react: [], preact: [] },
    supports: ["preact", "react"],
  },
} satisfies { [key: string]: UIHook };

export default hooks;

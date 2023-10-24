import type { UIComponent } from "./types";

/** The Single source of truth for components */
const components = {
  // ---------------------------------------- //
  // ----- Styled Components ---------------- //
  // ---------------------------------------- //
  "alert-dialog": {
    key: "alert-dialog",
    title: "Alert Dialog",
    description:
      "Simple alert component, as a replacement for browsers default alert modal.",
    filename: "alert-dialog.tsx",
    internalDependencies: { react: ["modal"], preact: ["modal"] },
    supports: ["preact", "react"],
    reactType: "client",
    category: "modal",
    model: "styled",
  },
  "anchored-dialog": {
    key: "anchored-dialog",
    title: "Anchored Dialog",
    description: "A large modal, usable for modals with too much content.",
    filename: "anchored-dialog.tsx",
    internalDependencies: {
      react: ["modal", "use-touch-dialog-drag"],
      preact: ["modal", "use-touch-dialog-drag"],
    },
    supports: ["preact", "react"],
    reactType: "client",
    category: "modal",
    model: "styled",
  },
  "action-sheet": {
    key: "action-sheet",
    title: "Action Sheet",
    description: "A small modal, usable for quick action selection.",
    filename: "action-sheet.tsx",
    internalDependencies: {
      react: ["modal", "use-touch-dialog-drag"],
      preact: ["modal", "use-touch-dialog-drag"],
    },
    supports: ["preact", "react"],
    reactType: "client",
    category: "modal",
    model: "styled",
  },
  "floating-sheet": {
    key: "floating-sheet",
    title: "Floating Sheet",
    description: "Display small amount of text with related actions.",
    filename: "floating-sheet.tsx",
    internalDependencies: {
      react: ["modal", "use-touch-dialog-drag"],
      preact: ["modal", "use-touch-dialog-drag"],
    },
    supports: ["preact", "react"],
    reactType: "client",
    category: "modal",
    model: "styled",
  },
  button: {
    key: "button",
    title: "Button",
    description:
      "Simple and elegant Button component. Fully customizable, with support for loading state and side icons.",
    filename: "button.tsx",
    internalDependencies: { react: ["modal"], preact: ["modal"] },
    supports: ["preact", "react"],
    reactType: "server",
    category: "button",
    model: "styled",
  },
  "dropdown-menu": {
    key: "dropdown-menu",
    title: "Dropdown Menu",
    description: "Macos inspired dropdown menu.",
    filename: "dropdown-menu.tsx",
    internalDependencies: { react: ["modal"], preact: ["modal"] },
    supports: ["preact", "react"],
    reactType: "client",
    category: "input",
    model: "styled",
  },
  select: {
    key: "select",
    title: "Select",
    description: "Replacement for the browsers default 'select' input.",
    filename: "select.tsx",
    internalDependencies: {
      react: ["modal", "use-popover"],
      preact: ["modal", "use-popover"],
    },
    supports: ["preact", "react"],
    reactType: "client",
    category: "input",
    model: "styled",
  },
  "file-input": {
    key: "file-input",
    title: "File input",
    description:
      "Elegant and easy to use file input, with drag and drop support.",
    filename: "file-input.tsx",
    internalDependencies: {
      react: [],
      preact: [],
    },
    supports: ["preact", "react"],
    reactType: "client",
    category: "input",
    model: "styled",
  },
  loading: {
    key: "loading",
    title: "Loading",
    description:
      "Simple and elegant loading indicator. Inspired by the loading indicator on ios",
    filename: "loading.tsx",
    internalDependencies: { react: [], preact: [] },
    supports: ["preact", "react"],
    reactType: "server",
    category: "miscellaneous",
    model: "styled",
  },
  "segmented-control": {
    key: "segmented-control",
    title: "Segmented Control",
    description: "Segmented buttons with animated with hover animation",
    filename: "segmented-control.tsx",
    internalDependencies: {
      react: ["button"],
      preact: ["button", "default-components"],
    },
    supports: ["preact", "react"],
    reactType: "client",
    category: "display",
    model: "styled",
  },
  "stacking-cards": {
    key: "stacking-cards",
    title: "Stacking Cards",
    description:
      "Fully animated stackable cards. Designed for preserving space while keeping them accessible for the users.",
    filename: "stacking-cards.tsx",
    internalDependencies: { react: [], preact: [] },
    supports: ["preact", "react"],
    reactType: "client",
    category: "display",
    model: "styled",
  },
  tab: {
    key: "tab",
    title: "Tab",
    description: "Fully animated tab system.",
    filename: "tab.tsx",
    internalDependencies: {
      react: ["segmented-control"],
      preact: ["segmented-control", "default-components"],
    },
    supports: ["preact", "react"],
    reactType: "client",
    category: "display",
    model: "styled",
  },
  // ---------------------------------------- //
  // ----- Primitive Components ------------- //
  // ---------------------------------------- //
  dialog: {
    key: "dialog",
    title: "Dialog",
    description:
      "Modified version of html modal components, designed for easier animations and modification.",
    filename: "dialog.tsx",
    internalDependencies: { react: [], preact: [] },
    supports: ["preact", "react"],
    reactType: "client",
    category: "modal",
    model: "primitive",
  },
  "default-components": {
    key: "default-components",
    title: "Default Components",
    description: "A set fo default components, used to provide types in preact",
    filename: "default-components.tsx",
    internalDependencies: { react: [], preact: [] },
    supports: ["preact"],
    reactType: undefined,
    category: "miscellaneous",
    model: "primitive",
  },
} satisfies { [key: string]: UIComponent };

export default components;

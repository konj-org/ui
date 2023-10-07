/** @jsxImportSource preact */

import { type ComponentProps, createElement } from "preact";

export const DButton = (props: Omit<ComponentProps<"button">, "class">) =>
  createElement("button", props);

export const DAnchor = (props: Omit<ComponentProps<"a">, "class">) =>
  createElement("a", props);

export const DDiv = (props: Omit<ComponentProps<"div">, "class">) =>
  createElement("div", props);

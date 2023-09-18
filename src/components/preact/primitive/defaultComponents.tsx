import { type ComponentProps, createElement } from "preact";

export const DButton = (props: ComponentProps<"button">) =>
  createElement("button", props);

export const DAnchor = (props: ComponentProps<"a">) =>
  createElement("a", props);

export const DDiv = (props: ComponentProps<"div">) =>
  createElement("div", props);

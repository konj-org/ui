/** @jsxImportSource preact */

// Preact
import type { ComponentType } from "preact";

// SubComponents
import { AboutIcon, ComponentsIcon, HooksIcon, SetupIcon } from "./icons";

export type NavbarActiveStates = "components" | "hooks";

export interface InternalLink {
  key: string;
  title: string;
  to: string | undefined;
  expandable: NavbarActiveStates | undefined;
  icon: ComponentType<any>;
}

export const links: InternalLink[] = [
  {
    key: "setup",
    title: "Setup",
    to: "/setup",
    expandable: undefined,
    icon: SetupIcon,
  },
  {
    key: "components",
    title: "Components",
    to: "/components",
    expandable: "components",
    icon: ComponentsIcon,
  },
  {
    key: "hooks",
    title: "Hooks",
    to: "/hooks",
    expandable: "hooks",
    icon: HooksIcon,
  },
  {
    key: "about",
    title: "About",
    to: "/about",
    expandable: undefined,
    icon: AboutIcon,
  },
];

/** @jsxImportSource preact */

// Preact
import type { ComponentType } from "preact";

// SubComponents
import { GithubIcon, ComponentsIcon, HooksIcon, SetupIcon } from "./icons";

export type NavbarActiveStates = "components" | "hooks";

export interface InternalLink {
  key: string;
  title: string;
  to: string | undefined;
  expandable: NavbarActiveStates | undefined;
  icon: ComponentType<any>;
  external: boolean;
}

export const links: InternalLink[] = [
  {
    key: "setup",
    title: "Setup",
    to: "/setup",
    expandable: undefined,
    icon: SetupIcon,
    external: false,
  },
  {
    key: "components",
    title: "Components",
    to: "/components",
    expandable: "components",
    icon: ComponentsIcon,
    external: false,
  },
  {
    key: "hooks",
    title: "Hooks",
    to: "/hooks",
    expandable: "hooks",
    icon: HooksIcon,
    external: false,
  },
  {
    key: "github",
    title: "Github",
    to: "https://github.com/konj-org/ui",
    expandable: undefined,
    icon: GithubIcon,
    external: true,
  },
];

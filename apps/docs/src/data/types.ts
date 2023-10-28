// Types
export type UILibraries = "react" | "preact" | "solid";
export type UICategory =
  | "button"
  | "modal"
  | "miscellaneous"
  | "display"
  | "input";

// Interfaces
export interface UIHook {
  key: string;
  title: string;
  description: string;
  internalDependencies: { [library: string]: string[] };
  filename: string;
  supports: UILibraries[];
}

export interface UIComponent {
  key: string;
  title: string;
  description: string;
  internalDependencies: { [library: string]: string[] };
  filename: string;
  category: UICategory;
  reactType: "client" | "server" | undefined;
  model: "primitive" | "styled" | "custom";
  supports: UILibraries[];
}

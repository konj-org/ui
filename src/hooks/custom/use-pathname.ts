import { signal } from "@preact/signals";

export const pathnameSignal = signal<string>("/");

export const usePathname = () => pathnameSignal;

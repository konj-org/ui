import { signal } from "@preact/signals";

export const librarySignal = signal<"react" | "preact">("react");

export const useLibrary = () => librarySignal;

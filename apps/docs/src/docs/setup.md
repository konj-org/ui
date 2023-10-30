# Setup Guide

### Installing packages

Install [react-ui](https://www.npmjs.com/package/@konj-org/react-ui) / [preact-ui](https://www.npmjs.com/package/@konj-org/preact-ui) using your preferred package manager.

#### NPM

```bash
# React Components
npm i @konj-org/react-ui

# Preact Components
npm i @konj-org/preact-ui
```

#### PNPM

```bash
# React Components
pnpm add @konj-org/react-ui

# Preact Components
pnpm add @konj-org/preact-ui
```

### Setup TailwindCSS

Follow the official [TailwindCSS](https://github.com/tailwindlabs/tailwindcss) guide for your framework of choice, then modify the `tailwind.config.js` to mimic the following configuration.

```js
// tailwind.config.js
import colors from "tailwindcss/colors";
import containerQueries from "@tailwindcss/container-queries";

/** @type {import('tailwindcss').Config} */
const config = {
  // ... //
  content: [
    // ... //
    // Incase your using preact-ui //
    "node_modules/@konj-org/preact-ui/**/*.tsx",
    // Incase your using react-ui //
    "node_modules/@konj-org/react-ui/**/*.tsx",
    // ... //
  ],
  theme: {
    transitionTimingFunction: {
      elastic: "cubic-bezier(0.68, 0, 0.32, 1.2)",
    },
    fontFamily: {
      sans: [
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Open Sans",
        "Helvetica Neue",
        "sans-serif",
      ],
      mono: [
        "SF Mono",
        "SFMono-Regular",
        "ui-monospace",
        "DejaVu Sans Mono",
        "Menlo",
        "Consolas",
        "monospace",
      ],
    },
    extend: {
      keyframes: {
        "opacity-keyframes": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        "loading-keyframes": {
          from: {
            opacity: 0.5,
          },
          to: {
            opacity: 1,
          },
        },
      },
      animation: {
        "fade-in": "opacity-keyframes .5s ease-in-out forwards",
        loading: "loading-keyframes infinite",
      },
      colors: {
        // You can modify the primary color to your linking
        primary: colors.green,
      },
      screens: {
        standalone: {
          raw: "(display-mode: standalone)",
        },
        "iphone-portrait": {
          raw: `
            (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait), 
            (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait), 
            (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait), 
            (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait), 
            (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)
          `,
        },
      },
    },
  },
  plugins: [
    containerQueries,
    // ... //
  ],
};

export default config;
```

### Adding Global styling

Add the following CSS snippet to your global CSS file.

```css
/* global.css */
*,
*::after,
*::before {
  -webkit-tap-highlight-color: transparent;
}

*:focus-visible {
  @apply accent-primary-500/60 dark:accent-primary-300/60 outline-primary-500/60 dark:outline-primary-300/60;
}

body {
  @apply bg-neutral-50 dark:bg-neutral-950 text-black dark:text-white;
}

@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}
@media (prefers-color-scheme: light) {
  :root {
    color-scheme: light;
  }
}

html[data-modal-open="true"] * {
  touch-action: none;
}
html[data-modal-open="true"]
  [data-dialog-open="true"]
  [data-scrollable="true"]
  * {
  touch-action: auto;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  @apply appearance-none m-0;
}
```

### Troubleshooting

Incase you're using an old version of npm, you might have to install peer dependencies manually. The peer dependencies include the following packages:

- [class-variance-authority](https://github.com/joe-bell/cva): Adds multiple styling state support single components.
- [tailwind-merge](https://github.com/dcastil/tailwind-merge): Adds class name merging support.
- [@tailwindcss/container-queries](https://github.com/tailwindlabs/tailwindcss-container-queries): Providing container quires support for TailwindCSS.

```bash
npm install @tailwindcss/container-queries class-variance-authority tailwind-merge
```

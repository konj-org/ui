# Konj Ui NextJS example

> **Notice**, Keep in mind at this point there is no built-in support for server components. You can copy and paste the components code inside your project, as a temporary solution.

## Setup guide

### Install NextJS with the following config

```bash
✔ What is your project named? … { Your preferred name }
✔ Would you like to use TypeScript? … { Optional }
✔ Would you like to use ESLint? … { Optional }
✔ Would you like to use Tailwind CSS? … { YES }
✔ Would you like to use `src/` directory? …  { Optional }
✔ Would you like to use App Router? (recommended) …  { Optional }
✔ Would you like to customize the default import alias (@/*)? …  { Optional }
```

### Installing packages

```bash
# with npm
npm i @konj-org/react-ui

# with pnpm
pnpm add @konj-org/react-ui
```

### Updating `tailwind.config.js`

Your tailwind config should resemble the following snippet.

```js
/* tailwind.config.js */

import colors from "tailwindcss/colors";
import containerQueries from "@tailwindcss/container-queries";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/@konj-org/react-ui/**/*.js",
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
        loading: "loading-keyframes steps(4) infinite",
      },
      colors: {
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
  plugins: [containerQueries],
};

export default config;
```

### Updating your Global CSS

Incase of app router your Global CSS can be find in the following address `src/app/globals.css`, update it with the following snippet.

```css
/* globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

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

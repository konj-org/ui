# Setup Guide

## Automatic ( NPM Package )

Coming Soon

## Manual

### Step 0 - TailwindCSS Setup

Follow the official [TailwindCSS](https://github.com/tailwindlabs/tailwindcss) guide for your framework of choice, then modify the `tailwind.config.js` to mimic the following configuration. Keep in mind you also have to install the `container-queries` plugin.

```js
// tailwind.config.js
import containerQueries from "@tailwindcss/container-queries";

/** @type {import('tailwindcss').Config} */
const config = {
  // ... //
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
  plugins: [
    containerQueries,
    // ... //
  ],
};

export default config;
```

### Step 1 - Adding Global styling

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

### Step 2 - Installing additional dependencies

You can avoid installing additional packages by modifying the component codes, but it's advised to use them since they add an array of functionalities. The required packages are listed below:

- [class-variance-authority](https://github.com/joe-bell/cva): Adds multiple styling state support single components.
- [tailwind-merge](https://github.com/dcastil/tailwind-merge): Adds class name merging support.

Install them by running the following command:

#### PNPM - Recommended

```bash
pnpm add class-variance-authority tailwind-merge
```

#### NPM

```bash
npm install class-variance-authority tailwind-merge
```

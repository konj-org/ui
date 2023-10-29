import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { MDXInstance } from "astro";

import { signal } from "@preact/signals";

export const mappedDemos = signal<{
  [key: string]: AstroComponentFactory;
}>({});

const isProd = process.env.NODE_ENV === "production";

/** Returns the selected Demo */
export const getDemo = (
  id: string,
  demos: MDXInstance<Record<string, any>>[]
) =>
  new Promise<AstroComponentFactory | undefined>((resolve) => {
    if (typeof mappedDemos.value[id] !== "undefined" && isProd)
      return resolve(mappedDemos.value[id]);

    demos.forEach(({ frontmatter, Content }): AstroComponentFactory | void => {
      if (typeof mappedDemos.value[frontmatter.key] !== "undefined" && isProd)
        mappedDemos.value[frontmatter.key] = Content;

      if (frontmatter.key === id) return resolve(Content);
    });

    resolve(undefined);
  });

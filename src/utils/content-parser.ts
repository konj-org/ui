// Node
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";

// Types
import type { UIComponent, UILibraries } from "@/data/components";

// Marked
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

// Frontmatter
import fm from "front-matter";

/** Parses the markdown content */
const __parse = async <T extends Object>(data: string) => {
  const marked = new Marked(
    {
      gfm: true,
    },
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    })
  );

  const { body, attributes } = fm(data);
  const html = await marked.parse(body);

  if (typeof html === "undefined" || typeof attributes === "undefined")
    throw new Error("Failed to parse html");

  return { html, frontmatter: attributes as T };
};

interface ParseTSXProps {
  filename: string;
  model: UIComponent["model"];
  type: "component" | "hook";
  library: UILibraries;
}

/** Parses the given typescript file, supports booth typescript and tsx */
export const parseTS = ({ type, library, model, filename }: ParseTSXProps) =>
  new Promise<string | null>(async (res, rej) => {
    try {
      const path = resolve(
        cwd(),
        "src",
        type + "s",
        library as unknown as string,
        model,
        filename
      );

      const filetype = filename.slice(filename.indexOf(".") + 1);

      if (!existsSync(path)) res(null);

      const file = readFileSync(path);

      const wrappedFile = "```" + filetype + "\n" + file + "\n```";

      const { html } = await __parse(wrappedFile);

      res(html);
    } catch (err) {
      console.error(err);
      rej(null);
    }
  });

export const parseMarkdown = async <T extends object>(
  ...pathname: string[]
): Promise<{ html: string; frontmatter: T }> => {
  const path = resolve(cwd(), ...pathname);
  const content = readFileSync(path, "utf-8");

  const parsedData = await __parse<T>(content);

  return parsedData;
};

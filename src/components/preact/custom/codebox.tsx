/** @jsxImportSource preact */

// Preact
import { useEffect, useMemo, useRef } from "preact/compat";

// Types
import type { UIComponent, UIHook } from "@/data/types";
import type { Code } from "@/utils/content-parser";

// Components
import { Button } from "@/components/preact/styled/button";

// Hooks
import { useLibrary } from "@/hooks/custom/use-lib";

// SubComponents
import Codeshare from "./codeshare";

export interface CodeboxProps {
  code: {
    react?: Code | undefined;
    preact?: Code | undefined;
    solid?: Code | undefined;
  };
  itemType: "component" | "hook";
  component?: UIComponent | UIHook;
}

const Codebox = ({ code, itemType, component }: CodeboxProps) => {
  const [library, setLibrary] = useLibrary();
  const sectionRef = useRef<null | HTMLDivElement>(null);

  /** The current active library */
  const selectedLibrary = useMemo(() => {
    if (code[library] !== undefined) return library;

    if (code.react !== undefined) return "react";

    if (code.preact !== undefined) return "preact";

    return "react";
  }, [library, code]);

  console.log(library);

  // Notifies the dom from the component hydration
  useEffect(() => {
    const { current: section } = sectionRef;
    if (section === null) return;

    const codeboxWrapper = section.parentElement?.parentElement;

    if (
      codeboxWrapper === null ||
      codeboxWrapper === undefined ||
      !codeboxWrapper.hasAttribute("data-codebox-wrapper")
    )
      return;

    codeboxWrapper.setAttribute("data-visible", "false");
    section.setAttribute("data-visible", "true");
  }, []);

  return (
    <section
      className="my-0 opacity-0 data-[visible=true]:opacity-100 transition-opacity duration-300"
      data-visible={false}
      ref={sectionRef}
    >
      <div className="py-4 md:h-[6rem] flex flex-col md:flex-row items-center justify-between md:items-center content-center">
        <h3 className="my-0 mb-2 md:mb-0 text-3xl mr-auto">Source Code</h3>
        <Codeshare code={code} itemType={itemType} library={selectedLibrary} />
      </div>
      <div class="bg-neutral-900 rounded-2xl overflow-hidden">
        <div class="flex border-b border-neutral-800">
          {code.react !== undefined && (
            <Button
              className="transition-all rounded-none px-8 py-2"
              variant={selectedLibrary === "react" ? "filled" : "ghost"}
              color="dark"
              onClick={setLibrary.bind(null, "react")}
            >
              React
            </Button>
          )}
          {code.preact !== undefined && (
            <Button
              className="transition-all rounded-none px-8 py-2"
              variant={selectedLibrary === "preact" ? "filled" : "ghost"}
              color="dark"
              onClick={setLibrary.bind(null, "preact")}
            >
              Preact
            </Button>
          )}
        </div>
        <div>
          {code.react && selectedLibrary === "react" && (
            <div
              id="react-code"
              className="[&_pre]:max-h-[40vh] [&_pre]:overflow-y-auto [&_pre]:!rounded-none [&_pre]:my-0"
              dangerouslySetInnerHTML={{ __html: code.react.html }}
            />
          )}
          {code.preact && selectedLibrary === "preact" && (
            <div
              id="preact-code"
              className="[&_pre]:max-h-[40vh] [&_pre]:overflow-y-auto [&_pre]:!rounded-none [&_pre]:my-0"
              dangerouslySetInnerHTML={{ __html: code.preact.html }}
            />
          )}
        </div>
      </div>
      {selectedLibrary === "react" &&
        (component as UIComponent)?.reactType === "client" && (
          <p class="flex gap-3 bg-yellow-100 dark:bg-yellow-950/50 px-8 py-4 border border-yellow-300 dark:border-yellow-900 rounded-2xl leading-none">
            <span>Incase of usage with Next.js v13, add the</span>
            <span class="font-mono">use client;</span>
            <span>directive at the start of the component.</span>
          </p>
        )}
    </section>
  );
};

export default Codebox;

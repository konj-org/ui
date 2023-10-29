/** @jsxImportSource preact */

import { useState } from "preact/hooks";

import { SegmentedControl } from "@konj-org/preact-ui";

const internalLinks = [
  {
    children: "Setup",
    href: "#setup",
    id: "setup",
  },
  {
    children: "Components",
    href: "#components",
    id: "components",
  },
  {
    children: "Hooks",
    href: "#hooks",
    id: "hooks",
  },
  {
    children: "About",
    href: "#about",
    id: "about",
  },
];

export const SegmentedControlDemo = () => {
  const [selected, setSelected] = useState("setup");

  return (
    <SegmentedControl
      selected={selected}
      onSelected={setSelected}
      className="p-0"
      keepBg={false}
      items={internalLinks}
    />
  );
};

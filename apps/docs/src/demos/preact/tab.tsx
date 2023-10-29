/** @jsxImportSource preact */

import { Tab, TabItem } from "@konj-org/preact-ui";

export const TabDemo = () => {
  return (
    <Tab className="flex flex-col justify-center align-middle items-stretch content-stretch">
      <TabItem id="t-1" title="Preview">
        <p className="text-center">Preview of the component</p>
      </TabItem>
      <TabItem id="t-0" title="Code">
        <p className="text-center">some code</p>
        <p className="text-center">Which its height might differ</p>
      </TabItem>
    </Tab>
  );
};

/** @jsxImportSource preact */

import { FileInput } from "@konj-org/preact-ui";

export const FileInputDemo = () => {
  return (
    <FileInput
      className="w-full md:w-[30vw]"
      multiple={true}
      label="File input"
      description="An example of file input"
      acceptedTypes={["image/jpeg", "image/jpg", "image/png", "image/webp"]}
    />
  );
};

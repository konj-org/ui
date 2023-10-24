/** @jsxImportSource preact */

import { FileInput } from "@/components/preact/styled/file-input";

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

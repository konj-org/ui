/** @jsxImportSource preact */

import { useState } from "preact/hooks";

// SubComponents
import { FloatingSheet } from "@/components/preact/styled/floating-sheet";
import { Button } from "@/components/preact/styled/button";

export const FloatingSheetDemo = () => {
  const [state, setState] = useState(false);

  return (
    <>
      <Button onClick={setState.bind(null, true)}>Open Floating Sheet</Button>
      <FloatingSheet
        title="Action Sheet"
        actions={{
          accept: {
            action: () => console.log("ActionSheet: 'user accepted'"),
            title: "Signup",
          },
          dismiss: {
            action: () => console.log("ActionSheet: 'user dismissed'"),
            title: "Later",
          },
        }}
        state={state}
        setState={setState}
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
        facere, quisquam facilis rerum doloremque nemo, blanditiis explicabo ut
        aliquid ad repellendus consectetur dolore! Non illo debitis excepturi
        esse voluptas! Eos.
      </FloatingSheet>
    </>
  );
};

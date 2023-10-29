import { useState } from "react";

// SubComponents
import { ActionSheet, Button } from "@konj-org/react-ui";

export const ActionSheetDemo = () => {
  const [state, setState] = useState(false);

  return (
    <>
      <Button onClick={setState.bind(null, true)}>Open Action Sheet</Button>
      <ActionSheet
        title="Action Sheet"
        mainAction={{
          action: () => {},
          key: "main-action",
          title: "Open in Safari",
        }}
        actions={[
          {
            action: () => {},
            key: "action-0",
            title: "Open in Firefox",
          },
          {
            action: () => {},
            key: "action-1",
            title: "Open in Chrome",
          },
        ]}
        state={state}
        setState={setState}
      />
    </>
  );
};

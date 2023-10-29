/** @jsxImportSource preact */

import { Fragment } from "preact";
import { useState } from "preact/hooks";

// SubComponents
import { Button, AlertDialog } from "@konj-org/preact-ui";

export const AlertDialogDemo = () => {
  const [dialogState, setDialogState] = useState(false);

  return (
    <Fragment>
      <AlertDialog
        title="Selling your data"
        state={dialogState}
        setState={setDialogState}
        actions={{
          accept: {
            title: "Agree",
            action: () => {},
            type: "confirm",
          },
          dismiss: {
            title: "Deny",
            action: () => {},
            type: "dismiss",
          },
        }}
      />
      <Button onClick={setDialogState.bind(null, true)}>
        Open Alert dialog
      </Button>
    </Fragment>
  );
};

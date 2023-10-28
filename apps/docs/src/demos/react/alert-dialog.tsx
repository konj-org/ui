import { Fragment, useState } from "react";

// SubComponents
import { Button } from "@/components/react/styled/button";
import { AlertDialog } from "@/components/react/styled/alert-dialog";

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

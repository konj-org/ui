/** @jsxImportSource preact */

import { Fragment } from "preact";
import { useState } from "preact/hooks";

// SubComponents
import { Button } from "@/components/preact/styled/button";
import { AnchoredDialog } from "@/components/preact/styled/anchored-dialog";

export const AnchoredDialogDemo = () => {
  const [dialogState, setDialogState] = useState(false);

  return (
    <Fragment>
      <AnchoredDialog
        title="Selling your data"
        state={dialogState}
        setState={setDialogState}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
        delectus earum quas numquam consequatur inventore cum architecto velit,
        nisi, nihil sed quae molestiae dolorem officia. Cum expedita laudantium
        consectetur inventore!
      </AnchoredDialog>
      <Button onClick={setDialogState.bind(null, true)}>
        Open Anchored dialog
      </Button>
    </Fragment>
  );
};

/** @jsxImportSource preact */

import { Fragment } from "preact";
import { useRef, useState } from "preact/hooks";

import {
  DropdownGroup,
  DropdownItem,
  DropdownMenu,
} from "@/components/preact/styled/dropdown-menu";
import { buttonClassName } from "@/components/preact/styled/button";

import { usePopover } from "@/hooks/preact/use-popover";

export const DropdownMenuDemo = () => {
  // States for the main
  const fileDorpDownRef = useRef<null | HTMLDialogElement>(null);
  const fileButtonRef = useRef<null | HTMLButtonElement>(null);
  const [fileDropdownState, setFileDropdownState] = useState(false);
  const { open: openFileDDM, close: closeFileDDM } = usePopover({
    setState: setFileDropdownState,
    invokerRef: fileButtonRef,
    dialogRef: fileDorpDownRef,
  });

  // States for sub
  const openRecentDropdownRef = useRef<null | HTMLDialogElement>(null);
  const openRecentButtonRef = useRef<null | HTMLButtonElement>(null);
  const [openRecentState, setOpenRecentState] = useState(false);
  const { open: openRecentOpenDDM, close: closeOpenRecentDDM } = usePopover({
    setState: setOpenRecentState,
    dialogRef: openRecentDropdownRef,
    invokerRef: openRecentButtonRef,
    appendTo: "side",
  });

  // Closes the dialogs
  const close = () => {
    setFileDropdownState(false);
    setOpenRecentState(false);
  };

  return (
    <Fragment>
      <button
        ref={fileButtonRef}
        onClick={openFileDDM}
        className={buttonClassName({ compiledVariant: "primary-subtle" })}
      >
        File
      </button>
      <DropdownMenu
        close={closeFileDDM}
        state={fileDropdownState}
        setState={setFileDropdownState}
        ref={fileDorpDownRef}
      >
        <DropdownGroup>
          <DropdownItem event={close} label="New Text File" info="⌘ N" />
          <DropdownItem event={close} label="New File..." info="⌃ ⌥ ⌘ N" />
          <DropdownItem event={close} label="New Window" />
        </DropdownGroup>
        <DropdownGroup>
          <DropdownItem event={close} label="Open..." />
          <DropdownItem event={close} label="Open Folder..." info="⌘ O" />
          <DropdownItem event={close} label="Open Workspace from File..." />
          <DropdownItem
            event={openRecentOpenDDM}
            ref={openRecentButtonRef}
            label="Open Recent"
          />
        </DropdownGroup>
        <DropdownGroup>
          <DropdownItem event={close} label="Open..." />
          <DropdownItem
            event={close}
            label="Add Folder to Workspace"
            info="⌘ s"
          />
          <DropdownItem
            event={close}
            label="Save Workspace As..."
            info="⇧ ⌘ s"
          />
          <DropdownItem
            event={close}
            label="Duplicate Workspace"
            info="⌃ ⌘ s"
          />
        </DropdownGroup>
        <DropdownGroup>
          <DropdownItem event={close} label="Save" />
          <DropdownItem event={close} label="Save As..." />
          <DropdownItem event={close} label="Save All" />
        </DropdownGroup>
      </DropdownMenu>
      <DropdownMenu
        isNested={true}
        close={closeOpenRecentDDM}
        state={openRecentState}
        setState={setOpenRecentState}
        ref={openRecentDropdownRef}
      >
        <DropdownItem event={close} label="page.tsx" />
        <DropdownItem event={close} label="layout.tsx" />
        <DropdownItem event={close} label="global.css" />
      </DropdownMenu>
    </Fragment>
  );
};

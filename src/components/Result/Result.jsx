// import ComboBox from "components/ComboBox/ComboBox";
// import { useState } from "react";
// import styles from "styles/Home.module.css";

// const SHADOW_OPTIONS = ["No Shadow", "Soft Shadow", "Hard Shadow"];

// const Result = () => {
//   const [Result, setResult] = useState("");
//   const [description, setDescription] = useState("");
//   const [negative_Result, setNegative_Result] = useState("");
//   const [loading, setLoading] = useState(false);

//   return <div></div>;
// };

// export default Result;

import { useState } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";

const Result = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  return (
    <div>
      <p>Welcome to next.js!</p>
      <DefaultButton primary={true} onClick={openDialog}>
        Open Dialog
      </DefaultButton>
      <Dialog
        hidden={!isOpen}
        onDismiss={closeDialog}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Test Dialog",
        }}
        modalProps={{
          isBlocking: true,
        }}
      >
        <p>This is a test dialog.</p>
        <DialogFooter>
          <PrimaryButton onClick={closeDialog} text="OK" />
          <DefaultButton onClick={closeDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Result;

// import ComboBox from "components/ComboBox/ComboBox";
// import { useState } from "react";
import styles from "styles/Home.module.css";

// const SHADOW_OPTIONS = ["No Shadow", "Soft Shadow", "Hard Shadow"];

// const Result = () => {
//   const [Result, setResult] = useState("");
//   const [description, setDescription] = useState("");
//   const [negative_Result, setNegative_Result] = useState("");
//   const [loading, setLoading] = useState(false);

//   return <div></div>;
// };

// export default Result;

import { useState, useRef } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";

const dragOverHandler = (e) => {
  e.preventDefault();
};

const onFileChange = (e) => {
  e.preventDefault();
  if (e.target.files) {
    setImage(e.target.files[0]);
    setImageForView(URL.createObjectURL(e.target.files[0]));
  } else if (e.dataTransfer && e.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    [...e.dataTransfer.items].forEach((item, i) => {
      // If dropped items aren't files, reject them
      if (item.kind === "file") {
        const file = item.getAsFile();
        setImage(file);
        setImageForView(URL.createObjectURL(file));
      }
    });
  } else if (e.dataTransfer && e.dataTransfer.files) {
    // Use DataTransfer interface to access the file(s)
    [...e.dataTransfer.files].forEach((file, i) => {
      setImage(file);
      setImageForView(URL.createObjectURL(file));
    });
  }
};

const Result = () => {
  const inputFileRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  return (
    <div
      className={styles.imageDragDropContainer}
      onDrop={onFileChange}
      onDragOver={dragOverHandler}
    >
      <p
        onClick={() => inputFileRef.current.click()}
        className="cursor-pointer"
      ></p>
      <input
        type="file"
        onChange={onFileChange}
        ref={inputFileRef}
        name="files"
        id="file"
        className="d-none"
        accept="image/*"
      />
    </div>
  );
};

export default Result;

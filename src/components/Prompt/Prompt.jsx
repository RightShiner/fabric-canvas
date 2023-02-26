import ComboBox from "components/ComboBox/ComboBox";
import { useState } from "react";
import styles from "styles/Home.module.css";

const SHADOW_OPTIONS = [
  "No Shadow",
  "Soft Shadow",
  "Hard Shadow",
];

const Prompt = () => {
  const [prompt, setPrompt] = useState("");
  const [description, setDescription] = useState("");
  const [negative_prompt, setNegative_prompt] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles["Prompt"]}>
      <textarea
        className={styles.textarea}
        value={description}
        rows={1}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add Product Description"
      ></textarea>
      <textarea
        rows={2}
        className={styles.textarea}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the image to create"
      ></textarea>

      <div className="d-flex px-4 gap-3 mb-2 mt-1">
        <h3 className="text-20 text-dark-100 text-nowrap">Shadow Options</h3>
        <ComboBox value={SHADOW_OPTIONS[0]} items={SHADOW_OPTIONS} />
      </div>

      <div className="d-flex px-4 gap-3 mb-3">
        <h3 className="text-20 text-dark-100 text-nowrap">Lighting Options</h3>
        <ComboBox value={SHADOW_OPTIONS[0]} items={SHADOW_OPTIONS} />
      </div>

      <input
        value={negative_prompt}
        className={`${styles.textarea} mb-2`}
        onChange={(e) => setNegative_prompt(e.target.value)}
        placeholder="What you dont want?"
      />
      <div className={`${styles.generateImgBtnWrap} text-center`}>
        <button
          className={`${styles["app-button"]} ${styles["app-button--blue"]}`}
          onClick={() => generateImage()}
          // disabled={loading || !image || !prompt}
        >
          {loading ? <i className="fa fa-spin fa-spinner"></i> : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default Prompt;

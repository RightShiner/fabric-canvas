import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import styles from "styles/ComboBox.module.css";
import { DropdownIcon } from "Icons/DropdownIcon";

const ComboBox = (props) => {
  const { value, items, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const _items = items.filter((item) => item !== value);
  const [_value, setValue] = useState("");
  const comboRef = useRef(null);

  const handleOnChange = (item) => {
    setValue(item);
    setIsOpen(false);
    onChange && onChange(item);
  };

  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (e) => {
    if (comboRef.current.contains(e.target)) return;

    setIsOpen(false);
  };

  return (
    <div ref={comboRef} className={styles["container"]}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={classNames(styles["label-container"], {
          [`${styles["active"]}`]: isOpen,
        })}
      >
        <div className={styles["label"]}>{_value}</div>
        <span className={styles["dropdown-icon"]}>
          <DropdownIcon />
        </span>
      </div>

      {isOpen && (
        <div className={styles["menu"]}>
          {_items.map((item, index) => (
            <div
              onClick={() => handleOnChange(item)}
              key={index}
              className={styles["option"]}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComboBox;

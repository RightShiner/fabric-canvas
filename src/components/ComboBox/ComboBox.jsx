import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "styles/ComboBox.module.css";
import { DropdownIcon } from "Icons/DropdownIcon";

const ComboBox = (props) => {
  const [isOpen, setIsOpen, onChange] = useState(false);
  const { value, items } = props;
  const _items = items.filter((item) => item !== value);
  const [_value, setValue] = useState("");

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

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles["container"]}>
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

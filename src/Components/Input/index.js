import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../Contexts/GlobalContext";
import styles from "./input.module.css";

const Input = () => {
  const { search, setSearch, darkTheme } = useContext(GlobalContext);

  useEffect(() => {
    console.log("search:", search);
  }, [search]);

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={`${styles.input} ${
        darkTheme ? styles.inputDark : styles.inputLight
      }`}
      type="text"
      placeholder="Search for a country..."
    />
  );
};

export default Input;

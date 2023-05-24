import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Contexts/GlobalContext";
import styles from "./item.module.css";

const Item = ({ country }) => {
  const { name, capital, currency, code } = country;
  const flag = `https://flagcdn.com/w320/${code.toLowerCase()}.png`;
  const { darkTheme } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div
      aria-label={`Details about ${name}`}
      role="button"
      tabIndex="0"
      className={`${styles.item} ${
        darkTheme ? styles.itemDark : styles.itemLight
      }`}
      onClick={() => navigate(`/${code}`)}
    >
      <img src={`${flag}`} alt="" />
      <strong>{name}</strong>
      <span>
        <strong>Capital:</strong> {capital}
      </span>
      <span>
        <strong>Currency:</strong> {currency}
      </span>
    </div>
  );
};

export default Item;

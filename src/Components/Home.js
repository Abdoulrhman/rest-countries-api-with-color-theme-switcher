import React, { useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";
import styles from "./Home.module.css";
import Header from "./Header/index";
import Input from "./Input/index";
import Item from "./Item/index";

const Home = () => {
  const { filteredCountries, darkTheme, loading } = useContext(GlobalContext);

  return (
    <>
      <Header />
      <main
        className={`${styles.main} ${
          darkTheme ? styles.mainDark : styles.mainLight
        }`}
      >
        <div className={styles.container}>
          <div className={styles.search}>
            <Input />
          </div>
          {loading ? (
            <div className={styles.loader}></div>
          ) : (
            <div className={styles.items}>
              {filteredCountries.length !== 0 ? (
                filteredCountries.map((item) => {
                  return <Item key={item.name} country={item} />;
                })
              ) : (
                <h2>Country not found</h2>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;

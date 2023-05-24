import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Contexts/GlobalContext";
import styles from "./details.module.css";
import Header from "../Header/index";
import { ReactComponent as Back } from "../../assets/back.svg";
import { useQuery, gql } from "@apollo/client";

const Details = () => {
  const { countryCode } = useParams();
  const params = useParams();
  const { darkTheme } = useContext(GlobalContext);
  const [country, setCountry] = useState(null);
  const navigate = useNavigate();
  const GET_COUNTRY = gql`
    query Country($code: ID!) {
      country(code: $code) {
        code
        name
        emoji
        currency
        languages {
          name
        }
        phone
      }
    }
  `;

  const { data, loading } = useQuery(GET_COUNTRY, {
    variables: { code: countryCode },
  });

  useEffect(() => {
    if (params) {
      console.log("params:", params);
    }
  }, [params]);

  useEffect(() => {
    if (data) {
      setCountry(data.country);
    }
  }, [data, loading]);

  useEffect(() => {
    console.log("country:", country);
  }, [country]);

  const flag =
    country !== null
      ? `https://flagcdn.com/w320/${country?.code.toLowerCase()}.png`
      : "";

  return (
    <>
      <Header />
      {country !== null && (
        <main
          className={`${styles.main} ${
            darkTheme ? styles.mainDark : styles.mainLight
          }`}
        >
          <div
            className={`${styles.container} ${
              darkTheme ? styles.containerDark : styles.containerLight
            }`}
          >
            <button aria-label="Back to Home" onClick={() => navigate("/")}>
              <Back />
              <span>Back</span>
            </button>
            {loading ? (
              <div className={styles.loader}></div>
            ) : (
              <div className={styles.content}>
                <img src={flag} alt="" />
                <div>
                  <div
                    className={`${styles.infos} ${
                      darkTheme ? styles.infosDark : styles.infosLight
                    }`}
                  >
                    <h2>{country.name}</h2>
                    <div className={styles.columns}>
                      <div className={styles.column}>
                        <span>
                          <strong>Native Name:</strong> {country.name}
                        </span>
                        <span>
                          <strong>Currency:</strong> {country.currency}
                        </span>
                        <span>
                          <strong>Language:</strong> {country.languages[0].name}
                        </span>
                        <span>
                          <strong>Phone:</strong> {country.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default Details;

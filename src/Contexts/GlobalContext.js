/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [listCountries, setListCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);

  const LIST_COUNTRIES = gql`
    {
      countries {
        name
        code
        native
        capital
        emoji
        currency
        phone
        languages {
          code
          name
        }
        continent {
          name
          code
        }
      }
    }
  `;

  const { data, loading } = useQuery(LIST_COUNTRIES);

  useEffect(() => {
    if (search !== "") {
      const filteredList = data?.countries.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCountries(filteredList);
    } else {
      setFilteredCountries(listCountries);
    }
  }, [search]);

  //fetch all location data and render on home
  useEffect(() => {
    if (data) {
      setListCountries(data.countries);
      setFilteredCountries(data.countries);
    }
  }, [loading, data]);

  useEffect(() => {
    localStorage.setItem("theme", darkTheme);
  }, [darkTheme]);

  return (
    <GlobalContext.Provider
      value={{
        openFilter,
        setOpenFilter,
        filteredCountries,
        search,
        setSearch,
        darkTheme,
        setDarkTheme,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

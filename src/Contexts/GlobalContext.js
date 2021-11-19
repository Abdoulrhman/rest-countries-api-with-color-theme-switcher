import React, { useState, useEffect } from 'react';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData] = useState([]);
  const [region, setRegion] = useState("all");
  const [search, setSearch] = useState('');
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(async () => {
    const theme = localStorage.getItem("theme");
    if (theme === "true") {
      setDarkTheme(true);
    } else {
      setDarkTheme(false);
    }
    const response = await fetch("https://restcountries.com/v2/all");
    const json = await response.json();
    setData(json);
  }, []);

  useEffect(async () => {
    if (region !== "all") {
      setOpenFilter(false);
      const response = await fetch(`https://restcountries.com/v2/region/${region}`)
      const json = await response.json();
      setData(json);
    } else {
      setOpenFilter(false);
      const response = await fetch("https://restcountries.com/v2/all");
      const json = await response.json();
      setData(json);
    }
  }, [region]);

  useEffect(async () => {
    if (search && search.length >= 3) {
      const response = await fetch(`https://restcountries.com/v2/name/${search}`);
      const json = await response.json();
      !json.status && setData(json);
    } else if (search === '') {
      const response = await fetch("https://restcountries.com/v2/all");
      const json = await response.json();
      setData(json);
    }
  }, [search]);

  useEffect(() => {
    localStorage.setItem("theme", darkTheme);
  }, [darkTheme]);

  return (
    <GlobalContext.Provider value={{ openFilter, setOpenFilter, data, setRegion, search, setSearch, darkTheme, setDarkTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};
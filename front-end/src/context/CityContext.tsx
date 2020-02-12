import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CityContext = createContext({} as any);

export const CityProvider: React.FC = props => {
  const [cities, setCities] = useState<Cities>();

  const port = process.env.PORT || 5000;
  const fetchCities = async () => {
    let res = await axios.get(`http://localhost:${port}/cities/all`);
    let data = res.data;
    setCities(data);
  };

  useEffect(() => {
    fetchCities();
  }, []); // empty [] means running it only once

  return (
    <CityContext.Provider value={[cities, setCities]}>
      {props.children}
    </CityContext.Provider>
  );
};

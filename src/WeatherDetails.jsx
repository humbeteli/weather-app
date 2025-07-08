import React from "react";

const WeatherDetails = ({ title, indicator, icon }) => {
  return (
    <div className="detailsContainer">
      <p className="detailsTitle">{title}</p>
      <div className="indicator">
        <p>{indicator}</p>
        <img src={icon} alt="icon" />
      </div>
    </div>
  );
};

export default WeatherDetails;

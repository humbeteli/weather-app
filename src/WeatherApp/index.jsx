import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import sunnyGif from "../Animations/sunnyGif3.json";
import lightningGif from "../Animations/lightningGif.json";
import cloudyGif from "../Animations/cloudyGif.json";
import rainGif from "../Animations/rainGif.json";
import snowGif2 from "../Animations/snowGif2.json";
import fogGif from "../Animations/fogGif2.json";
import searchImg from "../pics/search.svg";
import "./index.css";
import logo from "../pics/proyekt-logo.png";
import WeatherDetails from "../WeatherDetails";
import maxTemp from "../pics/max-temp.svg";
import minTemp from "../pics/min-temp.svg";
import humadity from "../pics/rutubet.svg";
import cloudy from "../pics/buludluluq.svg";
import wind from "../pics/kulek.svg";
import FormatDate from "../FormatDate";
// import pressure from '../src/pics/pressure-svgrepo-com.svg'

function WeatherApp() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [bgImage, setBgImage] = useState("");
  const [date, setDate] = useState(<FormatDate />);
  const [icon, setIcon] = useState("");
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState([]);

  //todo forecast hissəsində həftə adları azərbaycanca olmur deyə bunu yazdım
  const azeDays = [
    "Bazar",
    "Bazar ertəsi",
    "Çərşənbə axşamı",
    "Çərşənbə",
    "Cümə axşamı",
    "Cümə",
    "Şənbə",
  ];

  const bugun = new Date().getDay();

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    //todo səhifə ilk dəfə yüklənəndə default olaraq çıxan şəhər

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Sumqayıt&appid=${apiKey}&units=metric&lang=az`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=Sumqayıt&appid=${apiKey}&units=metric&lang=az`
    )
      .then((res) => res.json())
      .then((forecastData) => {
        setForecast(forecastData.list);
      });
  }, [apiKey]);

  //todo enterə basanda ekrana məlumatlar çıxır

  const search = (e) => {
    if (e.key === "Enter") {
      //! input boş olanda enterə basılanda çıxan mesaj
      if (!query.trim()) {
        setError("Zəhmət olmasa bir məkan adı yazın.");
        return;
      }

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric&lang=az`
      )
        .then((res) => res.json())
        .then((result) => {
          //! yazılan şəhər tapılmadıqda çıxan mesaj
          if (result.cod === "404") {
            setError("Məkan tapılmadı. Təkrar cəhd edin.");
            // setWeather(null);
            setQuery("");
          } else {
            setWeather(result);
            setError("");
            setQuery("");

            fetch(
              `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}&units=metric&lang=az`
            )
              .then((res) => res.json())
              .then((forecastData) => {
                setForecast(forecastData.list);
              });
          }
        });
    }
  };

  //todo hava durumuna görə fon və ikonlar dəyişir
  useEffect(() => {
    if (!weather) return;
    console.log(weather.weather[0].main);

    const background = weather.weather[0].main;
    const now = weather.dt + weather.timezone;
    const sunrise = weather.sys.sunrise + weather.timezone;
    const sunset = weather.sys.sunset + weather.timezone;
    const isDay = now >= sunrise && now < sunset;

    switch (background) {
      case "Clear": // günəşli hava
        setBgImage(isDay ? "/images/clear.jpg" : "/images/sun-night3.jpg");
        setIcon(isDay ? sunnyGif : require("../Animations/sunNightGif2.json"));
        break;
      case "Haze":
      case "Dust":
      case "Mist":
      case "Drizzle":
      case "Smoke": // dumanlı, çiskinli, tozlu və s. hava
        setBgImage(isDay ? "/images/fog3.jpg" : "/images/fog-night.jpg");
        setIcon(fogGif);
        break;
      case "Clouds": // buludlu hava
        setBgImage(isDay ? "/images/bulud.jpg" : "/images/cloudy-night.jpg");
        setIcon(isDay ? cloudyGif : require("../Animations/sunNightGif.json"));
        break;
      case "Rain": // yağış
        setBgImage(isDay ? "/images/rain3.jpg" : "/images/rain.jpg");
        setIcon(rainGif);
        break;
      case "Thunderstorm": // ildırım
        setBgImage(
          isDay ? "/images/lightning2.jpg" : "/images/thunderstorm.jpg"
        );
        setIcon(lightningGif);
        break;
      case "Snow": // qarlı hava
        setBgImage(isDay ? "/images/snow-night.jpg" : "/images/snow.jpg");
        setIcon(snowGif2);
        break;
      default:
        setBgImage("/images/antarktika.jpg");
    }
  }, [weather]);

  //todo hər dəqiqə tarix yenilənir
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(<FormatDate />);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        // ümumi dinamik fon şəkli
        backgroundImage: `url(${bgImage})`,
      }}
      className="container"
    >
      <div className="left">
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        {weather && (
          <div>
            <div className="weatherMain">
              <h1>{Math.floor(weather.main.temp)}°</h1>
              <div className="name-date">
                <span className="cityName">{weather.name}</span>
                <span className="date">{date}</span>
              </div>
              <div className="icon">
                {icon && <Lottie animationData={icon} />}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="right">
        <div>
          <div className="input-container">
            <input
              type="search"
              placeholder="Məkan daxil edin..."
              className="inputArea"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={search}
            />
            <img
              src={searchImg}
              alt="search"
              onClick={() => search({ key: "Enter" })}
              style={{ cursor: "pointer" }}
            ></img>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
        {weather && (
          <div>
            <p className="details">Hava Təfərrüatları...</p>
            <p className="description">
              {weather.weather[0].description.toUpperCase()}
            </p>

            <ul className="details-list">
              <li>
                <WeatherDetails
                  title="Ən Yüksək Temperatur"
                  indicator={`${weather.main.temp_max.toFixed(0)}°C`}
                  icon={maxTemp}
                />
              </li>
              <li>
                <WeatherDetails
                  title="Ən Alçaq Temperatur"
                  indicator={`${weather.main.temp_min.toFixed(0)}°C`}
                  icon={minTemp}
                />
              </li>
              <li>
                <WeatherDetails
                  title="Nisbi Rütubət"
                  indicator={`${weather.main.humidity}%`}
                  icon={humadity}
                />
                <WeatherDetails
                  title="Buludluluq"
                  indicator={`${weather.clouds.all}%`}
                  icon={cloudy}
                />
              </li>
              <li>
                <WeatherDetails
                  title="Külək"
                  indicator={`${(weather.wind.speed * 3.6).toFixed(0)} km/s`}
                  icon={wind}
                />
              </li>
            </ul>
          </div>
        )}

        {forecast && (
          <div className="forecats-section">
            <p className="details">Gün ərzində təxmin edilən hava proqnozu</p>
            <ul className="forecast-list">
              {forecast.slice(0, 8).map((item) => (
                <li className="forecast-item">
                  <div className="icon-description">
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
                      alt="forecast"
                      className="forecast-icon"
                    />
                    <div className="time-desc">
                      <span className="time">
                        {item.dt_txt.split(" ")[1].slice(0, 5)}{" "}
                      </span>
                      <span className="desc">
                        {item.weather[0].description.charAt(0).toUpperCase() +
                          item.weather[0].description.slice(1)}
                      </span>
                    </div>
                  </div>

                  <p className="celsi">{Math.round(item.main.temp)}°C</p>
                </li>
              ))}
            </ul>

            <div className="daily-forecast">
              <p className="details">Günlük hava proqnozu</p>
              <ul className="forecast-list">
                {forecast
                  .filter((item) => item.dt_txt.includes("12:00:00"))
                  .map((item, index) => (
                    <li key={index} className="forecast-item">
                      <div className="icon-description">
                        <img
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
                          alt="forecast"
                          className="forecast-icon"
                        />
                        <div className="time-desc">
                          <span className="time">
                            {new Date(item.dt_txt).getDay() === bugun
                              ? "Bu gün"
                              : azeDays[new Date(item.dt_txt).getDay()]}
                          </span>
                          <span className="desc">
                            {item.weather[0].description
                              .charAt(0)
                              .toUpperCase() +
                              item.weather[0].description.slice(1)}
                          </span>
                        </div>
                      </div>
                      <p className="celsi">{Math.round(item.main.temp)}°C</p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;

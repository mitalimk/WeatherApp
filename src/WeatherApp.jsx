import { useState } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import "./WeatherApp.css";
export default function WeatherApp(){
    const [weatherInfo,setweatherInfo]=useState({
    city:"Delhi",
    feelslike:34.71,
    humidity:71,
    temp:29.77,
    tempMax:29.77,
    tempMin:29.77,
    weather:"overcast clouds",
    timezone: 19800,
});

function updateInfo(newInfo){
    setweatherInfo(newInfo);
}
function getLocalTime(timezoneOffset) {
    const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    return new Date(utc + 1000 * timezoneOffset); // seconds to ms
  }
  const localTime = getLocalTime(weatherInfo.timezone);
  const hour = localTime.getHours();
  const isNight = (() => {
    const utcTime = new Date().getTime() + (weatherInfo.timezone * 1000);
    const localHour = new Date(utcTime).getUTCHours();
    return localHour >= 19 || localHour <= 6;
  })();
  const renderStars = () => {
    return (
      <div className="stars-overlay">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    );
  };

    return(
        <div className={`weather-app ${isNight ? 'night' : 'day'}`}style={{textAlign:"center"}}>
             {isNight && renderStars()} 
            <h2>Weather App</h2>
            <SearchBox updateInfo={updateInfo} />
           
            <InfoBox info={weatherInfo} localTime={localTime}/>
        </div>
    );
}
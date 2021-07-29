function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = 
  [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ]
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours <10 ) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes(); 
  if (minutes <10 ) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`
}


function cityWeather(response){
   let temperatureElement = document.querySelector("#temp");
   let cityElement = document.querySelector("#current-location");
   let weatherDescriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");
   let currentTimeElement = document.querySelector("#current-time");
  let iconElement = document.querySelector("#icon");

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    weatherDescriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    currentTimeElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
      "src", 
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` ); 
    iconElement.setAttribute(
      "alt",
      response.data.weather[0].description);
  }
  
 
 let apiKey = "6bf9818d9ac6ad65c210c2c0a7205a25";
 let units = "metric";
 let city = "porto"
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
 axios.get(apiUrl).then(cityWeather);

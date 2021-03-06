function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours <10 ) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes(); 
  if (minutes <10 ) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}:${minutes}`
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun", 
    "Mon", 
    "Tue", 
    "Wed", 
    "Thu", 
    "Fri", 
    "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<ul>`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
    forecastHTML = 
    forecastHTML + `
      <li>
        <span class="weather-forecast-day">
         ${formatDay(forecastDay.dt)}
        </span>
        &nbsp
        <img 
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
          alt="sun" 
          width="40px" />
        &nbsp
        <strong class="weather-forecast-temp-max">
          ${Math.round(forecastDay.temp.max)}º
        </strong>
        <strong class="weather-forecast-temp-min">
          ${Math.round(forecastDay.temp.min)}º
        </strong>
      </li>
    `;
    }
  });

  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "6bf9818d9ac6ad65c210c2c0a7205a25";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?
lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
  
function cityWeather(response){
   let temperatureElement = document.querySelector("#temp");
   let cityElement = document.querySelector("#current-location");
   let weatherDescriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");
   let currentTimeElement = document.querySelector("#current-time");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round( response.data.wind.speed);
  currentTimeElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` ); 
  iconElement.setAttribute(
    "alt",
    response.data.weather[0].description);

    getForecast(response.data.coord);
  }
  
function search(city) {
  let apiKey = "6bf9818d9ac6ad65c210c2c0a7205a25";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(cityWeather);

}

  function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
 

function convertFsmth(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  //convertCelsius.classList.remove("active");
  //convertFsmth.classList.add("active");
  let fsmthTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fsmthTemperature);
}


function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
 // convertCelsius.classList.add("active");
 // convertFsmth.classList.remove("active");
}


let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fsmth");
fahrenheitLink.addEventListener("click", convertFsmth);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertCelsius);

search("porto");
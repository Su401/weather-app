 function cityWeather(response){
   console.log(response.data);
   let temperatureElement = document.querySelector("#temp");
   let cityElement = document.querySelector("#current-location");
   let weatherDescriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    weatherDescriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
 }
  
 
 let apiKey = "6bf9818d9ac6ad65c210c2c0a7205a25";
 let units = "metric";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=porto&appid=${apiKey}&units=${units}`;
 axios.get(apiUrl).then(cityWeather);

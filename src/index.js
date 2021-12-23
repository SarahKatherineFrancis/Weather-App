let now = new Date();
let h6 = document.querySelector("h6");
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h6.innerHTML = `${day} ${hours}:${minutes}`;

function formatTime(timestamp) {
  let time = new Date(timestamp * 1000);
  let hours = time.getHours();
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayHourlyForecast(response) {
  let forecast = response.data.hourly;
  let forecastElement = document.querySelector("#hourly-forecast");
  let hours = ["9:00", "13:00", "16:00", "19:00", "22:00"];
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastHour, index) {
    if ((index, 5)) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
            <div class="weather-hours">${hour}</div>
            <img
              class="weather-icon"
              src="images/sunny.png"
              alt="sun"
              width="50px"
            />
            <span class="weather-hours-temperature">18°C</span>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#daily-forecast");
  let forecastHTML = `<div class= "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
            <div class="weather-hours">${formatDay(forecastDay.dt)}</div>
            <img
            class= "weather-icon"
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="cloud"
              width="60px"
            />
            <span class="weather-hours-temperature"
              ><strong>${Math.round(
                forecastDay.temp.max
              )}°C</strong> | ${Math.round(forecastDay.temp.min)}°C</span
            >
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}

let temperature = document.querySelector("#temperature-value");

let searchInput = document.querySelector("#search-city-input");

function getHourlyForecast(coordinates) {
  let apiKey = "8e7ae886bfd9f66febdffcb5fb779942";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayHourlyForecast);
}

function getForecast(coordinates) {
  let apiKey = "8e7ae886bfd9f66febdffcb5fb779942";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  let celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature-value").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  getForecast(response.data.coord);
  getHourlyForecast(response.data.coord);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "8e7ae886bfd9f66febdffcb5fb779942";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayCelsiusTemperature(event) {
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function searchCity(city) {
  let apiKey = "8e7ae886bfd9f66febdffcb5fb779942";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "8e7ae886bfd9f66febdffcb5fb779942";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

searchCity("Cape Town");

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

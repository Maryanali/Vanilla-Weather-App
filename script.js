function formatDate(timestamp){

let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10){
    hours = `0${hours}`;
} 
let minutes= date.getMinutes();
if (minutes < 10){
    minutes = `0${minutes}`;
} 
let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;

}

function formatHours(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10){
    hours = `0${hours}`;
} 
let minutes= date.getMinutes();
if (minutes < 10){
    minutes = `0${minutes}`;
} 
  return `${hours}:${minutes}`;
}

function displayTemperature(response){
let iconElement = document.querySelector("#icon");
let dateElement = document.querySelector("#date");  
let temperatureElement =document.querySelector("#temperature");
let temperature =Math.round(response.data.main.temp);
let windElement =document.querySelector("#wind");
let wind =Math.round(response.data.wind.speed);
let temperatureHumidity =document.querySelector("#temperature-humidity");
let humidity = Math.round(response.data.main.humidity);
let temperaturePressure =document.querySelector("#temperature-pressure");
let pressure = Math.round(response.data.main.pressure);
let temperatureDescription =document.querySelector("#temperature-description");
let currentTemperature = Math.round(response.data.main.temp);
//let title =document.querySelector("h3");
let cityElement = document.querySelector("h2");


celciusTemperature = response.data.main.temp;



iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
dateElement.innerHTML= formatDate(response.data.dt * 1000);
temperatureElement.innerHTML= Math.round(celciusTemperature);
windElement.innerHTML= `Wind: ${wind} km/h`;
temperatureHumidity.innerHTML= `Humidity: ${humidity} %`;
temperaturePressure.innerHTML= `Pressure: ${pressure} hPa`;
temperatureDescription.innerHTML =response.data.weather[0].description;
//title.innerHTML= `The Temperature is ${currentTemperature}`;
cityElement.innerHTML = response.data.name;


}





function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 12; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}



function search(city){
    let apiKey = "ac254995f1530b05133bdf3b89d170a4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

    apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
    

}
function handleSearch(event){
    event.preventDefault();
    let cityInputElement= document.querySelector("#search-input");
    search(cityInputElement.value);
 //   console.log(cityInputElement.value);

}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let fahrenheitTemperature = (celciusTemperature* 9) /5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelciusTemperature(event){
    event.preventDefault();
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML= Math.round(celciusTemperature);
}

let celciusTemperature = null;
let form =document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#c-link");
celciusLink.addEventListener("click", displayCelciusTemperature);
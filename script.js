//let apiKey = "ac254995f1530b05133bdf3b89d170a4";
//let city= "London";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
//let lat =position.coords.latitude;
//let long =position.coords.longitude;
//let apiCood= `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude={part}&appid=ac254995f1530b05133bdf3b89d170a4`;
//from the axios github, makes it easy to send HTTP requests 





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
let cityElement = document.querySelector("h3");

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







//let h2 = document.querySelector("#city");
//h2.innerHTML = city; 
/*
function showPosition(position){
    let h1 = document.querySelector("h1");
    h1.innerHTML= `Your Latitude is ${position.coords.latitude} and your longitude is ${position.coords.longitude}`;
     
} 

function getCurrentPosition(){
navigator.geolocation.getCurrentPosition(showPosition);
}
*/

//This is console logging the temperature of Birmingham but this should
//be initiated by a click of a button





/*
function requirePosition(position) {
        let latitude = position.coords.latitude;
        let longitude =position.coords.longitude;
        let apiKey = "ac254995f1530b05133bdf3b89d170a4";
        let apiUrl= `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(showTemperature);
}

    navigator.geolocation.getCurrentPosition(requirePosition);

function citySearch(event) {
  event.preventDefault();
  let formValue = document.querySelector("#search-form"); //we got the form where they write the city
  let inputValue = document.querySelector("search-input"); //now we got the actual input on the form
  let heading = document.querySelector("#city-search");

//if the value of the input is there, then we can display it else do an alert
 if (inputValue.value){
    city.innerHTML = `${inputValue.value}`; 
 }else{
     alert("Please write a city");
 }

//we need to find the value of search.value and === to city from the result. 
}
*/

//Challenge 1- Get current date
//so this one shows the full date and whenever you want to get something do now.getmonth



//i changed the value of h2 back to city!!! sorry lol


//finds current city
//let form = document.querySelector("form");
//form.addEventListener("submit", citySearch);



/*

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
axios.get(`${apiUrl}&appid=${apiKey}`).then(showDate);
axios.get(`${apiUrl}&appid=${apiKey}`).then(showHumidity);
axios.get(`${apiUrl}&appid=${apiKey}`).then(showPressure);
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperatureDescription);
//axios.get(`${apiUrl}&appid=${apiKey}`).then(showTeperature);
axios.get(`${apiUrl}&appid=${apiKey}`).then(windSpeed);
axios.get(`${apiUrl}&appid=${apiKey}`).then(showDate);
axios.get(`${apiUrl}&appid=${apiKey}`).then(temperatureIcon);
*/
//come back to this
//let button= document.querySelector("button");
//button.addEventListener("click", getCurrentPosition);
function search(city){
    let apiKey = "ac254995f1530b05133bdf3b89d170a4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

}
function handleSearch(event){
    event.preventDefault();
    let cityInputElement= document.querySelector("#search-input");
    search(cityInputElement.value);
    console.log(cityInputElement.value);

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
const apikey = "44f55f41394766b1449fdb4d0c756fbd";

const weatherDataEl = document.querySelector(".weather-data");
const form = document.querySelector("form");
const cityInputEl = document.querySelector(".city-name");

const iconEl = weatherDataEl.querySelector(".icon");
const temperatureEl = weatherDataEl.querySelector(".temperature");
const descryptionEl = weatherDataEl.querySelector(".descryption");
const detailsEl = weatherDataEl.querySelector(".details");

form.onsubmit = (e)=>{
    e.preventDefault();
    const cityName = cityInputEl.value;
    getWeatherData(cityName);
}

const getWeatherData = async (city) => {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
        if(!response.ok){
            throw new Error("Network response is not ok");
        }
        const data = await response.json();
        console.log(data);
        const temperature = Math.round(data.main.temp);
        const descryption = (data.weather[0].description);
        const icon = data.weather[0].icon;
        const details = [
            `Feels Like : ${Math.round(data.main.feels_like)}`,
            `Humidity : ${data.main.humidity}`,
            `Wind Speed : ${data.wind.speed} m/s`,
        ];

        iconEl.innerHTML = `
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="icon">`
        
        temperatureEl.innerHTML = temperature+" °C";
        descryptionEl.innerHTML = descryption;
        detailsEl.innerHTML = `
             <div>${details[0]}</div>
            <div>${details[1]}</div>
            <div>${details[2]}</div>
        `
    }
    catch(error){
        iconEl.innerHTML ="";

        temperatureEl.innerHTML ="";
        descryptionEl.innerHTML = "";
        detailsEl.innerHTML = `<h2 style="color:red">Network error please tyr agian later</h2>`
    }
}
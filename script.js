const apikey = "2e9c428fad6fedda938ab6795cdaa4a1";
const APIURL= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.querySelector('.search input');
const button = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');


async function checkWeather(city) {
    const response = await fetch(APIURL + city + `&appid=${apikey}`);
    if(response.status == 400) {
        document.querySelector('.check').style.display = 'inline-block';
        document.querySelector('.error').style.display = 'none';
        document.querySelector('.weather-data').style.display='none';
        setTimeout(function() {
            document.querySelector('.check').style.display = 'none';
        }, 2000);
    }

    if(response.status == 404) {
        document.querySelector('.error').style.display = 'inline-block';
        document.querySelector('.check').style.display = 'none';
        document.querySelector('.weather-data').style.display='none';
        setTimeout(function() {
            document.querySelector('.error').style.display = 'none';
        }, 2000);
    } else {
        var data = await response.json();
        console.log(data);
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + "km";

        if(data.weather[0].main == 'Clouds') {
            weatherIcon.src = "images/clouds.png";
        } else if(data.weather[0].main == 'Clear') {
            weatherIcon.src = "images/clear.png";
        } else if(data.weather[0].main == 'Rain') {
            weatherIcon.src = "images/rain.png";
        } else if(data.weather[0].main == 'Drizzle') {
            weatherIcon.src = "images/drizzle.png";
        } else if(data.weather[0].main == 'Mist') {
            weatherIcon.src = "images/mist.png";
        }
        document.querySelector('.weather-data').style.display='block';
        document.querySelector('.error').style.display = 'none';
        document.querySelector('.check').style.display = 'none';
        setTimeout(function() {
            document.querySelector('.weather-data').style.display='none';
            cityInput.value = "";
        }, 6000);
    }
};

button.addEventListener("click", (e) => {
    document.querySelector('.weather-data').style.display='none';
    checkWeather(cityInput.value);
});


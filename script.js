const API_KEY = 'd09761ad0491cc386f522c982021ca7f';
let ville = 'Montrouge';

async function fetchWeather(ville) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${API_KEY}&units=metric&lang=fr`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        const longitude = data.coord.lon;
        const latitude = data.coord.lat;
        const meteo = data.weather[0].description;
        const temp = data.main.temp;
        const feels_like = data.main.feels_like;
        const temp_min = data.main.temp_min;
        const temp_max = data.main.temp_max;
        const pressure = data.main.pressure;
        const humidity = data.main.humidity;
        const visibility = data.visibility;
        const wind_speed = data.wind.speed;
        const wind_deg = data.wind.deg;
        const clouds = data.clouds.all;
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        const timezone = data.timezone / 3600;
        const country = data.sys.country;
        const dt = new Date(data.dt * 1000).toLocaleString();

        const app = document.getElementById('app');
        app.innerHTML = `
            <h3>Ville : ${ville}, ${country}</h3>
            <div>Longitude : ${longitude}°</div>
            <div>Latitude : ${latitude}°</div>
            <div>Météo : ${meteo}</div>
            <div>Température : ${temp}°C</div>
            <div>Ressenti : ${feels_like}°C</div>
            <div>Température min : ${temp_min}°C</div>
            <div>Température max : ${temp_max}°C</div>
            <div>Pression : ${pressure} hPa</div>
            <div>Humidité : ${humidity} %</div>
            <div>Visibilité : ${visibility} m</div>
            <div>Vitesse du vent : ${wind_speed} m/s</div>
            <div>Direction du vent : ${wind_deg}°</div>
            <div>Nuages : ${clouds} %</div>
            <div>Lever du soleil : ${sunrise}</div>
            <div>Coucher du soleil : ${sunset}</div>
            <div>Fuseau horaire : UTC${timezone >= 0 ? '+' : ''}${timezone}</div>
            <div>Dernière mise à jour : ${dt}</div>
        `;

        await fetchForecast(ville);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function fetchForecast(ville) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${API_KEY}&units=metric&lang=fr`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        const forecast = data.list.map(entry => {
            const date = new Date(entry.dt * 1000).toLocaleString();
            const temp = entry.main.temp;
            const feels_like = entry.main.feels_like;
            const temp_min = entry.main.temp_min;
            const temp_max = entry.main.temp_max;
            const pressure = entry.main.pressure;
            const humidity = entry.main.humidity;
            const weather = entry.weather[0].description;
            const wind_speed = entry.wind.speed;
            const wind_deg = entry.wind.deg;
            const clouds = entry.clouds.all;
            const rain = entry.rain ? entry.rain["3h"] : 0;

            return `
                <div>
                    <h4>${date}</h4>
                    <div>Météo : ${weather}</div>
                    <div>Température : ${temp}°C</div>
                    <div>Ressenti : ${feels_like}°C</div>
                    <div>Température min : ${temp_min}°C</div>
                    <div>Température max : ${temp_max}°C</div>
                    <div>Pression : ${pressure} hPa</div>
                    <div>Humidité : ${humidity} %</div>
                    <div>Nuages : ${clouds} %</div>
                    <div>Vitesse du vent : ${wind_speed} m/s</div>
                    <div>Direction du vent : ${wind_deg}°</div>
                    <div>Pluie (prochaines 3 heures) : ${rain} mm</div>
                </div>
            `;
        }).join('');

        const forecastDiv = document.getElementById('forecast');
        forecastDiv.innerHTML = `<h3>Prévisions météorologiques sur 5 jours</h3>${forecast}`;
    } catch (error) {
        console.error('Erreur:', error);
    }
}

fetchWeather(ville);

document.getElementById('submitCity').addEventListener('click', () => {
    const cityInput = document.getElementById('cityInput').value;
    if (cityInput) {
        ville = cityInput;
        fetchWeather(ville);
    }
});

document.getElementById('refreshWeather').addEventListener('click', () => {
    fetchWeather(ville);
});

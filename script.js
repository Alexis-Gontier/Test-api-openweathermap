const API_KEY = 'd09761ad0491cc386f522c982021ca7f';
const ville = 'Montrouge';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${API_KEY}&units=metric&lang=fr`;


fetch(url)
    .then(response => response.json())
    .then(data => {

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







        const ville = data.name;



        const app = document.getElementById('app');
        app.innerHTML = `
                        <h3>Ville : ${ville}</h3>
                        <div>Longitude : ${longitude} deg</div>
                        <div>Latitude : ${latitude} deg</div>
                        <div>Meteo : ${meteo}</div>
                        <div>Temperature : ${temp}°C</div>
                        <div>Ressenti : ${feels_like}°C</div>
                        <div>Temperature min : ${temp_min}°C</div>
                        <div>Temperature max : ${temp_max}°C</div>
                        <div>Pressure : ${pressure}</div>
                        <div>Humidité : ${humidity} %</div>
                        <div>visibilité : ${visibility} m</div>
                        <div>Vitesse vent : ${wind_speed} km/h</div>
                        <div>direction vent : ${wind_deg} deg</div>
                        `;
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
const apiKey = 'b726ebbe00848d4e47d4d67d437621d8'; // OpenWeatherMap API key
async function getWeather() {
    const city = prompt('Enter city name:');
    if (!city) return;

    clearErrorMessage();


    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Unable to fetch weather data. Please try again later.');
        }
        const data = await response.json();

        displayWeatherInfo(city, data);

    }catch (error) {
        console.error('Error fetching weather data:', error);
        displayErrorMessage('Error fetching weather data. Please try again later.');
    }
    
}

function displayErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
}

function clearErrorMessage() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
}
  
function displayWeatherInfo(city,data) {
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `
            <h2>Weather in ${city}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Description: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        const weatherButton = document.getElementById('weather-button');
        weatherButton.innerText = 'Get new weather';
}

document.getElementById('weather-button').addEventListener('click', getWeather);      
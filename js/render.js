const weatherContainer =
    document.getElementById("weather-container");


function getWeatherInfo(code) {

    if (code === 0) {
        return {
            icon: "☀️",
            text: "Clear sky"
        };
    }

    if (code === 1 || code === 2) {
        return {
            icon: "🌤️",
            text: "Partly cloudy"
        };
    }

    if (code === 3) {
        return {
            icon: "☁️",
            text: "Overcast"
        };
    }

    if (code === 45 || code === 48) {
        return {
            icon: "🌫️",
            text: "Fog"
        };
    }

    if (code >= 51 && code <= 67) {
        return {
            icon: "🌧️",
            text: "Rain"
        };
    }

    if (code >= 71 && code <= 77) {
        return {
            icon: "❄️",
            text: "Snow"
        };
    }

    if (code >= 80 && code <= 82) {
        return {
            icon: "🌦️",
            text: "Rain showers"
        };
    }

    if (code >= 95 && code <= 99) {
        return {
            icon: "⛈️",
            text: "Thunderstorm"
        };
    }

    return {
        icon: "🌤️",
        text: "Unknown"
    };
}


function formatDate(dateString) {

    const date =
        new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "short",
            month: "short",
            day: "numeric"
        }
    );
}


export function showLoading() {

    weatherContainer.innerHTML = `
        <div class="status loading">
            ⏳ Loading weather...
        </div>
    `;
}


export function showError(message) {

    weatherContainer.innerHTML = `
        <div class="status error">
            ❌ ${message}
        </div>
    `;
}


export function renderWeather(
    city,
    weather
) {

    const current =
        weather.current;

    const daily =
        weather.daily;

    const currentInfo =
        getWeatherInfo(
            current.weather_code
        );


    let forecastHTML = "";


    daily.time.forEach(
        function(date, index) {

            const info =
                getWeatherInfo(
                    daily.weather_code[index]
                );


            forecastHTML += `
                <article class="forecast-card">

                    <div class="forecast-date">
                        ${formatDate(date)}
                    </div>

                    <div class="forecast-icon">
                        ${info.icon}
                    </div>

                    <div class="forecast-condition">
                        ${info.text}
                    </div>

                    <div class="forecast-temp">

                        ${Math.round(
                            daily.temperature_2m_max[index]
                        )}°C

                        /

                        <span>
                            ${Math.round(
                                daily.temperature_2m_min[index]
                            )}°C
                        </span>

                    </div>

                </article>
            `;
        }
    );


    weatherContainer.innerHTML = `

        <section class="current-weather">

            <h2>
                ${city.name}, ${city.country}
            </h2>

            <div class="current-info">

                <div id="weather-icon">
                    ${currentInfo.icon}
                </div>

                <div>

                    <p id="current-condition">
                        ${currentInfo.text}
                    </p>

                    <strong id="current-temperature">
                        ${Math.round(
                            current.temperature_2m
                        )}°C
                    </strong>

                </div>

            </div>

        </section>


        <section class="forecast-section">

            <h2>5-Day Forecast</h2>

            <div class="forecast-list">
                ${forecastHTML}
            </div>

        </section>
    `;
}

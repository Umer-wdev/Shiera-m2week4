const GEOCODING_API =
    "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_API =
    "https://api.open-meteo.com/v1/forecast";


export async function getCoordinates(city) {

    const url =
        `${GEOCODING_API}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const response =
        await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to search for city.");
    }

    const data =
        await response.json();

    if (
        !data.results ||
        data.results.length === 0
    ) {
        throw new Error("City not found.");
    }

    return data.results[0];
}


export async function getWeather(
    latitude,
    longitude
) {

    const url =
        `${WEATHER_API}` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,weather_code` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
        `&forecast_days=5` +
        `&timezone=auto`;

    const response =
        await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to get weather data.");
    }

    return await response.json();
}
import {
    getCoordinates,
    getWeather
} from "./api.js";


import {
    showLoading,
    showError,
    renderWeather
} from "./render.js";


const searchForm =
    document.getElementById("search-form");

const cityInput =
    document.getElementById("city-input");


searchForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const cityName =
            cityInput.value.trim();


        if (cityName === "") {

            showError(
                "Please enter city name."
            );

            cityInput.focus();

            return;
        }


        showLoading();


        try {

            const city =
                await getCoordinates(
                    cityName
                );


            const weather =
                await getWeather(
                    city.latitude,
                    city.longitude
                );


            renderWeather(
                city,
                weather
            );

        } catch (error) {

            console.error(error);

            showError(
                error.message ||
                "Something went wrong. Please try again."
            );
        }
    }
);
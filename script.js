const apiKey = "be28e71c99f54e6f9f0103150240206";
const citySearched = "London";

// SEARCH BUTTON
const searchButton = document.getElementById('search-button');

// WEATHER HTML ELEMENTS
const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");
const locationElement = document.getElementById("location");
const iconElement = document.getElementById("icon");
const celsiusTempElement = document.getElementById("temp_c");
const fahrenheitTempElement = document.getElementById("temp_f");

async function getWeatherData(apiKey, locationSearched) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationSearched.toLowerCase()}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Could not fetch data from API", err);
    }
}

const updateWeather = (data) => {
    //UPDATE WEATHER AND LOCATION
    locationElement.textContent = `${data.location.name}, ${data.location.country}`;
    iconElement.src = `https:${data.current.condition.icon}`;
    celsiusTempElement.textContent = data.current.temp_c;
    fahrenheitTempElement.textContent = data.current.temp_f;

    //UPDATE DATE AND TIME
    dateElement.textContent = new Date(data.location.localtime).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    timeElement.textContent = new Date(data.location.localtime).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit'
    });
};

// UPDATE WEATHER FOR NEW LOCATION
searchButton.addEventListener("click", () => {
    const location = document.getElementById('location-input').value;
    if (location) {
        getWeatherData(apiKey, location).then(data => {
            if (data) {
                updateWeather(data);
            } else {
                console.error("No data returned from API");
            }
        }).catch(err => {
            console.error("Error occurred during data fetch", err);
        });
    } else {
        alert('Please enter a location');
    }
});

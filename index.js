// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
function fetchWeatherAlerts(state) {
    return fetch('https://api.weather.gov/alerts/active?area=${state}')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Could not fetch alerts. Please check the state code.');
        }
        return response.json();
});
}

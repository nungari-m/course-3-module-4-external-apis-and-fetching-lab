// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
function fetchWeatherAlerts(state) {
    return fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Could not fetch alerts. Please check the state code.');
        }
        return response.json();
});
}

function displayAlerts(data) {
    alertsDisplay.textContent = "";

    const summary = document.createElement("p");
    summary.textContent = `${data.title}: ${data.features.length}`;
    alertsDisplay.appendChild(summary);

    const list = document.createElement("ul");
    data.features.forEach((alert) => {
        const li = document.createElement("li");
        li.textContent = alert.properties.headline;
        list.appendChild(li);
    });
    alertsDisplay.appendChild(list);
};

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}

function clearError() {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
}

fetchButton.addEventListener("click", () => {
    const state = stateInput.value.trim();

    
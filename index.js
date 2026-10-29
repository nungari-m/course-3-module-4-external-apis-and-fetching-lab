// index.js
const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");
spinner?.classList.remove("hidden");

// Step 1: fetch the data
function fetchWeatherAlerts(state) {
  return fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not fetch alerts. Please check the state code.");
      }
      return response.json();
    });
}

// Step 2: display the data
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
}

// Step 4 helpers
function showError(message) {
  if (!errorMessage) return;
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function clearError() {
  if (!errorMessage) return;
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
}

fetchButton.addEventListener("click", () => {
  const state = stateInput.value.trim();

  // Step 5 (optional): input validation
  if (!/^[A-Z]{2}$/.test(state)) {
    alertsDisplay.textContent = "";
    showError("Please enter a valid two-letter state code in capitals, e.g. MN.");
    return;
  }

  spinner.classList.remove("hidden");

  fetchWeatherAlerts(state)
    .then((data) => {
      console.log(data);   // Step 1 testing
      clearError();         // Step 4: hide error on success
      displayAlerts(data);  // Step 2 + 3: replaces old data
      stateInput.value = ""; // Step 3: clear input
    })
    .catch((error) => {
      console.log(error.message);
      alertsDisplay.textContent = "";
      showError(error.message);
    })
    .finally(() => {
      spinner?.classList.add("hidden");
    });
});
const weatherForm = document.querySelector(".weatherForm") as HTMLFormElement;
const cityInput = document.querySelector(".cityInput") as HTMLInputElement;
const card = document.querySelector("card") as HTMLDivElement;

const apiKey = "9e01c78d7e1475f408562578ca1f257b";

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city: string) {}

function displayWeatherInfo(data: string) {}

function getWeatherEmoji(weatherId: number) {}

function displayError(message: string) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}

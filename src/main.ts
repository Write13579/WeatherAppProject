const weatherForm = document.querySelector(".weatherForm") as HTMLFormElement;
const cityInput = document.querySelector(".cityInput") as HTMLInputElement;
const card = document.querySelector(".card") as HTMLDivElement;

const apiKey = "9e01c78d7e1475f408562578ca1f257b";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(String(error));
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city: string) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  } else {
    return await response.json();
  }
}

function displayWeatherInfo(data: string) {
  console.log(data);
}

function getWeatherEmoji(weatherId: number) {}

function displayError(message: string) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}

import z from "zod";

const weatherForm = document.querySelector(".weatherForm") as HTMLFormElement;
const cityInput = document.querySelector(".cityInput") as HTMLInputElement;
const card = document.querySelector(".card") as HTMLDivElement;

const apiKey = "9e01c78d7e1475f408562578ca1f257b";

const weatherSchema = z.object({
  coord: z.object({ lon: z.number(), lat: z.number() }),
  weather: z.array(
    z.object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
  base: z.string(),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number().min(0).max(100),
  }),
  visibility: z.number(),
  wind: z.object({ speed: z.number(), deg: z.number(), gust: z.number() }),
  clouds: z.object({ all: z.number() }),
  dt: z.number(),
  sys: z.object({
    type: z.number(),
    id: z.number(),
    country: z.string(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
  timezone: z.number(),
  id: z.number(),
  name: z.string(),
  cod: z.number(),
});

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      weatherData.main.temp;
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
    const json = await response.json();

    return weatherSchema.parse(json);
  }
}

function displayWeatherInfo(data: z.infer<typeof weatherSchema>) {
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

async function getWeatherOf(location) {
  if (typeof location !== "string" || location.length < 1) {
    console.error("Please enter a valid location");
    return;
  }
  const request = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=990cd69ce9904fe3992185048231408&q=" +
      location,
    { mode: "cors" }
  );

  const weather = await request.json();
  return weather;
}

function createProcessedWeather(
  locationName,
  locationCountry,
  feelsLikeF,
  feelsLikeC,
  cloudConditionText,
  cloudConditionIcon,
  windMPH,
  temperatureF,
  temperatureC,
  humidity
) {
  return {
    locationName,
    locationCountry,
    feelsLikeF,
    feelsLikeC,
    cloudConditionText,
    cloudConditionIcon,
    windMPH,
    temperatureF,
    temperatureC,
    humidity,
  };
}

const getProcessedWeather = async (location) => {
  return await getWeatherOf(location).then((weather) => {
    return createProcessedWeather(
      weather.location.name,
      weather.location.country,
      weather.current.feelslike_f,
      weather.current.feelslike_c,
      weather.current.condition.text,
      weather.current.condition.icon,
      weather.current.wind_mph,
      weather.current.temp_f,
      weather.current.temp_c,
      weather.current.humidity
    );
  });
};
const form = document.querySelector("form");
const [input, button] = form;
const error = document.querySelector("small");
const weatherDisplay = document.querySelector("div.weather-display");
const locationTitle = document.querySelector("h1.title");
console.log(input);

const [
  feelsLike,
  cloudInformation,
  windInformation,
  temperatureInformation,
  humidity,
] = weatherDisplay.children;

function propagateWeatherDisplay(location) {
  getProcessedWeather(location)
    .then((weather) => {
      error.textContent = "";

      locationTitle.textContent =
        weather.locationName + ", " + weather.locationCountry;

      feelsLike.firstElementChild.textContent = weather.feelsLikeF;

      cloudInformation.firstElementChild.textContent =
        weather.cloudConditionText;
      cloudInformation.children[1].src = weather.cloudConditionIcon;
      cloudInformation.children[1].style.opacity = 1;

      windInformation.firstElementChild.textContent = weather.windMPH;

      temperatureInformation.firstElementChild.textContent =
        weather.temperatureF;

      humidity.firstElementChild.textContent = weather.humidity;
    })
    .catch((err) => {
      error.textContent = "Please enter a valid location";
      console.log(err);
    });
}

button.onclick = () => {
  console.log(input.value);
  propagateWeatherDisplay(input.value);
};

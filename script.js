async function getWeatherOf(location) {
  const test = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=990cd69ce9904fe3992185048231408&q=" +
      location,
    { mode: "cors" }
  );
  const weather = await test.json();
  return weather;
}

function getProcessedWeather(
  locationName,
  locationCountry,
  feelsLikeF,
  feelsLikeC,
  cloudConditionText,
  cloudConditionIcon,
  windMPH,
  temperatureF,
  temperatureC
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
  };
}

function propagateWeatherDisplay(location) {
  if (typeof location !== "string") {
    console.error("Please enter a valid location");
    return;
  }
}

let processedWeather;
getWeatherOf("San Diego").then((weather) => {
  processedWeather = getProcessedWeather(
    weather.location.name,
    weather.location.country,
    weather.current.feelslike_f,
    weather.current.feelslike_c,
    weather.current.condition.text,
    weather.current.condition.icon,
    weather.current.wind_mph,
    weather.current.temp_f,
    weather.current.temp_c
  );
  console.log(processedWeather);
});

//condition.text
//location.name
//location.country

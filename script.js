async function getWeatherOf(location) {
  const test = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=990cd69ce9904fe3992185048231408&q=" +
      location,
    { mode: "cors" }
  );
  const weather = await test.json();
  return weather;
}

getWeatherOf("tokyo").then((data) => console.log(data));

//condition.text
//location.name
//location.country

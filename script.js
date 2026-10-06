async function getWeather() {
  const cityInput = document.getElementById("city");
  const city = cityInput.value.trim();
  
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    // Step 1: Get lat/lon from city name
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found! Try another city");
      return;
    }

    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;
    const cityName = geoData.results[0].name + ", " + geoData.results[0].country;

    // Step 2: Get weather
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const weatherData = await weatherRes.json();

    const temp = Math.round(weatherData.current_weather.temperature);
    const wind = weatherData.current_weather.windspeed;

    // Step 3: Show on UI
    document.getElementById("cityName").innerText = cityName;
    document.getElementById("temp").innerText = temp + "°C";
    document.getElementById("desc").innerText = "Wind: " + wind + " km/h";
    document.getElementById("humidity").innerText = "Live Data • Open-Meteo";

  } catch (error) {
    alert("Error: " + error.message);
    console.log(error);
  }
}

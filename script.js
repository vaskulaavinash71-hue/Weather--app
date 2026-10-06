async function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Enter city name");
    return;
  }

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`,
    );
    const geoData = await geoRes.json();
    if (!geoData.results) {
      alert("City not found");
      return;
    }

    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;
    const name = geoData.results[0].name;

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
    );
    const weatherData = await weatherRes.json();

    document.getElementById("cityName").innerText = name;
    document.getElementById("temp").innerText =
      Math.round(weatherData.current_weather.temperature) + "°C";
    document.getElementById("desc").innerText =
      "Wind: " + weatherData.current_weather.windspeed + " km/h";
    document.getElementById("humidity").innerText =
      "Time: " + weatherData.current_weather.time;
  } catch (err) {
    alert("Error! " + err.message);
  }
}

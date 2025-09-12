const video = document.getElementById("bgVideo");
if (video) video.playbackRate = 0.5;

AOS.init();

const API_KEY = "9e974afbbedb410a924182402251209";
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

const form = document.getElementById("searchForm");
const searchCity = document.getElementById("text");

function renderWeather(data) {
  const { location, current, forecast } = data;

  document.getElementById("location").innerText = `${location.name}, ${location.country}`;
  document.getElementById("date").innerText = location.localtime;

  document.getElementById("weather-icon").src = `https:${current.condition.icon}`;
  document.getElementById("weather-icon").alt = current.condition.text;

  document.getElementById("temp-c").innerText = `${Math.round(current.temp_c)}°C`;
  document.getElementById("temp-f").innerText = `${Math.round(current.temp_f)}°F`;
  document.getElementById("condition").innerText = current.condition.text;
  document.getElementById("feels-like").innerText = `${Math.round(current.feelslike_c)}°C`;

  document.getElementById("humidity").innerText = current.humidity + "%";
  document.getElementById("cloud-cover").innerText = current.cloud + "%";
  document.getElementById("wind-kph").innerText = current.wind_kph;
  document.getElementById("wind-mph").innerText = current.wind_mph;
  document.getElementById("uv-index").innerText = current.uv;
  document.getElementById("pressure").innerText = current.pressure_mb + " hPa";
  document.getElementById("visibility").innerText = current.vis_km + " km";
  document.getElementById("wind-dir").innerText = current.wind_dir;
  document.getElementById("last-updated").innerText = current.last_updated;

  const mapFrame = document.getElementById("weather-map");
  if (mapFrame) {
    mapFrame.src = `https://www.google.com/maps?q=${location.lat},${location.lon}&z=10&output=embed`;
  }

  forecast.forecastday.forEach((day, idx) => {
    const dayName = new Date(day.date).toLocaleDateString("en-US", { weekday: "long" });

    const dayEl = document.getElementById(`day-${idx + 1}`);
    const iconEl = document.getElementById(`day-icon-${idx + 1}`);
    const condEl = document.getElementById(`day-cond-${idx + 1}`);
    const maxEl = document.getElementById(`day-max-${idx + 1}`);
    const minEl = document.getElementById(`day-min-${idx + 1}`);

    if (dayEl && iconEl && condEl && maxEl && minEl) {
      dayEl.innerText = dayName;
      iconEl.src = `https:${day.day.condition.icon}`;
      condEl.innerText = day.day.condition.text;
      maxEl.innerText = `${Math.round(day.day.maxtemp_c)}°C`;
      minEl.innerText = `${Math.round(day.day.mintemp_c)}°C`;
    }
  });


  const hours = forecast.forecastday[0].hour;
  for (let i = 0; i < 10; i++) {
    const hourData = hours[i];
    if (!hourData) continue;

    const time = new Date(hourData.time).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });

    const hourEl = document.getElementById(`hour-${i + 1}`);
    const iconEl = document.getElementById(`hour-icon-${i + 1}`);
    const condEl = document.getElementById(`hour-cond-${i + 1}`);
    const tempEl = document.getElementById(`hour-temp-${i + 1}`);

    if (hourEl && iconEl && condEl && tempEl) {
      hourEl.innerText = time;
      iconEl.src = `https:${hourData.condition.icon}`;
      condEl.innerText = hourData.condition.text;
      tempEl.innerText = `${Math.round(hourData.temp_c)}°C`;
    }
  }
}

async function fetchWeather(query) {
  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&days=7&aqi=yes&alerts=no`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) throw new Error(data.error.message);
    renderWeather(data);
  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchCity.value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  fetchWeather(city);
});

fetchWeather("Panadura");

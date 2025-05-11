async function getWeather() {
  const city = document.getElementById('city').value;
  const apiKey = '9baeed3122e1065589a67b4565678797'; // Replace this
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      document.getElementById('weather').innerText = "❌ " + data.message;
      document.getElementById('outfit').innerText = "";
      return;
    }

    const temp = data.main.temp;
    const desc = data.weather[0].main;
    document.getElementById('weather').innerText = `🌡️ ${temp}°C, ${desc}`;

    let suggestion = "";

    if (desc.includes("Rain")) {
      suggestion = "🌧️ Carry an umbrella and wear waterproof shoes.";
    } else if (temp < 10) {
      suggestion = "🧥 Wear a coat, scarf, and gloves.";
    } else if (temp >= 10 && temp < 20) {
      suggestion = "👕 Light jacket or sweater recommended.";
    } else if (temp >= 20 && temp < 30) {
      suggestion = "🩳 T-shirt and jeans are perfect.";
    } else {
      suggestion = "🔥 It's hot! Wear shorts, tank tops, and drink water.";
    }

    document.getElementById('outfit').innerText = "👗 Outfit Suggestion: " + suggestion;
  } catch (error) {
    document.getElementById('weather').innerText = "⚠️ Error fetching data.";
    document.getElementById('outfit').innerText = "";
  }
}

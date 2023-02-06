const $form = document.getElementById("form");
const $error = document.getElementById("error-message");
const $spinner = document.querySelector(".spinner");

$form.submit.addEventListener("click", async (e) => {
  e.preventDefault();

  const data = await getData($form.search.value.toLowerCase().trim().replace(/\s+/, ' '));

  if (!data) {
    $spinner.classList.add("spinner--hidden");
    $error.classList.remove("form__error--hidden");
    return;
  }

  $error.classList.add("form__error--hidden");

  showWeather(data);
  $spinner.classList.add("spinner--hidden");
});

const getData = async (city) => {
  $error.classList.add("form__error--hidden");
  $spinner.classList.remove("spinner--hidden");

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7f195e65c78b9d2c4e2ddde8e0996f17&lang=es&units=metric`;

  const res = await fetch(URL);

  if (res.status === 200) {
    const data = await res.json();

    return {
      city: data.name,
      temp: data.main.feels_like,
      description: data.weather[0].description,
      image: data.weather[0].icon,
      "wind-speed": data.wind.speed,
    };
  }

  return false;
};

const showWeather = (data) => {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => box.classList.remove("box--hidden"));

  const $box1 = document.querySelector(".box--1");
  if ($box1.hasChildNodes()) $box1.innerHTML = "";

  const temp = document.createElement("h1");
  temp.classList.add("temp");
  temp.textContent = `${Math.floor(data.temp)}°C`;
  const description = document.createElement("p");
  description.classList.add("description");
  description.textContent = data.description.toUpperCase();

  $box1.appendChild(temp);
  $box1.appendChild(description);

  const $box2 = document.querySelector(".box--2");
  if ($box2.hasChildNodes()) $box2.innerHTML = "";

  const city = document.createElement("h1");
  city.classList.add("city");
  city.textContent = data.city;
  const icon = document.createElement("img");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.image}@2x.png`
  );
  icon.setAttribute("alt", "Weather");
  icon.classList.add("weather-icon");

  $box2.appendChild(city);
  $box2.appendChild(icon);

  const $box3 = document.querySelector(".box--3");
  if ($box3.hasChildNodes()) $box3.innerHTML = "";

  const windTitle = document.createElement("h1");
  windTitle.classList.add("wind-speed-title");
  windTitle.textContent = "Veloc. del Viento";
  const windSpeed = document.createElement("p");
  windSpeed.classList.add("wind-speed");
  windSpeed.textContent = `${data["wind-speed"]} m/s`;

  $box3.appendChild(windTitle);
  $box3.appendChild(windSpeed);
};

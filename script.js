'use strict';

const btn = document.querySelector('.btn');
const forecast = document.querySelector('.forecast');
const labelTimer = document.querySelector('.labelTimer');

////////////////////////////////////////////////////

const renderWeather = function (data) {
  const location = data.address.charAt(0).toUpperCase() + data.address.slice(1);
  const html = `
    <h1>${location}</h1>
    <p>${data.resolvedAddress}</p>
    <h4>${data.description}</h4>
    <p>Temperature: ${data.currentConditions.temp} °C</p>
    <p>Feels like: ${data.currentConditions.feelslike} °C</p>
    <p>Humidity: ${data.currentConditions.humidity}%</p>
    <p>Pressure: ${data.currentConditions.pressure}hPa</p>
    <p>UV index: ${data.currentConditions.uvindex}</p>
    `;
  forecast.insertAdjacentHTML('beforeend', html);
};

const findWeather = async function () {
  const response = await fetch(
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/praha?unitGroup=metric&key=GSLCYLUHZ8HKSK7KVFH5WFQ2J&contentType=json',
    {
      method: 'GET',
      headers: {},
    }
  );
  const data = await response.json();
  renderWeather(data);
};

const refresh = function () {
  forecast.replaceChildren();
  findWeather();
  time = 300;
};

btn.addEventListener('click', function () {
  refresh();
});

let time = 300;

const startRefreshTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      refresh();
      time = 300;
    }

    time--;
  };

  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

findWeather();
startRefreshTimer();

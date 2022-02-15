console.log(window.location.pathname);
// const search = document.getElementById('search');
// const btn = document.querySelector('.btn');
// let result = document.getElementById('result');
// const main = document.getElementById('main');

// btn.addEventListener('click', function(e) {
//     e.preventDefault();
//     if(search.value !== ""){
//         fetchWeather(search.value);
//     }
// });

// async function fetchWeather(value) {
//     let weather = await fetch('http://api.weatherstack.com/current?access_key=d59c7005002b79d790e7ab6e58075173&query=' + value);
//     weather = await weather.json();

//     main.style.boxShadow = '1px 1px 1px rgba(0, 0, 0, 0.1)';

//     main.innerHTML = `
//         <div class="first">
//             <h2 class="city">${weather.location.name}</h2>
//         </div>
//         <div class="second">
//             <div class="mb-3 d-flex justify-content-center flex-column align-items-center">
//                 <h1 id="temp">${weather.current.temperature}°C</h1>
//                 <h5 id="weather-desc">${weather.current.weather_descriptions}</h5>
//             </div>
//             <h6>Feels like : <span id="feels-like">${weather.current.feelslike}°C</span></h6>
//             <h6>Humidity : <span id="humidity">${weather.current.humidity}</span></h6>
//             <h6>Wind Speed : <span id="wind">${weather.current.wind_speed} km/hr</span></h6>
//         </div>
//     `;
// }

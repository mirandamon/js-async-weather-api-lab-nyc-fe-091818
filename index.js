const API_KEY = "601a2851661cd231fa23644448818097"

function handleFormSubmit(event) {
  //handle submit event
  const input = document.querySelector('#city')
  const city = input.value
  fetchCurrentWeather(city)
  fetchFiveDayForecast(city)
}

function fetchCurrentWeather(city) {
  //fetch current weather based on city
  // q is a query parameter
  fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + API_KEY + '&units=imperial')
    .then((response) => response.json())
    .then((responseJson) => displayCurrentWeather(responseJson))
}

function displayCurrentWeather(json) {
  //render current weather data to the DOM using provided IDs and json from API
  const temperatureCell = document.querySelector('#temp')
  const low = document.querySelector('#low')
  const high = document.querySelector('#high')
  const humidity = document.querySelector('#humidity')
  const cloudCover = document.querySelector('#cloudCover')
  
  temperatureCell.innerText = json.main.temp + '°F'
  low.innerText = json.main.temp_min + '°F'
  high.innerText = json.main.temp_max + '°F'
  humidity.innerText = json.main.humidity +'%'
  cloudCover.innerText = json.clouds.all + '%'
}


function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
  fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=' + API_KEY + '&units=imperial')
    .then((response) => response.json())
    .then((responseJson) => {
      displayFiveDayForecast(responseJson)
      createChart(responseJson)
    })
}

function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
  for (let i = 0; i < json.list.length; i++) {
    const firstForecast = json.list[i]
    const div = document.createElement('div')
    div.innerHTML = '<p>' + firstForecast.dt_txt + '</p>' +
                    '<p>' + firstForecast.main.temp_min + '</p>' +
                    '<p>' + firstForecast.main.temp_max + '</p>'
    
    const aside = document.querySelector('aside')
    aside.appendChild(div)
  }
  
  // <div>
  //  <p></p>
  // </div>
}

function getDateText(forecast) {
  // { main: { temp: 213.233, temp_min: }, dt_txt: '2018-11-19'}
  return forecast.dt_txt
}

function getTemperature(forecast) {
  return forecast.main.temp
}

function createChart(json) {
  //Bonus: render temperature chart using five day forecast data and ChartJS
  const ctx = document.getElementById("WeatherChart").getContext('2d');
  
  
  const forecasts = json.list // list of 39 forecasts
  
  const chartLabels = forecasts.map(getDateText)
  const temperatures = forecasts.map(getTemperature) 
  console.log(json.list)
  console.log(chartLabels)
  
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: chartLabels,
        datasets: [{
            label: 'Forecast',
            data: temperatures,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}

document.addEventListener('DOMContentLoaded', function() {
  //add event listener here for form submission
  document.addEventListener('submit', function(event) {
    event.preventDefault()
    handleFormSubmit(event)
  })
})

var apiKey = "afc667415d83ab768de2ebb2e45133e9";
function getWeather(coordinates) {
    var { lat, lon } = coordinates
    return fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
}
function getCoordinates(cityName) {
    return fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`)
}

getCoordinates('Los Angeles')
.then(response => response.json())
.then(data => {
    // var lat = data[0].lon
    // var lon = data[0].lon
    var {lat, lon} = data[0]
    getWeather({lat, lon})
    .then(weatherResponse => weatherResponse.json())
    .then(weatherData => {  
        document.body.textContent = JSON.stringify(weatherData, null, 2)
    })
    })
    .catch(error => {
        document.body.textContent = error.message
    })
.catch(error => {
    document.body.textContent = error.message
})
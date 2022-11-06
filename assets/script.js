var apiKey = "afc667415d83ab768de2ebb2e45133e9";
function getWeather(lat, lon) {
    return fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
}
function getCoordinates(cityName) {
    return fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`)
}

getCoordinates('Los Angeles')
.then(response => response.json())
.then(data => {
    document.body.textContent = JSON.stringify(data, null, 2)
})
.catch(error => {
    document.body.textContent = error.message
})
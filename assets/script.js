var apiKey = "afc667415d83ab768de2ebb2e45133e9";
function getWeather({lat, lon}) {
    // var { lat, lon } = coordinates
    return fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
}
function getCoordinates(cityName) {
    return fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=3&appid=${apiKey}`)
}

// .then(response => response.json())
// same result but above is preferred
// .then(function(response) {
//     return response.json()
// })

getCoordinates('Los Angeles')
.then(response => response.json())
.then(data => {
    // var lat = data[0].lat
    // var lon = data[0].lon
    // var {lat, lon} = data[0]
    // console.log({lat, lon})

    getWeather({lat: data[0].lat, lon: data[0].lon})
    .then(weatherResponse => weatherResponse.json())

    .then(weatherData => {  
        document.body.textContent = JSON.stringify(weatherData, null, 2)
    })
    .catch(error => {
        document.body.textContent = error.message
    })
})
.catch(error => {
    document.body.textContent = error.message
})


// getCoordinates('Los Angeles')
// .then(response => response.json())
// .then(data => {
//     document.body.textContent = JSON.stringify(data, null, 2)
// })
// .catch(error => {
//     document.body.textContent = error.message
// })
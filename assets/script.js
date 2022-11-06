var apiKey = "afc667415d83ab768de2ebb2e45133e9";

var pastSearchHistory = localStorage.getItem("history")

if (pastSearchHistory) {
    pastSearchHistory = JSON.parse(pastSearchHistory)
} else {
    pastSearchHistory = []
}

for (var i = 0; i < pastSearchHistory.length; i++) {
    var historyBtn = document.createElement("button")
    var historyItem = pastSearchHistory[i]
    historyBtn.textContent = historyItem
    historyBtn.addEventListener("click", function(event) {
        displayWeather(event.target.textContent)
    })
    document.body.appendChild(historyBtn)
}

var cityInput = document.querySelector('#cityInput')
cityInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        displayWeather(event.target.value)
    } 
})

function getWeather({lat, lon}) {
    // var { lat, lon } = coordinates
    return fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
}
function getCoordinates(cityName) {
    return fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`)
}

// .then(response => response.json())
// same result but above is preferred
// .then(function(response) {
//     return response.json()
// })

function addHistory(location) {
    var searchHistory = localStorage.getItem("history")
    if (searchHistory) {
        searchHistory = JSON.parse(searchHistory)
        searchHistory.push(location)

        if (searchHistory.includes(location)) {
            return
        }

        // for (var i = 0; i < searchHistory.length; i++) {
        //     if (searchHistory[i] === location) {
        //         return
        //     }
        // }

        localStorage.setItem("history", JSON.stringify(location))
    } else {
        searchHistory = [location]
        localStorage.setItem("history", JSON.stringify(searchHistory))
    }
}

function displayWeather(location) {
    getCoordinates(location)
    .then(response => response.json())
    .then(data => {


        if (data.length === 0) {
            var locationError = document.createElement('div')
            locationError.textContent = `${location} not found.`
            document.body.appendChild(locationError)
        } else {
            // var lat = data[0].lat
            // var lon = data[0].lon
            // var {lat, lon} = data[0]
            // console.log({lat, lon})
            getWeather({lat: data[0].lat, lon: data[0].lon})
            .then(weatherResponse => weatherResponse.json())
            
            .then(weatherData => {  
                var weatherStatement = document.createElement('div')
                weatherStatement.textContent = `${weatherData.weather[0].main}: It is currently ${weatherData.weather[0].description}`
                document.body.appendChild(weatherStatement)
                addHistory(location)
            })
            .catch(error => {
                document.body.textContent = error.message
            })
        }
    })
    .catch(error => {
        document.body.textContent = error.message
    })
}

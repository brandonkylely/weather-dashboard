var keyHash = "H77jJb4UBrltMz4nV5KhU";
var apiKey;
fetch(
  `https://ljgvrb40q2.execute-api.us-west-2.amazonaws.com/dev/keyprr/${keyHash}`
)
  .then((res) => res.json())
  .then(({ data }) => (apiKey = data));

var weatherSelection = document.querySelector("#selector")

var pastSearchHistory = localStorage.getItem("history")

if (pastSearchHistory) {
    pastSearchHistory = JSON.parse(pastSearchHistory)
} else {
    pastSearchHistory = []
}



var cityInput = document.querySelector('#cityInput')
cityInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        displayWeather(event.target.value)
    } 
})

function getWeather({lat, lon}) {
    // var { lat, lon } = coordinates
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
}
function getCoordinates(cityName) {
    return fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`)
}

// .then(response => response.json())
// same result but above is preferred
// .then(function(response) {
//     return response.json()
// })
for (var i = 0; i < pastSearchHistory.length; i++) {
    var historyBtn = document.createElement("button")
    var historyItem = pastSearchHistory[i]
    historyBtn.textContent = historyItem
    historyBtn.addEventListener("click", function(event) {
        displayWeather(event.target.textContent)
    })
    document.body.appendChild(historyBtn)
}

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
        console.log(data)

        if (data.length === 0) {
            var locationError = document.createElement('div')
            locationError.textContent = `${location} not found.`
            document.body.appendChild(locationError)
        } else {
            // var lat = data[0].lat
            // var lon = data[0].lon
            // var {lat, lon} = data[0]
            // console.log({lat, lon})
            // var currentWeather = document.createElement("div")
            // currentWeather.textContent = `${data.main.temp}`
            weatherSelection.innerHTML = `
            <h3>${data.name} ${moment(data.dt, "X").format("MM/DD/YYYY")} <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></h3>
                <p>Temp:${data.main.temp}°F</p>
                `

            getWeather({lat: data.coord.lat, lon: data.coord.lon})
            .then(weatherResponse => weatherResponse.json())
            
            .then(weatherData => {  
                console.log(weatherData)
                for (let i = 3; i < weatherData.list.length;  i=i+8) {
                    // var weatherStatement = document.createElement('div')
                    var weatherStatement = document.querySelector(`#card${i}`)
                    weatherStatement.textContent = `${weatherData.list[i].main.temp}°F at 12:00pm`
                    document.body.appendChild(weatherStatement)
                }
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

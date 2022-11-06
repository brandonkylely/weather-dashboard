var apiKey = afc667415d83ab768de2ebb2e45133e9
function getGeoLocation(lat, lon) {
    return fetch(`api.openweathermap.org/data/2.5/forecast?lat={${lat}}&lon={${lon}}&appid={${apiKey}}`)
}
function getCoordinates(cityName, stateCode, countryCode) {
    return fetch (`http://api.openweathermap.org/geo/1.0/direct?q={${cityName}},{${stateCode}},{${countryCode}}&limit={5}&appid={${apiKey}}`)
}
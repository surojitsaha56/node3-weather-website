const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1d3e4f89a80925c25f6704f312a51597&query=' 
    + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)


    request({ url, json: true}, (error, { body }) => {
        if (error){
            callback("Unable to connect to weather service!", undefined)
        }
        else if (body.error){
            console.log(body.error)
            callback("Unable to find location.", undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + 
            body.current.temperature + " degress out. It feels like " + body.current.feelslike + 
            " degress out. The humidity is " + body.current.humidity + "%")
        }
    })
}

module.exports = forecast
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f2db8bb3728c160f3838b7c8e587f753&query=' 
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
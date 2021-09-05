const request = require('request')

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib3NpcmlzNTYiLCJhIjoiY2t0MW9uZTFjMGNoMTJ2bnptYnN6eXdxNCJ9.hfAnm6FTudylSIs7eSQ88A&limit=1'
    
    request({ url, json: true }, (error, { body } = {}) => {
        if (error){
            callback('Unable to connect to location services', undefined)
        }
        else if (body.message=="Not Found" || body.features.length===0){
            callback('Unable to find location. Try another search', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
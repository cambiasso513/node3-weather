const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2Fsdmluemhhbmc1MTMiLCJhIjoiY2s3bHpyZnB6MGRmZTNscGZqNnNkeXp1cyJ9.gtnVGAc-9CNzyYU6n5_GuA&limit=1`
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to Mapbox service!")
        }
        else if(body.features.length === 0){
            callback('Unable to find the location!')
        }
        else{
            callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;
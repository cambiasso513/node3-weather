const request = require('request');

const weatherforecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/aa30c1ff813981a588c758dd52d4cf60/${longitude},${latitude}?units=si`;
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to weather service!", undefined)
        }
        else if(body.error){
            callback('Unable to find the location!', undefined)
        }
        else{
            callback(undefined, `${body.currently.summary}. The current temperature is ${body.currently.temperature}. The chance of rain is ${body.currently.precipProbability}. The highest temperature is ${body.daily.data[0].temperatureHigh}.`)
        }
    })
};

module.exports = weatherforecast;
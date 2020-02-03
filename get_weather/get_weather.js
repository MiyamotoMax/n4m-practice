const request = require('request');
const maxAPI = require("max-api");
const config = require('./user-config.json');//set apiKey

const params = {
  "baseURL": "https://api.openweathermap.org/data/2.5/weather",
    "apiKey": config.apiKey, // your apiKey
    "location": "tokyo",
    "units": "metric"
}

const OUT_URL = params.baseURL + '?' + 'q=' + params.location + '&' + 'appid=' + params.apiKey + '&' + 'units=' + params.units;
const options = {
  url: OUT_URL,
  method: 'GET', 
  json: true
}
maxAPI.post('url:' + OUT_URL);


request(options, (error, response, body)=> {
maxAPI.outlet('body:', body);
});



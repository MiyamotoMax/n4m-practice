const request = require('request');
const maxAPI = require("max-api");
const config = require('./user-config.json');//set apiKey
const dataSet = require('./data.json');

const params = {
  "baseURL": "http://api.nhk.or.jp/v2/pg/now/",
  "apiKey": config.apiKey, // your apiKey
  "selectedParams": []
}

maxAPI.outlet('/service', 'clear');
Object.values(dataSet.service).forEach((v) => {
  maxAPI.outlet('/service', 'append', v)
});
maxAPI.outlet('/service', 0);
maxAPI.outlet('/area', 'clear');
Object.values(dataSet.area).forEach((v) => {
  maxAPI.outlet('/area', 'append', v)
});
maxAPI.outlet('/area', 0);


maxAPI.addHandler("/service", (msg) => {
  params.selectedParams[1] = Object.keys(dataSet.service).reduce( (r, key) => { 
    return dataSet.service[key] === msg ? key : r 
  }, null);
});
maxAPI.addHandler("/area", (msg) => {
  params.selectedParams[0] = Object.keys(dataSet.area).reduce( (r, key) => { 
    return dataSet.area[key] === msg ? key : r 
  }, null);
});

maxAPI.addHandler("play", () => {
  const OUT_URL = params.baseURL + '/' + params.selectedParams[0] + '/' + params.selectedParams[1]+ '.json'+ '?' + 'key=' + params.apiKey;
  maxAPI.post('url:' + OUT_URL);
  const options = {
    url: OUT_URL,
    method: 'GET', 
    json: true
  }
  request(options, (error, response, body)=> {
    maxAPI.post('error:', error);
    //maxAPI.post('response:', response);
    const title = body.nowonair_list[params.selectedParams[1]].present.title
    maxAPI.outlet('/body', '/title', title);
    });
});

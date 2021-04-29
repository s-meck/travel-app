// const startServ = require('./server.js');

const dotenv = require('dotenv');
dotenv.config();

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
var bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

const port = 8081;
// startServ.server;

// API Keys
const geoNameID = 'sheila_meck';
const weatherbitID = 'c5f7360426d84746b489b32e46bf5c27';
const pixabayID = '20829812-17edcb83b701bc2d24742af2d';

/* Dependencies */
const fetch = require("node-fetch");

// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData(req, res){
  res.send(tripInfo);
};

const tripInfo = {};

  // Make calls to apis
  app.post('/api', async function (req, res) {
    const object = req.body;
    const city = (encode(object.city));
    try {
      const geoNameCall = await fetch(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geoNameID}`);
      const gnRes = await geoNameCall.json();
      const lat = gnRes.geonames[0].lat;
      const lon = gnRes.geonames[0].lng;
      const country = gnRes.geonames[0].countryName;
      tripInfo.country = gnRes.geonames[0].countryName;
      const weatherBitCall = await fetch('https://api.weatherbit.io/v2.0/forecast/daily?&lat='+lat+'&lon='+lon+'&key='+weatherbitID);
      const wbRes = await weatherBitCall.json();
      const temp = wbRes.data[0].high_temp;
        // convert Celcius to Fahrenheit
      tripInfo.highTemp = toF(temp);
      tripInfo.weather = wbRes.data[0].weather.description;
      const pixabayCall = await fetch('https://pixabay.com/api/?key='+pixabayID+'&q='+city+'&image_type=photo&category=travel')
      const photoInfo = await pixabayCall.json();
      if (photoInfo.totalHits === 0) {
        tripInfo.picURL = 'no photo'
        tripInfo.countryPic = await countryImage(country);
      }
      else {
        tripInfo.picURL = photoInfo.hits[0].webformatURL;
        tripInfo.countryPic = 'not needed';
      }
    } catch(error) {
        console.log("error", error);
      };
    res.send(tripInfo)
  });

// Encode information
function encode(info){
  var res = (encodeURI(info));
  return res;
}; 

//Convert Celcius temp to Fahrenheit
function toF(temp) {
  let fahrenheit = Math.round(temp * 9/5 + 32);
  return fahrenheit;
};

const countryImage = async(cntry) => {
  const pixabayCallTwo = await fetch('https://pixabay.com/api/?key='+pixabayID+'&q='+cntry+'&image_type=photo&category=travel')
  const photoInfoTwo = await pixabayCallTwo.json();
  const url = photoInfoTwo.hits[0].webformatURL;
  return(url);
};
 
module.exports = {
  toF,
  app,
  port
}
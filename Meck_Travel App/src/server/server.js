
const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
// const projectData = {};

// API Keys
const geoNameID = process.env.GEONAMEID;
const weatherbitID = process.env.WEATHERBIT;
const pixabayID = process.env.PIXABAY;

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
var bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

const fetch = require("node-fetch");

// Initialize the main project folder
app.use(express.static('dist'));

const port = 8081;
// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log('server running');
    console.log('running on localhost:'+port);
};

// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData(req, res){
  res.send(tripInfo);
};

// Post Route
  // app.post('/newObjectInfo', addInfo);

  // function addInfo(req,res) {
  //   let info = req.body;
  //   projectData.temperature = info.temperature;
  //   projectData.date = info.date;
  //   projectData.userResponse = info.userResponse;
  //   res.send(projectData);
  //   console.log(projectData);
  // };

// const info = {
//   gn: {},
//   wb: {},

// }

const tripInfo = {

};

// encodeURIComponent(req.city)

  // Make calls to apis based on request
  app.post('/api', async function (req, res) {
    const object = req.body;
    const city = (encode(object.city));
    try {
      const geoNameCall = await fetch(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geoNameID}`);
      const gnRes = await geoNameCall.json();
      // console.log(gnRes);
      const lat = gnRes.geonames[0].lat;
      const lon = gnRes.geonames[0].lng;
      // console.log(lat, lon);
      tripInfo.country = gnRes.geonames[0].countryName;
      const weatherBitCall = await fetch('https://api.weatherbit.io/v2.0/forecast/daily?&lat='+lat+'&lon='+lon+'&key='+weatherbitID);
      const wbRes = await weatherBitCall.json();
      // console.log(wbRes);
      const temp = wbRes.data[0].high_temp;
        // convert Celcius to Fahrenheit
      tripInfo.highTemp = toF(temp);
      tripInfo.weather = wbRes.data[0].weather.description;
      // console.log(tripInfo.weather);
      const pixabayCall = await fetch('https://pixabay.com/api/?key='+pixabayID+'&q='+city+'&image_type=photo&category=travel')
      const photoInfo = await pixabayCall.json();
      // console.log(photoInfo);
      tripInfo.picURL = photoInfo.hits[0].webformatURL;
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
  }
  




// const geoNameCall = async() => {
//   let city = tripInfo.city;
//   console.log(city);
//   await fetch(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geoNameID}`)
//   .then(
//     res => res.json(),
//     info.gn = res,
//     tripInfo.lat = info.gn.geonames[0].lat,
//     tripInfo.lon = info.gn.geonames[0].lng,
//     tripInfo.country = info.gn.geonames[0].countryName,
//     console.log(tripInfo)  
//   )          
// };

// const weatherBitCall = async() => {
//   await fetch('https://api.weatherbit.io/v2.0/forecast/daily?&lat='+tripInfo.lat+'&lon='+tripInfo.lon+'&key='+weatherbitID)
//   .then(data => data.json())
//   .then(function(data){
//     info.wb.response = data;
//     console.log(info.wb.response)
//   })
// };
    
  
    



    // .then(data => data.json())
    // .then(function(data) {
    //     classification.agreement=data.agreement;
    //     classification.irony=data.irony;
    //     classification.score_tag=data.score_tag;
    //     classification.subjectivity=data.subjectivity;
    //     classification.confidence=data.confidence;
    //     res.send(classification);
    //     console.log(classification);
    // })
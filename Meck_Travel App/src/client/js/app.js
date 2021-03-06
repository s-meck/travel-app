import fetch from "node-fetch";

const tripInfo = {
  city: '',
  daysToTrip: '',
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ d.getMonth()+'.'+ d.getFullYear();

/* Function called by event listener */
const mainFunction = async () => {
  const city = document.getElementById('city').value;
  tripInfo.city = city;
  postData('http://localhost:8081/api', {city: city, })
  .then(timeToTrip)
  .then (updateUI);
};


/* Function to get data object and update UI */
const updateUI = async () => {
  newImage(tripInfo.picURL, tripInfo.countryPic);
  document.getElementById('days-left').innerHTML = (tripInfo.daysToTrip+' days to go!');
  document.getElementById('country').innerHTML = (tripInfo.country);  
  document.getElementById('weather').innerHTML = (tripInfo.weather);
};

// send info to the server to run the api call
const postData = async (url = '', apiInfo = {})=>{
  console.log(apiInfo);
  const response = await fetch(url, {
  method: 'POST', 
  mode: 'cors',
  credentials: 'same-origin',
  headers: {'Content-Type': 'application/json',},
  body: JSON.stringify(apiInfo), 
});
  try {
      const newInfo = await response.json();
      console.log(newInfo);
        tripInfo.picURL = newInfo.picURL;
        tripInfo.countryPic = newInfo.countryPic;
        tripInfo.country = newInfo.country;
        tripInfo.highTemp = newInfo.highTemp;
        tripInfo.weather = newInfo.weather;
  }
  catch(error) {
  console.log("error", error);
  };
};

function timeToTrip() {
    // Get today's date
    const today = new Date();
    const shortDate = today.toLocaleDateString();
    const date2 = new Date(shortDate);
    
    // Get user's input date
    const day = document.getElementById('day-dropdown').value;
    const year = document.getElementById('year-dropdown').value;
    const month = document.getElementById('month-dropdown').value;
    const startDate = (year+"-"+month+"-"+day);
    const date1 = new Date(startDate)
    
    //Calculate difference between the dates
    var timeDifference = date1.getTime() - date2.getTime();
    var dayDifference = timeDifference / (1000 * 3600 * 24);
    tripInfo.daysToTrip = Math.floor(dayDifference / 0.5) * 0.5;

    console.log("Total number of days between dates "
               + shortDate + "and " 
               + startDate + " is: " 
               + tripInfo.daysToTrip);
}

const newImage = (pic, cntryPic) => {
  console.log(pic, cntryPic)
    const img = document.getElementById('dest-photo');
    if (pic === 'no photo') {
        // console.log('this is a test')
        document.getElementById('pic-info').innerHTML = ('No photo of this city is available. Here is a picture from the country instead');
        img.src = cntryPic;
    }
    else {
      // console.log('this is the second test');
      document.getElementById('pic-info').innerHTML = ('A glimpse');
      img.src = pic;
    };
};

// const checkImage = async() => {
//   const image = document.getElementById('trip-photo');
//   image.removeChild(list.childNodes[0]);
// }

// const checkImage = async() =>{
//   if (document.getElementById('new-image')) {
//     var image = document.getElementById('trip-photo');
//     image.removeChild(list.childNodes[0]);
//   }
//   else {console.log('There was no existing image to remove')}
// };


// const countryPic = async ( url = '', country = {}) => {
//   // const postData = async (url = '', apiInfo = {})=>{
//     console.log(country);
//     const response = await fetch(url, {
//     method: 'POST', 
//     mode: 'cors',
//     credentials: 'same-origin',
//     headers: {'Content-Type': 'application/json',},
//     body: JSON.stringify(country), 
//   });
//     try {
//         const newInfo = await response.json();
//         console.log(newInfo);
//           tripInfo.countryPic = newInfo.countryPic;
//     }
//     catch(error) {
//     console.log("error", error);
//     };
// };

export { mainFunction }
export { timeToTrip }
export { newImage }
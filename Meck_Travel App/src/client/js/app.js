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
  newImage(tripInfo.picURL);
  document.getElementById('days-left').innerHTML = (tripInfo.daysToTrip+' days to go!');
  document.getElementById('country').innerHTML = (tripInfo.country);  
  document.getElementById('weather').innerHTML = (tripInfo.weather);

  // const request = await fetch('/all');
  // try{
  //   const allData = await request.json();
  //   document.getElementById('date').innerHTML = ('Checked: '+allData.date);
  //   document.getElementById('temp').innerHTML = ('Temperature in Fahrenheit = '+allData.temperature);
  //   document.getElementById('content').innerHTML = ('Your thoughts: '+allData.userResponse);
  // }catch(error){
  //   console.log("error", error);
  // }
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
        tripInfo.country = newInfo.country;
        tripInfo.highTemp = newInfo.highTemp;
        tripInfo.weather = newInfo.weather;
        // console.log(tripInfo);
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

function newImage(src){
    const newImg = document.createElement('img');
    newImg.src = src;
    newImg.id = 'new-image'
    if (document.getElementById('new-image')) { 
          const old = (document.getElementById('new-image'));
          const parent = document.getElementById('trip-photo');
          parent.replaceChild(newImg, old);
       }
    else {document.getElementById('trip-photo').appendChild(newImg);}
};


export { mainFunction }
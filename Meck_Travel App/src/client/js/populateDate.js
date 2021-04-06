// Adapted from https://betterprogramming.pub/how-to-dynamically-populate-a-year-dropdown-with-javascript-bcf4f849bc4f

const datePopulation = async() => {
    
    //Populate the day dropdown
    let dayDropdown = document.getElementById('day-dropdown'); 
       
    let firstDay = Number('01');    
    let lastDay = Number('31');     
    while (firstDay <= lastDay) {      
      let dayOption = document.createElement('option');          
      dayOption.text = firstDay;      
      dayOption.value = firstDay;        
      dayDropdown.add(dayOption);      
      firstDay += 1;    
    }
 
    // Populate the year dropdown
    let yearDropdown = document.getElementById('year-dropdown'); 
       
    let currentYear = new Date().getFullYear();    
    let latestYear = currentYear+5;     
    while (currentYear <= latestYear) {      
      let dateOption = document.createElement('option');          
      dateOption.text = currentYear;      
      dateOption.value = currentYear;        
      yearDropdown.add(dateOption);      
      currentYear += 1;    
    }

}

export { datePopulation }
/* Bibek Gyawali Id:2409003 */

// Define API Key in a variable using "const" 
const apiKey = "e35ff80a6c1e69de5c418006e43fb61d";


const image = document.getElementById("icon")


// Declare an async function
async function searchData(){
    const inputValue = document.getElementById("search").value;
    const weather = document.getElementById("weather")
    const errorMessage = document.getElementById('error-message');
    // If input value is empty showing data of default city i.e. Bally
    if(inputValue==""){
        // Fetch data from given url and convert JSON object to JavaScript object
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=bally&appid=${apiKey}&units=metric`);
        var data = await response.json();


        // Push the respective data to their respective class and id
        document.querySelector("#city").innerHTML = data.name;
        document.querySelector("#tempe").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector("#humidity_data").innerHTML = data.main.humidity + "%";
        document.querySelector("#wind_data").innerHTML = data.wind.speed + "km/h";
        document.querySelector("#pressure_data").innerHTML = data.main.pressure + "Pa";  

        // For weather icon
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
        image.src = iconUrl;

        // Function for time and date calculation
        document.getElementById("date").innerText = calcTime(data.timezone);


        


    // If some value is given 
    }else{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`)
        // If valid city name is entered 
        if(response.status !== 404){
            var data = await response.json();


            // Push the respective data to their respective variable
            document.querySelector("#city").innerHTML = data.name;
            document.querySelector("#tempe").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector("#humidity_data").innerHTML = data.main.humidity + "%";
            document.querySelector("#wind_data").innerHTML = data.wind.speed + "km/h";
            document.querySelector("#pressure_data").innerHTML = data.main.pressure + "Pa"; 
            // For weather icon
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
            image.src = iconUrl;

            // Function for time and date calculation
            document.getElementById("date").innerText = calcTime(data.timezone);

        // If invalid city name is entered block the entire content
        }else{
            errorMessage.style.display = 'block';
            weather.innerHTML = ''
        
    }
}
}

// Executing the function when search button is clicked
btn.addEventListener("click",()=>{
    searchData()
 })

 searchData();


//  Calculating time and date based on respective timezone in 24-hour format
 function calcTime(offset) {
    var originalDate=new Date();
  var d = new Date(new Date().getTime() + offset * 1000);
  var year = originalDate.getFullYear();
  var month = originalDate.getMonth()+1;
  var day = originalDate.getDay();
  var hr = d.getUTCHours();
  var min = d.getUTCMinutes();
  return year +'-'+ month+'-'+  day + " /" +hr + ":" + min ;
}
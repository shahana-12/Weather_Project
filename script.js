function showTemp(city) {
    let showcity = document.getElementById("schity");
    let tempareture = document.getElementById("temp");

    let Pressure = document.getElementById("Pressure");
    let Humidity = document.getElementById("Humidity");
    let Temp_min = document.getElementById("Temp_min");
    let Temp_max = document.getElementById("Temp_max");
    let Timezone = document.getElementById("Timezone");
    let Wind = document.getElementById("wind");
    let weather = document.getElementById("weather");




    let apiKey = '0fdc3f963b8aa2fa5239e39be06fb698';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    showcity.innerText = city;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Weather data:', data);

            if (data.sys) {
                tempareture.innerText = Math.floor(data.main.temp - 273.16);
                Pressure.innerText = data.main.pressure +" mb";
                Humidity.innerText = data.main.humidity + " %";
                Temp_min.innerText = Math.floor(data.main.temp_min - 273.16);
                Temp_max.innerText = Math.floor(data.main.temp_max - 273.16);
                // Timezone.innerText = data.timezone;
                Wind.innerText = data.wind.speed + " Km/h";
                weather.innerHTML = data.weather[0].description;



                if (data.timezone) {
                    let bangladeshOffset = 6 * 60 * 60;
                    let offsetHours = Math.floor(data.timezone / 3600)+ (bangladeshOffset / 3600);
                    let offsetMinutes = (data.timezone % 3600) / 60;
              
                    let currentTime = new Date();
                    currentTime.setHours(currentTime.getHours() + offsetHours);
                    currentTime.setMinutes(currentTime.getMinutes() + offsetMinutes);
              
                
                    let hours = currentTime.getHours();
                    let minutes = currentTime.getMinutes();
                    let ampm = hours >= 12 ? 'AM' : 'PM';
              
                    hours = hours % 12;
                    hours = hours ? hours : 12; 
              
                    Timezone.innerText = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
                  } else {
                    console.log('Timezone information not available in the API response.');
                  }


                //using dt-----------------------------------------------
                // let dt = data.dt;
                // let dtDate = new Date(dt * 1000);
                // let options = { timeZone: 'Asia/Dhaka' };
                // let formattedDateTime = dtDate.toLocaleString('en-US', options);
                // Timezone.innerText = formattedDateTime;





               document.getElementById('cel').addEventListener('click', celcius);
    
               document.getElementById('far').addEventListener('click', farenhide);    
           
               function celcius(){
                   tempareture.innerText = Math.floor(data.main.temp - 273.16);
               }
               function farenhide(){
                   tempareture.innerText = Math.floor(((data.main.temp - 273.16)*(9/5))+32);
               } 






            } else {
                console.error('Invalid API response:', data);
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
  
        
        
        
        preventDefault();

}





document.getElementById('searchnput').addEventListener('input', searchList);
function searchList() {
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById('searchnput');
    filter = input.value.toUpperCase();
    ul = document.getElementById('CipyList');
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}

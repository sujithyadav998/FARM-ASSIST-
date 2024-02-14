
const city = 'London';



const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='97364b0794b21f3ef820ffab0723b797';

const weatherIcons = {
    '01d': "static/Weather-Images/clear.png",
    '01n': 'static/Weather-Images/clear.png',
    '02d': 'static/Weather-Images/mist.png',
    '02n': 'static/Weather-Images/mist.png',
    '03d': 'static/Weather-Images/clouds.png',
    '03n': 'static/Weather-Images/clouds.png',
    '04d': 'static/Weather-Images/rain.png',
    '04n': 'static/Weather-Images/rain.png',
    // ... add more mappings for other weather condition codes
  };
  



// let url = 'https://api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid=97364b0794b21f3ef820ffab0723b797'
//fetch(url)
getWeatherData()
let modified = ''
function getWeatherData () {
   
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;
       
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
      
                console.log(data)
                let currtemp = data.main.temp ; 
                let  ic = data.weather[0].icon ; 
                let apiDate = data.dt ;
                let dname = getday(apiDate) 

                let place = data.name ; 
                console.log(place)
             //   document.getElementById('placename').innerHTML = ` ${place}  `
             document.getElementById('placename').innerHTML = "Ghatkesar"
                
                
                 
                modified += `
            <div class="grid-item">  
            <h3> ${dname} </h3> 
            <img src= ${weatherIcons[ic]} alt="weather icon" class="w-icon">
            <h4>${currtemp}&deg;c </h4>
            </div>
            `

           
            })
    

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=17.387140&lon=78.491684&units=metric&appid=97364b0794b21f3ef820ffab0723b797`).then(res => res.json()).then(data => {
      
        
        // console.log(data.list)
        let l = data.list
        let i = 7 ; 

        let icondid = []
        
        let temp = []
        let d  = []
        while( i < l.length) {

            const element = l[i];
            apiDate = element.dt ; 

            let id = element.weather[0].icon ;
            console.log(id)
            icondid.push( id)
            

            let dayName = getday(apiDate) ; 
            temp.push(element.main.temp)
            d.push(dayName)
            // console.log(dayName)
            // console.log(element.main.temp)
            i = i +  8 ;

        


            

             
          }
          forecast(temp,d , icondid);
       // showWeatherData(data);
        })


      
    })
    
    
    // console.log("hey")
}


function forecast(temp , d ,iconid)
    {
        
        for(let i = 0 ; i < 4 ; i++)
        {
            modified += `
            <div class="grid-item">  
            <h3> ${d[i]} </h3> 
            <img src= ${weatherIcons[iconid[i]]} alt="weather icon" class="w-icon">
            <h4>${temp[i]}&deg;c </h4>
            </div>
            `
        }
      
      let con = document.querySelector(".grid-container")
con.innerHTML = modified
    }

function getday(apiDate)
{
    const timestamp = apiDate * 1000;

            // Create a new Date object
    const dateObject = new Date(timestamp);
            
            // Get the day of the week (0 for Sunday, 1 for Monday, and so on)
    const day = dateObject.getDay();

            
            // You can use an array to map the day index to its corresponding name
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = daysOfWeek[day];
    return dayName ; 
}


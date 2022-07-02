const cityTempEl=document.getElementById("city-temp")
const cityIconEl=document.getElementById("city-icon")
const selectEl=document.getElementById("select")
const addLocationBtn=document.getElementById("add-location")
const dateList=document.getElementById("date-list")
const cityNameEl =document.getElementById("city-name")
const latitudeEl =document.getElementById("latitude")
const longitudeEl =document.getElementById("longitude")
const submitBtn=document.getElementById("submit")

let gps=[
    {
        city:"seoul",
        gps:"[37.5139,126.9828]"
    },
    {
        city:"london",
        gps:"[51.5002,-0.12628]"
    },
]

updatePg([51.5002,-0.12628])

addLocationBtn.addEventListener("click",()=>{
    const formContainer=document.querySelector(".form")
    formContainer.classList.toggle("hidden")
})
submitBtn.addEventListener("click",(e)=>{
    e.preventDefault();

    const option=document.createElement("option")
    const cityname=cityNameEl.value;
    const latitude="["+latitudeEl.value+","+longitudeEl.value+"]"
    
    if(cityname && latitude[0] && latitude[1]){
        option.value=latitude
        option.innerText=cityname
        gps+=({city:cityname,gps:latitude})
    
        selectEl.appendChild(option)
    
        cityNameEl.value=""
        latitudeEl.value=""
        longitudeEl.value=""
        const formContainer=document.querySelector(".form")
        formContainer.classList.toggle("hidden")
    }
})

selectEl.addEventListener("change",(e)=>{
    console.log("types",typeof(e.target.value))
    console.log(e.target.value)
    let string=e.target.value.slice(1,-1)
    let array=string.split(",")
    updatePg(array)
})


async function getWeatherData([Latitude,Longitude]){

    const [latitude, longitude] = [Latitude,Longitude]
    const position="latitude="+latitude+"&longitude="+longitude
    const APIURL="https://api.open-meteo.com/v1/forecast?"+position+"&daily=weathercode,sunrise,temperature_2m_max,temperature_2m_min&timezone=JST"

    const resp= await fetch(APIURL)
    const respData= await resp.json()
    // console.log(respData)
    return respData.daily
}

async function updatePg([Latitude,Longitude]){
    const weather= await getWeatherData([Latitude,Longitude])
    
    let weather_code=[]
    let average_temperature=[]
    for(let i=0;i<7;i++){
        let tmp=weather.temperature_2m_max[i]+weather.temperature_2m_min[i]
        average_temperature.push(Math.round(tmp/2))

        if (weather.weathercode[i]<=48){
            weather_code.push(0)
        }else{
            weather_code.push(1)
        }
    }
    updateBody(average_temperature,weather_code)
}

function updateBody(average_temperature,weather_code){

    cityTempEl.innerText=average_temperature[0]+"°C"
    cityIconEl.innerHTML=weather_code[0]==1 ? `<i class="fa-solid fa-cloud"></i>`:`<i class="fa-solid fa-sun"></i>`;

    dateList.innerHTML=""
    const week=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let today=new Date();
    let day=today.getDay();

    let j=day
    for(let i=1;i<7;i++){
        const date=document.createElement("li")
        const temp=average_temperature[i]+"°C"
        const weatherCode=weather_code[i]
        date.innerHTML=`
            ${week[j] == week[day]? "Today":week[j]} 
            <span>${temp} 
                ${weatherCode==1 ? `<i class="fa-solid fa-cloud"></i>`:`<i class="fa-solid fa-sun"></i>`}
            </span>
        `
        j=(j+1)%7
        dateList.appendChild(date)
    }
}


// 0	Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail




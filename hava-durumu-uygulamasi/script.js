const url = "https://api.openweathermap.org/data/2.5/";
const key = "43a4e3cf31be4b431ffa4a5396bc0879";

const setQuery = (e) =>{
    if(e.keyCode == '13'){
        getResult(searchBar.value)
    }
}

const getResult = (cityName) =>{
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
    console.log(query);
    fetch(query)
    .then(weather => {
        return weather.json();
    })
    .then(displayResult);
    //aasd
}

const displayResult = (result) =>{
    let city = document.querySelector('.city');
    city.innerText = `${result.name}, ${result.sys.country}`;//asdasaf
    let temp = document.querySelector('.temp');
    temp.innerText = `${Math.round(result.main.temp)}°C`;
    console.log(result);
    

    let desc = document.querySelector('.desc');
    desc.innerText = result.weather[0].description;

    let minmax = document.querySelector('.minmax');
    minmax.innerText = `${Math.round(result.main.temp_min)}°C / ${Math.round(result.main.temp_max)}°C`;
}

const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keypress',setQuery);
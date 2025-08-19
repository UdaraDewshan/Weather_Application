const video = document.getElementById("bgVideo");
video.playbackRate = 0.5;

AOS.init();//animation

//-------callApi--------
async function callApi() {
    await fetch("http://api.weatherapi.com/v1/forecast.json?key=d2e08be9b1a4476e9f7131914251908&q=panadura&days=1&aqi=no&alerts=no")
        .then(responce => responce.json())
        .then(data => console.log(data))
}
callApi();

//--------setDate-----------
let date = new Date();
formatDate = {
    "weekday": `long`,
    "month": `long`,
    "year": `numeric`,
    "day": `numeric`
}
let currentDate = date.toLocaleDateString("en-US", formatDate);
document.getElementById("date").innerText = currentDate;

//--------searchCity--------------
let form = document.getElementById("searchForm");
let searchCity = document.getElementById("text");

form.addEventListener("submit", e => {
    e.preventDefault();
    console.log(searchCity.value);
});


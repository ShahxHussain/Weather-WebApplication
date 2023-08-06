let weather = {
    "apikey": "3575eba7ce3feefcda669e4251b67363",

    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apikey
        ).then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {

        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity:" + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed:" + speed + "Km/h";

        //---------------WITHOUT ANIMATION--------------------------
        //document.querySelector(".weather").classList.remove("loading");

        //---------------WITH ANIMATION-----------------------------

        const weatherElement = document.querySelector(".weather");
        weatherElement.classList.remove("loading");
        weatherElement.classList.add("fade-in");


        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"

    },

    //Seacrh City or Country Name
    search: function () {

        //Animation
        const weatherElement = document.querySelector(".weather");
        weatherElement.classList.remove("fade-in");
        weatherElement.classList.add("fade-out");

        setTimeout(() => {
            this.fetchWeather(document.querySelector(".search-bar").value);
        }, 500);
    }
}

//Search Functionality for Search Button
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

//Search Functionality for Enter Button
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

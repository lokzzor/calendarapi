const axios = require('axios').default;

class Weather {
    async Weather (req,res){
        try{
            await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Dubna&appid=596876ae90ac6935eb72f9671488da95&units=metric')  .then(function (response) {
                var hour = new Date().getHours(); var iconweather;
                if (hour >= 6 && hour < 18) {
                    if (response.data.weather[0].icon === "01d") {
                        iconweather='icon1';
                    } else if (
                        response.data.weather[0].icon=== "03d" ||
                        response.data.weather[0].icon === "02d" ||
                        response.data.weather[0].icon === "04d"
                    ) {
                        iconweather='icon3d';
                    } else if (
                        response.data.weather[0].icon === "09d" ||
                        response.data.weather[0].icon === "10d"
                    ) {
                        iconweather='icon9';
                    } else if (response.data.weather[0].icon === "11d") {
                        iconweather='icon11';
                    } else if (response.data.weather[0].icon === "13d") {
                        iconweather='icon13';
                    } else if (response.data.weather[0].icon === "50d") {
                        iconweather="icon50";
                    }
                } else if (hour >= 18) {
                    if (response.data.weather[0].icon === "01n") {
                        iconweather='icon1n';
                    } else if (
                        response.data.weather[0].icon === "03n" ||
                        response.data.weather[0].icon === "02n" ||
                        response.data.weather[0].icon === "04n"
                    ) {
                        iconweather='icon2n';
                    } else if (
                        response.data.weather[0].icon === "09n" ||
                        response.data.weather[0].icon === "10n"
                    ) {
                        iconweather='icon9';
                    } else if (response.data.weather[0].icon === "11n") {
                        iconweather='icon11';
                    } else if (response.data.weather[0].icon === "13n") {
                        iconweather='icon13';
                    } else if (response.data.weather[0].icon === "50n") {
                        iconweather='icon50';
                    }
                } else {
                    if (response.data.weather[0].icon === "01n") {
                        iconweather='icon1n';
                      } else if (
                        response.data.weather[0].icon === "03n" ||
                        response.data.weather[0].icon === "02n" ||
                        response.data.weather[0].icon === "04n"
                      ) {
                        iconweather='icon2n';
                      } else if (
                        response.data.weather[0].icon === "09n" ||
                        response.data.weather[0].icon === "10n"
                      ) {
                        iconweather='icon9';
                      } else if (response.data.weather[0].icon === "11n") {
                        iconweather='icon11';
                      } else if (response.data.weather[0].icon=== "13n") {
                        iconweather='icon13';
                      } else if (response.data.weather[0].icon === "50n") {
                        iconweather='icon50';
                      }
                }
                const weather={
                    wind:   response.data.wind.speed,
                    temp:   Math.round(response.data.main.temp),
                    tempfeels_like:Math.round(response.data.main.feels_like),
                    vlag:   response.data.main.humidity,
                    wind:   Math.round(response.data.wind.speed),
                    clouds: Math.round(response.data.clouds.all),
                    descrip:response.data.weather[0].description,
                    main:   response.data.weather[0].main,
                    icon:   iconweather,
                }
                res.send(weather);
            }) .catch(function (error) {
                var a = []; a[0] = String(err).replace('error:', ''); return res.send(a);
            })
        } catch(e) {
            res.status(500).json({ message: 'Что то пошло не так смотреть блок погода'})
        }
    }
}
module.exports = new Weather()
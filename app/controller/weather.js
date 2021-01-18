const axios = require('axios').default;

class Weather {
    async Weather (req,res){
        try{
            await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Dubna&appid=596876ae90ac6935eb72f9671488da95&units=metric')  .then(function (response) {
                const weather={
                    wind:   response.data.wind.speed,
                    temp:   Math.round(response.data.main.temp),
                    tempfeels_like:Math.round(response.data.main.feels_like),
                    vlag:   response.data.main.humidity,
                    wind:   Math.round(response.data.wind.speed),
                    clouds: Math.round(response.data.clouds.all),
                    descrip:response.data.weather[0].description,
                    main:   response.data.weather[0].main,
                    icon:   response.data.weather[0].icon,
                    background: "",
                    icon_obj:response.data.weather[0].icon
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
const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const photo = document.querySelector('.photo')
const warning = document.querySelector('.warning')
const weather = document.querySelector('.weather-result')
const temperature = document.querySelector('.temperature-result')
const humidity = document.querySelector('.humidity-result')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='

const API_KEY = '&appid=2baecb1aaa8e38504cc150973fa76472'

const API_UNITS = '&units=metric '

const checkWeather = () => {
    const city = input.value || 'Warsaw'
    const URL = API_LINK + city + API_KEY + API_UNITS

    axios.get(URL).then(res => {
        const status = Object.assign({}, ...res.data.weather)

        cityName.textContent = res.data.name
        cityName.classList.remove('warning')
        temperature.textContent = Math.floor(res.data.main.temp) + ' °C'
        humidity.textContent = res.data.main.humidity + ' %'
        weather.textContent = status.main

        input.value = ''

        photo.setAttribute('src', '/img/Cloud.png')

        if (status.id >= 200 && status.id < 300) {
            photo.setAttribute('src', './img/Cloud&Lightning.png')
        } else if (status.id >= 300 && status.id < 400) {
            photo.setAttribute('src', './img/SunBehindClouds.png')
        } else if (status.id >= 500 && status.id < 600) {
            photo.setAttribute('src', './img/RainwithClouds.png')
        } else if (status.id >= 600 && status.id < 700) {
            photo.setAttribute('src', './img/HeavySnowRain.png')
        } else if (status.id >= 701 && status.id < 800) {
            photo.setAttribute('src', './img/SunBehindClouds.png')
        } else if (status.id === 800) {
            photo.setAttribute('src', './img/LighterHeat.png')
        } else if (status.id >= 801 && status.id < 900) {
            photo.setAttribute('src', './img/SunBehindClouds.png')
        }

    }).catch(() => {
        cityName.classList.add('warning')
        cityName.textContent = 'Wpisz poprawną nazwę miasta !'
        photo.setAttribute('src', '')
        temperature.textContent = ''
        humidity.textContent = ''
        weather.textContent = ''
    })
}

const checkEnter = e => {
    if (e.key === 'Enter') {
        checkWeather()
    }
}

input.addEventListener('keyup', checkEnter)

button.addEventListener('click', checkWeather)
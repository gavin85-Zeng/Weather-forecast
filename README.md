# Weather-forecast

![GitHub](https://img.shields.io/github/license/gavin85-Zeng/Weather-forecast)

Weather forecast website challenge project  
[Online Demo](https://gavin85-zeng.github.io/Weather-forecast/)

1. In developer mode put your own API key to .env.test file  
2. In production mode put your own API key at the dialog

Use technologies below:  

* React
* TypeScript
* Apache echarts
* SCSS
* Webpack
* Redux toolkit

__***Any feedback will be appreciated***__

## Online Key-in your API key  

---
If have not API key go to [OpenWeahter](https://openweathermap.org) register account and try it

## Clone

---
    git clone https://github.com/gavin85-Zeng/Weather-forecast.git

## Run at local

---
After you clone this project, please put your API key at .env.test file  
*Production enter your API key at dialog*

    WEATHER_API_KEY = '***************************'

Use webpack devServer run this project

    npm run serve

IF you want to try production mode at local server, modify package.json  

    "serve": "set NODE_ENV=production&&webpack serve"
OR  

    "serve": "webpack serve --node-env=development"

If devtool console show __***Error: Network Error bundle.js:2***__ , please disable your Adblock  
Becuase this app will use [GEOLOCATION DB](http://geolocation-db.com) get your location

## Reference

---
~~DevProject: <https://www.codementor.io/projects/web/weather-forecast-website-atx32lz7zb/get-started>~~  
OpenWeahter: <https://openweathermap.org/api>  
GEOLOCATION DB: <http://geolocation-db.com>  

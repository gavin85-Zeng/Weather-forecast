import React, { useEffect, useRef, useState } from "react";
import CurrentWeatherCard, {DailyWeahterCard} from "./weather/cards/ForecastCards";
import WeatherInterface, { CountryInfo }  from "../model/WeatherInterface";
import { getCountryInfo, getCountryForecast } from "../api/WeatherAPI";
import Chart from "./weather/chart/Chart";
import { ECharts } from "echarts/types/dist/echarts";
import { fakeCoords, fakeForecast } from "../test/Fake";

const App = () => {
    const [countryInfo, setCountryInfo] = useState<CountryInfo>()
    const [forecast, setforecast] = useState<WeatherInterface>()
    const [tempChart, setTempChart] = useState<ECharts>()
    const cityRef = useRef<HTMLInputElement>(null)

    const getForecast = async (coords:string|undefined) => {
        const inputCity = cityRef.current?.value
        let lat, lon, name, countryName

        if (coords !== undefined) [lat, lon] = coords.split(',')
        if (inputCity !== undefined && inputCity !== '') {
            [lat, lon, name, countryName] = await getCountryInfo('UserInput', inputCity)
        } else {
            if (coords !== undefined)
                [lat, lon, name, countryName] = await getCountryInfo('Default', coords)
        }

        if (!lat || !lon || !name || !countryName) {
            alert('City info not found! please make sure your input city is correct')
            return 
        }
        
        const forecast = await getCountryForecast(lat, lon)
        const info = {
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            name: name,
            countryName: countryName
        }
        console.log(forecast)
        console.log(info)
        setCountryInfo(info)
        setforecast(forecast)
    }

    const getFakeForecast = async () => {
        setCountryInfo(fakeCoords)
        setforecast(fakeForecast)
    }

    const getWeahter = () => {
        if (forecast === undefined) return ''
        return (
            <div className='weather-glass-morphism-box'>
                <section>
                    <CurrentWeatherCard dataObj={forecast} info={countryInfo} />
                </section>
                <section>
                    <div className='daily-container'>
                        <div className='chart'></div>
                        <div className="daily-card-scroll">
                            <div className='daily-card-container'>
                                {forecast?.daily.map((val, i) => {
                                    return <DailyWeahterCard key={i} dataObj={val} index={i} />
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
    
    const getUserLocation = (position:GeolocationPosition) => {
        const lat = '' + position.coords.latitude
        const lon = '' + position.coords.longitude
        const coords = `${lat},${lon}`
        getForecast(coords)
    }
    const requirePermission = () => {
        const geo = navigator.geolocation
        if (geo) {
            geo.getCurrentPosition(
                getUserLocation, // success
                (err) => { //error
                    console.warn(`ERROR(${err.code}): ${err.message}`)
                    return
                }, 
                { // options
                    enableHighAccuracy: true,
                    timeout: 5000,
                    // maximumAge: 0
                }
            )
        } else {
            alert('Geolocation is not supported by this browser')
            return
        }
    }

    useEffect(() => {
        if (tempChart !== undefined) tempChart.dispose()
        if (forecast !== undefined) {
            const chartObj = Chart(forecast.hourly)
            setTempChart(chartObj)
        } else {
            // requirePermission()
            getFakeForecast()
        }
    }, [forecast])

    return (
        <>
            <div className='location-container'>
                <input ref={cityRef} className='input-style' type="text" name="city" id="city" placeholder='Enter Location' />
                <input type="button" className='button-style' value="Get Forecast" onClick={()=> getForecast(undefined)}/>
            </div>
            {getWeahter()}
        </>
    )
}

export default App;
import React, { useEffect, useRef, useState } from "react";
import CurrentWeatherCard, {DailyWeahterSelector} from "./weather/cards/ForecastCards";
import WeatherInterface, { ICountryInfo }  from "../model/WeatherInterface";
import { getCountryInfo, getCountryForecast } from "../api/WeatherAPI";
import Chart from "./weather/chart/Chart";
import { ECharts } from "echarts/types/dist/echarts";
import { fakeCoords, fakeForecast } from "../test/Fake";
import axios from "axios";

const App = () => {
    const [countryInfo, setCountryInfo] = useState<ICountryInfo>()
    const [forecast, setforecast] = useState<WeatherInterface>()
    const [tempChart, setTempChart] = useState<ECharts>()
    const [selectedIdx, setSelectedIdx] = useState<string>('');
    const [usrAPIKey, setUsrAPIKey] = useState<string>('');
    const cityRef = useRef<HTMLInputElement>(null)
    const keyRef = useRef<HTMLInputElement>(null)


    const getForecast = async (coords:string|undefined) => {
        const inputCity = cityRef.current?.value
        let lat, lon, name, countryName

        if (coords !== undefined) [lat, lon] = coords.split(',')
        if (inputCity !== undefined && inputCity !== '' && usrAPIKey !== '') {
            [lat, lon, name, countryName] = await getCountryInfo('UserInput', inputCity, usrAPIKey)
        } else {
            if (coords !== undefined)
                [lat, lon, name, countryName] = await getCountryInfo('Default', coords)
        }

        if (!lat || !lon || !name || !countryName) {
            alert('City info not found! please make sure your input city is correct')
            return 
        }
        let forecast
        if (usrAPIKey !== '')
            forecast = await getCountryForecast(lat, lon, usrAPIKey)
        else 
            forecast = await getCountryForecast(lat, lon)
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
        fakeForecast.daily.shift()
        setforecast(fakeForecast)
    }

    const handlerCardSelected = (e:React.MouseEvent<HTMLDivElement>) => {
        const _id = e.currentTarget.id
        if (selectedIdx !== _id) { 
            setSelectedIdx(_id)
            return
        }
        setSelectedIdx('')
    }

    const getWeahter = () => {
        if (forecast === undefined || countryInfo === undefined) return (<div>Location info not found!</div>)
        return (
            <div className='weather-glass-morphism-box'>
                <section className='current-card-container'>
                    <CurrentWeatherCard dataObj={forecast} info={countryInfo} chartClass='current-chart'/>
                </section>
                <section className='daily-card-container'>
                        {forecast?.daily.map((val) => {
                            return <DailyWeahterSelector key={val.dt} dataObj={val} index={val.dt} clickHanlder={handlerCardSelected} isSelected={parseInt(selectedIdx) === val.dt}/>
                        })}
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

    const setTheUsrAPIKey = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUsrAPIKey(e.currentTarget.value)
    }

    useEffect(() => {
        const resizeHandler = () => {
            tempChart?.resize()
        }
        window.addEventListener('resize', resizeHandler)
        return () => window.removeEventListener('resize', resizeHandler)
    }, [tempChart])

    const [details, setDetails] = useState([]);

    useEffect(() => {
        if (tempChart !== undefined) tempChart.dispose()
        if (forecast !== undefined) {
            const chartObj = Chart(forecast.hourly, 'current-chart')
            setTempChart(chartObj)
        } else {
            // requirePermission()
            /**
             * get location from geolocation-db.com without permission()
             * if request error net::ERR_BLOCKED_BY_CLIENT at localhost occur
             * please disable your Adblock 
             */
             
            const url = 'https://geolocation-db.com/json/344ec440-6bfc-11eb-a0c0-b5dee9e67313';
            axios.get(url)
                .then(res => {
                    console.log(res.data)
                    const lat = res.data.latitude
                    const lon = res.data.longitude
                    console.log(lat, lon)    
                })
                .catch(err => console.log(err))
            getFakeForecast()
        }
    }, [forecast])
    
    return (
        <>
            {process.env.NODE_ENV !== 'development' ? <input ref={keyRef} className='input-style api-key' type="text" name="inputKey" id="inputKey" placeholder='Enter API-Key' onChange={setTheUsrAPIKey}/> : ''}
            <div className='location-container'>
                <input ref={cityRef} className='input-style' type="text" name="city" id="city" placeholder='Enter Location' />
                <input type="button" className='button-style' value="Get Forecast" onClick={()=> getForecast(undefined)}/>
            </div>
            {getWeahter()}
        </>
    )
}

export default App;

function async() {
    throw new Error("Function not implemented.");
}

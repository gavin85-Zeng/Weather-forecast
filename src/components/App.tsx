import React, { useEffect, useRef, useState } from "react";
import CurrentWeatherCard, {DailyWeahterSelector} from "./weather/cards/ForecastCards";
import WeatherInterface, { ICountryInfo }  from "../model/WeatherInterface";
import { getCountryInfo, getCountryForecast } from "../api/WeatherAPI";
import Chart from "./weather/chart/Chart";
import { ECharts } from "echarts/types/dist/echarts";
import { fakeCoords, fakeForecast } from "../test/Fake";
import axios from "axios";
import ILocation from "../model/LocationInterface";

const App = () => {
    const [countryInfo, setCountryInfo] = useState<ICountryInfo>()
    const [forecast, setforecast] = useState<WeatherInterface>()
    const [tempChart, setTempChart] = useState<ECharts>()
    const [selectedIdx, setSelectedIdx] = useState<string>('');
    const [usrAPIKey, setUsrAPIKey] = useState<string>('');
    const cityRef = useRef<HTMLInputElement>(null)
    const keyRef = useRef<HTMLInputElement>(null)

    const getDefaultLocation = async ():Promise<ILocation> => {
        let obj:ILocation = {
            lat: undefined,
            lon: undefined,
            city: undefined,
            countryName: undefined
        }
        const url = 'https://geolocation-db.com/json/344ec440-6bfc-11eb-a0c0-b5dee9e67313';
        await axios.get(url)
                .then(res => {
                    obj.lat = res.data.latitude,
                    obj.lon = res.data.longitude,
                    obj.city = res.data.city,
                    obj.countryName = res.data.country_name
                })
                .catch(err => {
                    console.log(err)
                })
        return obj
    }

    const getDefaultForecast = async() => {
        const locationInfo= await getDefaultLocation()
        getForecast(undefined, locationInfo)
    }

    const getForecast = async (coords?:string|undefined, location?:ILocation) => {
        const inputCity = cityRef.current?.value
        let lat, lon, city, countryName

        if (coords !== undefined) [lat, lon] = coords.split(',')
        if (inputCity !== undefined && inputCity !== '') {
            let locationInfo
            if (usrAPIKey !== '') 
                locationInfo = await getCountryInfo(inputCity, usrAPIKey)
            else 
                locationInfo = await getCountryInfo(inputCity)

            lat = locationInfo?.lat
            lon = locationInfo?.lon
            city = locationInfo?.city
            countryName = locationInfo?.countryName
        } else {
            lat = location?.lat
            lon = location?.lon
            city = location?.city
            countryName = location?.countryName
        }

        if (!lat || !lon || !city || !countryName) {
            alert('City info not found!')
            forecast === undefined ? getFakeForecast() : ''
            return undefined
        }

        let sforecast
        if (usrAPIKey !== '')
            sforecast = await getCountryForecast(lat, lon, usrAPIKey)
        else 
            sforecast = await getCountryForecast(lat, lon)
        const info = {
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            name: city,
            countryName: countryName
        }
        setCountryInfo(info)
        setforecast(sforecast)
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
        if (forecast === undefined || countryInfo === undefined) {
            if (process.env.NODE_ENV === 'production') return (<div style={{fontSize:"36px",color:'red',textAlign:'center'}}>Please key-in your API key</div>)
            return (<div>Location info not found!</div>)
        }
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
    
    
    /**
     * if your want to get user location correctly, please use this function
     */
    /* const getUserLocation = (position:GeolocationPosition) => {
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
    } */
    

    const setTheUsrAPIKey = (e:React.ChangeEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value
        if (val.length === 32) {
            setUsrAPIKey(e.currentTarget.value)
        }
    }
    useEffect(() => {
        if (usrAPIKey !== '' && process.env.NODE_ENV === 'production' && forecast === undefined) getDefaultForecast()
    }, [usrAPIKey])

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
            /**
             * get location from geolocation-db.com without permission()
             * if request error net::ERR_BLOCKED_BY_CLIENT at localhost occur
             * please disable your Adblock 
             */
            if (process.env.NODE_ENV === 'development') getDefaultForecast()
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

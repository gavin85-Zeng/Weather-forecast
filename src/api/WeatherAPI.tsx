import axios from "axios"
import { ILocationInfo } from "../model/WeatherInterface"
import { Country } from "../Util"

const ENV_API_KEY = process.env.WEATHER_API_KEY !== undefined ? process.env.WEATHER_API_KEY : ''
const API_URL = 'https://api.openweathermap.org/'
const GEO_URL = 'geo/1.0/direct?'
const GEO_PARAM = `q=?loc&limit=1&appid=?apikey`
const GEO_REVSERSE_URL = 'geo/1.0/reverse?'
const GEO_REVSERSE_PARAM = `lat=?lat&lon=?lon&limit=1&appid=?apikey`
const WEAHTER_URL = 'data/2.5/onecall?'
const WEATHER_PARAM = `lat=?lat&lon=?lon&appid=?apikey&units=metric`

export const getCountryInfo = async (loc:string, key?:string): Promise<ILocationInfo> => {
    const KEY = key !== undefined && key !== '' ?  key : ENV_API_KEY;
    const url = `${API_URL}${GEO_URL}${GEO_PARAM.replace('?loc', loc).replace('?apikey', KEY)}`
    
    const obj: ILocationInfo = {
        lat: "",
        lon: "",
        name: "",
        countryName: ""
    }

    await axios.get(url)
                .then(res => {
                    const data = res.data
                    const country = data[0].country
                    const countryName = country === undefined ? 'undefined' : Country.getCountryName(country)
                    obj.lat = data[0].lat,
                    obj.lon = data[0].lon,
                    obj.name = data[0].name,
                    obj.countryName = countryName
                })
                .catch((err) => { 
                    console.error(err)
                })

    return obj;
    
}

export const getCountryForecast = async (lat:string, lon:string, key?:string) => {
    let KEY = key !== undefined && key !== '' ? key : ENV_API_KEY
    const url = `${API_URL}${WEAHTER_URL}${WEATHER_PARAM.replace('?lat', lat).replace('?lon', lon).replace('?apikey', KEY)}`
    return await axios.get(url)
            .then(res => {
                return res.data
            }).catch((err) => { 
                console.error(err) 
                return undefined
            })
}


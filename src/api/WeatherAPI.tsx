import axios from "axios"
import { Country } from "../Util"

const API_KEY = process.env.WEATHER_API_KEY
const API_URL = 'http://api.openweathermap.org/'
const GEO_URL = 'geo/1.0/direct?'
const GEO_PARAM = `q=loc&limit=1&appid=${API_KEY}`
const GEO_REVSERSE_URL = 'geo/1.0/reverse?'
const GEO_REVSERSE_PARAM = `lat=?lat&lon=?lon&limit=1&appid=${API_KEY}`
const WEAHTER_URL = 'data/2.5/onecall?'
const WEATHER_PARAM = `lat=?lat&lon=?lon&appid=${API_KEY}`

export const getCountryInfo = async (type:string, loc:string) => {
    const info:(string|undefined)[] = []
    let url = ''

    switch (type) {
        case 'UserInput':
            url = `${API_URL}${GEO_URL}${GEO_PARAM.replace('loc', loc)}`
            break
        case 'Default':
            const [lat, lon] = loc.split(',')
            url = `${API_URL}${GEO_REVSERSE_URL}${GEO_REVSERSE_PARAM.replace('?lat', lat).replace('?lon', lon)}`
            break
        default:
            url = `${API_URL}${GEO_REVSERSE_URL}${GEO_REVSERSE_PARAM.replace('?lat', lat).replace('?lon', lon)}`
            break
    }
    
    await axios.get(url)
        .then(res => {
            const data = res.data
            info.push(data[0]?.lat)
            info.push(data[0]?.lon)
            info.push(data[0]?.name)
            const country = data[0]?.country
            const countryName = country === undefined ? undefined : Country.getCountryName(country)
            
            info.push(countryName)
        })
        .catch((err) => { 
            console.error(err)
        })
    return info
}

export const getCountryForecast = async (lat:string, lon:string) => {
    const url = `${API_URL}${WEAHTER_URL}${WEATHER_PARAM.replace('?lat', lat).replace('?lon', lon)}`
    return await axios.get(url)
            .then(res => {
                return res.data
            }).catch((err) => { 
                console.error(err) 
                return undefined
            })
}

export const get4DayHourly = async(lat:string, lon:string) => {

}
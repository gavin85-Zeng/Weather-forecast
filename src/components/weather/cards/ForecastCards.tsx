import React, { CSSProperties } from "react"
import WeatherInterface, { CountryInfo, DailyEntity } from "../../../model/WeatherInterface"
import Symbol from "../../../character/Symbol"
import { kelvinToCelsius, longToGetDate, longToLocaleTime24, longToMonthStr, longToMonthWithDate } from "../../../Util"

export const DailyWeahterCard = (props: {dataObj: DailyEntity | undefined, index:number}) => {
    let date, icon, humidity
    
    if (props.dataObj !== undefined) {
        date = props.index !== 0 ? `${longToMonthStr(props.dataObj.dt)} ${longToGetDate(props.dataObj.dt)}` : 'Today'
        icon = `http://openweathermap.org/img/wn/${props.dataObj.weather[0].icon}@2x.png`
        humidity = props.dataObj.humidity
    }

    return (
        <div className='daily-card-box '>
            <div><span>{date}</span></div>
            <div><img src={icon} alt='weather icon' /></div>
            <div><span>Humidity</span></div>
            <div><span>{humidity}{Symbol.getPercent}</span></div> 
        </div>
    )
}

const SubBoxItems = (props:{title:string, text:string|number|undefined}) => {
    return (
        // <div className='flex-space-between'>
        //     <span className='subtitle'>{props.title}</span>
        //     <span className='sub-info-text'>{props.text}</span>
        // </div>
        <>
            <dt>{props.title}</dt>
            <dd>{props.text}</dd>
        </>
    )
}

const SubBox = (props: {dataObj: WeatherInterface | undefined}) => {
    let feelLike, humidity, windSpeed, sunrise, sunSet, pressure, uvi, visibility
    if (props.dataObj !== undefined) {
        const fl = props.dataObj.current.feels_like 
        feelLike = (typeof (fl) === 'number') ? kelvinToCelsius(fl) + ` ${Symbol.getC}` : kelvinToCelsius(fl.day) + ` ${Symbol.getC}`
        humidity = props.dataObj.current.humidity + ` ${Symbol.getPercent}`
        windSpeed = props.dataObj.current.wind_speed + ` ${Symbol.getMS}`
        sunrise = props.dataObj.current.sunrise !== undefined ? longToLocaleTime24(props.dataObj.current.sunrise) : ''
        sunSet = props.dataObj.current.sunset !== undefined ? longToLocaleTime24(props.dataObj.current.sunset) : ''
        pressure = props.dataObj.current.pressure + ' hPa'// units hPa
        uvi = props.dataObj.current.uvi
        visibility = props.dataObj.current.visibility + ' m'
    }
    return (
        // <div className='current-card-sub-box'>
        //     <div className='current-card-sub-box-l'>
        //         <SubBoxItems title='UV Index' text={uvi}/>
        //         <SubBoxItems title='Pressure' text={pressure}/>
        //         <SubBoxItems title='Humidity' text={humidity}/>
        //         <SubBoxItems title='Wind Speed' text={windSpeed}/>
        //     </div>
        //     <div className='current-card-sub-box-r'>
        //         <SubBoxItems title='Feels like' text={feelLike}/>
        //         <SubBoxItems title='Sunrise' text={sunrise}/>
        //         <SubBoxItems title='Sunset' text={sunSet}/>
        //         <SubBoxItems title='Wind Speed' text={windSpeed}/>
        //     </div>
            
        // </div>
        <dl className='current-card-sub-box'>
            <SubBoxItems title='UV Index' text={uvi}/>
            <SubBoxItems title='Humidity' text={humidity}/>
            <SubBoxItems title='Pressure' text={pressure}/>
            <SubBoxItems title='Wind Speed' text={windSpeed}/>
            <SubBoxItems title='Sunrise' text={sunrise}/>
            <SubBoxItems title='Sunset' text={sunSet}/>
            <SubBoxItems title='Feels like' text={feelLike}/>
            <SubBoxItems title='Visibility' text={visibility}/>
        </dl>
    )
}

const CurrentWeatherCard = (props: {dataObj: WeatherInterface | undefined, info: CountryInfo | undefined}) => {
    let date, icon, temp, max, min, weather, name, countryName

    if (props.dataObj !== undefined && props.info !== undefined) {
        date = longToMonthWithDate(props.dataObj.current.dt)
        temp = typeof props.dataObj.daily[0].temp === 'object' ? kelvinToCelsius(props.dataObj.daily[0].temp.day) : ''
        max = typeof props.dataObj.daily[0].temp === 'object' ? kelvinToCelsius(props.dataObj.daily[0].temp.max) : ''
        min = typeof props.dataObj.daily[0].temp === 'object' ? kelvinToCelsius(props.dataObj.daily[0].temp.min) : ''
        weather = props.dataObj.current.weather[0].description
        icon = `http://openweathermap.org/img/wn/${props.dataObj.current.weather[0].icon}@2x.png`
        name = props.info.name
        countryName = props.info.countryName
    }

    return (
        <div className='current-card-container'>
            <div><span className='location'>{name}, {countryName}</span></div>
            <div><span className='subtitle'>{date}</span></div>
            <div className='current-card-main-box'>
                <h2><span>{temp}</span><span className='symbol'>{Symbol.getC}</span></h2>
                <img src={icon} alt="weather icon" />
                <h3><span style={{color: '#80b3ff'}}>{min}</span> | <span style={{color: '#ff6161'}}>{max}</span></h3>
                {weather !== undefined ? <h2>{weather}</h2> : ''}
            </div>
            <SubBox dataObj={props.dataObj} />
        </div>
    )
}

export default CurrentWeatherCard
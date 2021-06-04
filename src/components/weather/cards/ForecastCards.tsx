import React, { CSSProperties, useEffect, useState } from "react"
import WeatherInterface, { ICountryInfo, ICurrent, IDailyEntity, ITemp } from "../../../model/WeatherInterface"
import Symbol from "../../../character/Symbol"
import { kelvinToCelsius, longToGetDate, longToLocaleTime24, longToMonthStr, longToMonthWithDate } from "../../../Util"

export const DailyWeahterSelector = (props: {dataObj: IDailyEntity, index:number, clickHanlder:(e:React.MouseEvent<HTMLDivElement>) => void, isSelected:boolean}) => {
    const date = `${longToMonthStr(props.dataObj.dt)} ${longToGetDate(props.dataObj.dt)}`
    const icon = `http://openweathermap.org/img/wn/${props.dataObj.weather[0].icon}@2x.png`
    const min = typeof props.dataObj.temp === 'object' ? kelvinToCelsius(props.dataObj.temp.min) : 0
    const max = typeof props.dataObj.temp === 'object' ? kelvinToCelsius(props.dataObj.temp.max) : 0
    
    /**
     *  select daily card show info not implement yet
     */

    return (
        <div id={props.index + ''} className={ props.isSelected ? 'daily-card-items daily-card-selected' : 'daily-card-items'} onClick={props.clickHanlder}>  
            <Date date={date}></Date>
            <IconBox icon={icon}/>
            <TempRange min={min} max={max}/>
        </div>
    )
}

export const DailyWeatherCard = (props:{dataObj: IDailyEntity}) => {

}

const CityTitle = (props:{name:string, countryName:string}) => {
    return <strong>{props.name}, {props.countryName}</strong>
}

const Date = (props:{date:string}) => {
    return <div>{props.date}</div>
}

const TempRange = (props:{min:number, max:number}) => {
    return <div><span style={{color: '#80b3ff'}}>{props.min}</span> | <span style={{color: '#ff6161'}}>{props.max}</span></div>
}

const TempBox = (props:{main:number, min:number, max:number}) => {
    return (
        <div className='temp-block'>
            <div className='temp'>{props.main}<span className='symbol'>{Symbol.getC}</span></div>
            <div className='temp-range'><TempRange min={props.min} max={props.max}/></div>
        </div>
    )
}

interface IconBoxType {
    icon:string;
    desc?:string;
    showDesc?: boolean;
}

const IconBox = (props:IconBoxType) => {
    const {icon, desc, showDesc = true} = props
    return (
        <div className='desc-block'>
            <div><img src={icon} alt="weather icon" /></div>
            { showDesc ? <div className='icon-desc'>{desc}</div> : '' }
        </div>
    )
}

const DetailItems = (props:{title:string, text:string|number}) => {
    return (
        <>
            <dt>{props.title}</dt>
            <dd>{props.text}</dd>
        </>
    )
}

const Details = (props: {dataObj: ICurrent | IDailyEntity}) => {
    const fl = props.dataObj.feels_like 
    const feelLike = (typeof (fl) === 'number') ? kelvinToCelsius(fl) + ` ${Symbol.getC}` : kelvinToCelsius(fl.day) + ` ${Symbol.getC}`
    const humidity = props.dataObj.humidity + ` ${Symbol.getPercent}`
    const windSpeed = props.dataObj.wind_speed + ` ${Symbol.getMS}`
    const sunrise = props.dataObj.sunrise !== undefined ? longToLocaleTime24(props.dataObj.sunrise) : ''
    const sunSet = props.dataObj.sunset !== undefined ? longToLocaleTime24(props.dataObj.sunset) : ''
    const pressure = props.dataObj.pressure + ' hPa'
    const uvi = props.dataObj.uvi
    const visibility = (props.dataObj as ICurrent)?.visibility 
    const clouds = (props.dataObj as IDailyEntity)?.clouds
    
    return (
        <details className='current-details'>
            <summary>Detail Info.</summary>
            <dl>
                <DetailItems title='UV Index' text={uvi}/>
                <DetailItems title='Sunrise' text={sunrise}/>
                <DetailItems title='Humidity' text={humidity}/>
                <DetailItems title='Sunset' text={sunSet}/>
                <DetailItems title='Pressure' text={pressure}/>
                <DetailItems title='Feels like' text={feelLike}/>
                <DetailItems title='Wind Speed' text={windSpeed}/>
                { visibility !== undefined ? <DetailItems title='Visibility' text={visibility}/> : <DetailItems title='Clouds' text={clouds}/> }
            </dl>
        </details>
    )
}

const WeatherCard = (props: {dataType:string, dataObj: WeatherInterface | IDailyEntity, dailyIndex?:number, chartClass?:string}) => {
    let type, dailyTemp
    switch (props.dataType) {
        case 'Current':
            type = (props.dataObj as WeatherInterface).current
            dailyTemp = (props.dataObj as WeatherInterface).daily[0].temp as ITemp
            break
        case 'Daily': 
            type = (props.dataObj as IDailyEntity)
            dailyTemp = (type.temp as ITemp)
            break
        default:
            type = (props.dataObj as WeatherInterface).current
            dailyTemp = (props.dataObj as WeatherInterface).daily[0].temp as ITemp
            break
    }

    let temp = 0, max = 0, min = 0
    if (dailyTemp !== undefined) {
        temp = kelvinToCelsius(dailyTemp.day)
        max = kelvinToCelsius(dailyTemp.max)
        min = kelvinToCelsius(dailyTemp.min)
    } 
    const desc = type.weather[0].description
    const icon = `http://openweathermap.org/img/wn/${type.weather[0].icon}@2x.png`

    return (
        <>
            <TempBox main={temp} min={min} max={max}/>
            <IconBox icon={icon} desc={desc}/>
            <Details dataObj={type} />
            { props.chartClass !== undefined ? <div className={props.chartClass}></div> : '' }
        </>
    )
}

const CurrentWeatherCard = (props: {dataObj: WeatherInterface, info: ICountryInfo, chartClass:string}) => {
    const date = longToMonthWithDate(props.dataObj.current.dt)
    return (
        <>
            <div>
                <CityTitle name={props.info.name} countryName={props.info.countryName}/>
                <Date date={date}/>
            </div>
            <WeatherCard dataType='Current' dataObj={props.dataObj} chartClass={props.chartClass} />
        </>
    )
}


export default CurrentWeatherCard
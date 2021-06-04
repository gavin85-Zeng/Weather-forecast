interface IWeatherComm {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: number | IFeelsLike;
    humidity: number;
    pressure: number;
    sunrise?: number;
    sunset?: number;
    temp: number | ITemp;
    uvi: number;
	weather: IWeatherEntity[] ;
    wind_deg: number;
    wind_gust: number;
    wind_speed: number;
}


export default interface IWeather {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: ICurrent;
    daily: IDailyEntity[];
    hourly: IHourlyEntity[];
}

export interface ICurrent extends IWeatherComm {
    visibility: number;
    rain?: IRain;
    snow?: ISnow;
}

export interface IWeatherEntity {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface IDailyEntity extends IWeatherComm {
    moon_phase: number;
    moonrise: number;
    moonset: number;
    pop: number;
    rain?: number;
    snow?: number;
}

export interface IFeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}
export interface ITemp {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
}

export interface IHourlyEntity extends IWeatherComm {
    pop: number;
    rain?: IRain;
    snow?: ISnow;
    visibility:number;
}

export interface IRain {
    '1h': number;
}

export interface ISnow {
    '1h': number;
}

export interface ICountryInfo {
    lat:number,
    lon:number,
    name: string,
    countryName: string
}
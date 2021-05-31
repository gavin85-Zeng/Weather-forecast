interface WeatherComm {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: number | FeelsLike;
    humidity: number;
    pressure: number;
    sunrise?: number;
    sunset?: number;
    temp: number | Temp;
    uvi: number;
	weather: WeatherEntity[] ;
    wind_deg: number;
    wind_gust: number;
    wind_speed: number;
}


export default interface Weather {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: Current;
    daily: DailyEntity[];
    hourly: HourlyEntity[];
}

export interface Current extends WeatherComm {
    visibility: number;
    rain?: Rain;
    snow?: Snow;
}

export interface WeatherEntity {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface DailyEntity extends WeatherComm {
    moon_phase: number;
    moonrise: number;
    moonset: number;
    pop: number;
    rain?: number;
    snow?: number;
}

export interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}
export interface Temp {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
}

export interface HourlyEntity extends WeatherComm {
    pop: number;
    rain?: Rain;
    snow?: Snow;
    visibility:number;
}

export interface Rain {
    '1h': number;
}

export interface Snow {
    '1h': number;
}

export interface CountryInfo {
    lat:number,
    lon:number,
    name: string,
    countryName: string
}
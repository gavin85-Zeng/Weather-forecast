import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import WeatherInterface, { ILocationInfo } from "../model/WeatherInterface";
import { getCountryForecast, getCountryInfo } from "../api/WeatherAPI";
import axios from "axios";

export interface Forecast {
    id: number,
    weather: WeatherInterface
    location: ILocationInfo
}

const initialState:Forecast[] = [];

const getWeather = async (loc: string | ILocationInfo, key?: string) => {
    
	const payload = new Promise<Forecast>( async (resolve, reject) => {
		let location: ILocationInfo;
		if (typeof loc  === 'string' ) {          
            let info = await getCountryInfo(loc, key);

			if (!info.lat || !info.lon || !info.name || !info.countryName) {
                reject('Country information not found');
                return;
			}

			location = {
                lat: info.lat,
                lon: info.lon,
                name: info.name,
                countryName: info.countryName
			}
		} else {
			location = loc;
		}

		const weather: WeatherInterface = await getCountryForecast(location.lat, location.lon, key);
        if (weather === undefined) {
            reject('getCountryForecast failed!');
            return;
        }

		const forecast: Forecast = {
			id: -1, // assign at extraReducers
			weather: weather,
			location: location
		}
		resolve(forecast);
	})

	return payload;
}

const getCountry = async () => {
    const url = 'https://geolocation-db.com/json/344ec440-6bfc-11eb-a0c0-b5dee9e67313';
	return await axios.get(url)
                    .then(res => {
                        const info: ILocationInfo = {
                            lat: res.data.latitude,
                            lon: res.data.longitude,
                            name: res.data.city,
                            countryName: res.data.country_name
                        }
                        return info;
                    })
                    .catch(err => {
                        console.log(err)
                        const emptyInfo: ILocationInfo = {
                            lat: '',
                            lon: '',
                            name: '',
                            countryName: '',
                        }
                        return emptyInfo;
                    })
}

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async ( { loc, key }: { loc: string, key?: string}) => {
	return await getWeather(loc, key);
})

export const fetchCurLocWeather = createAsyncThunk('weather/fetchCurLocWeather', async ( key: string ) => {
    const currentCountry = await getCountry();
	return await getWeather(currentCountry, key);
})

const checkId = (ids: Array<number>) => {
    let id = 0;
    while (true) {
        const index = ids.indexOf(id);
        if (index === -1) {
            break;
        }
        id++;
    }
    return id;
}

const forecastSlice = createSlice({
    name: "forecast",
    initialState,
    reducers: {
        setforecast: (state, action) => { // for test
            state.push(action.payload);
        },
        delForecast: (state, action) => {
            let stIdx = state.findIndex( (ele) => ele.id === action.payload);
            if (stIdx !== -1) state.splice(stIdx, 1);
        }
    },
    extraReducers: (builder) => {
		builder
            .addCase(fetchWeather.fulfilled, (state, action) => {
                const ids: Array<number> = [];
                state.forEach( ele => {
                    ids.push(ele.id);
                })
                const uid = checkId(ids);
                action.payload.id = uid;
                state.push(action.payload);
                console.log(action.payload);
            })
            .addCase(fetchCurLocWeather.fulfilled, (state, action) => {
                const ids: Array<number> = [];
                state.forEach( ele => {
                    ids.push(ele.id);
                })
                const uid = checkId(ids);
                action.payload.id = uid;
                state.push(action.payload);
            })
            .addCase(fetchCurLocWeather.rejected, (state, action) => {
                console.log("Fetch current location weater fail!");
            })
    }
})


export const selectForecast = (state: RootState) => state.forecast;
export const selectForecastByName = (state: RootState, name: string) =>  {
	return state.forecast.find( forecast => forecast.location.name?.toUpperCase() === name?.toUpperCase() ); // equalsIgnoreCase;
}
export const selectForecastById = (state: RootState, id: number) => {
    return state.forecast.find( forecast => forecast.id === id);
}
export const { setforecast, delForecast } = forecastSlice.actions;
export default forecastSlice.reducer;
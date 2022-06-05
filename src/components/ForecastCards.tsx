import React from "react";
import WeatherInterface, { ICurrent, IDailyEntity, ITemp } from "../model/WeatherInterface";
import Symbol from "../character/Symbol";
import { kelvinToCelsius, longToLocaleTime24 } from "../Util";
import { Forecast, selectForecast } from "../features/ForecastSlice";
import { Box, Grid, Typography } from "@mui/material";
import { TabPanel } from "./CountryTab";
import { useSelector } from "react-redux";
import { selectTabValue } from "../features/TabSlice";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import withStyles from "@mui/styles/withStyles";
import Slider from "./Slider";
import SevenDayChart from "./Chart";

export const PrimaryTypography = withStyles({
    root: {
        color: "#212121"
    }
})(Typography) as typeof Typography;

export const SecondaryTypography = withStyles({
    root: {
        color: "#757575"
    }
})(Typography) as typeof Typography;


const SummaryGrid = (props: {forecast: Forecast}) => {
    const { forecast } = props; 
    const weatherImg = `http://openweathermap.org/img/wn/${forecast.weather.current.weather[0].icon}@2x.png`
    return (
        <Grid item container direction="column" sm={8}>
            <Grid item xs>
                <SecondaryTypography component={"div"} sx={{ fontSize: 18 }}>
                    {`${forecast.location.name},${forecast.location.countryName}`}
                </SecondaryTypography>
            </Grid>
            <Grid item container xs alignItems={"center"}>
                <Grid item>
                    <img alt="weather-image" src={weatherImg} />
                </Grid>
                <Grid item xs={4}>
                    <PrimaryTypography component={"div"} sx={{ fontSize: 30 }}>
                        {Math.round(forecast.weather.current.temp as number)}
                        <sup className="sup_18_ml5">{Symbol.getC}</sup>
                    </PrimaryTypography>
                </Grid>
            </Grid>
            <Grid item xs>
                <SecondaryTypography component={"div"} sx={{ fontSize: 14 }}>
                    {forecast.weather.current.weather[0].description}
                </SecondaryTypography>
            </Grid>
        </Grid>
    )
}

const DetailGrid = (props: {forecast: Forecast}) => {
    const { forecast } = props; 
    return (
        <Grid item container xs direction="column">
            <Grid item xs>
                <SecondaryTypography component={"div"}>
                    Feels like
                    <PrimaryTypography component={"span"} sx={{ marginLeft: 2, fontSize: 18 }}>{`${Math.round(forecast.weather.current.feels_like as number)}${Symbol.getDegree}`}</PrimaryTypography>
                </SecondaryTypography>
            </Grid>
            <Grid item container xs justifyContent={"space-around"}>
                <Grid item>
                    <PrimaryTypography component={"span"} sx={{ fontSize: 20 }}>
                        <ArrowDropUpIcon sx={{ color: "#ff1a1a" }} />
                        {`${Math.round((forecast.weather.daily[0].temp as ITemp).max)}${Symbol.getDegree}`}
                    </PrimaryTypography>
                </Grid>
                <Grid item>
                    <PrimaryTypography component={"span"} sx={{ fontSize: 20 }}>
                        <ArrowDropDownIcon sx={{ color: "#4db8ff" }}/>
                        {`${Math.round((forecast.weather.daily[0].temp as ITemp).min)}${Symbol.getDegree}`}
                    </PrimaryTypography>
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item xs>
                    <SecondaryTypography component={"span"}>Wind</SecondaryTypography>
                </Grid>
                <Grid item>
                    <PrimaryTypography component={"span"}>{`${forecast.weather.current.wind_speed}${Symbol.getMS}`}</PrimaryTypography>
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item xs>
                    <SecondaryTypography component={"span"}>Humidity</SecondaryTypography>
                </Grid>
                <Grid item>
                    <PrimaryTypography component={"span"}>
                        {`${forecast.weather.current.humidity}${Symbol.getPercent}`}
                    </PrimaryTypography>
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item xs>
                    <SecondaryTypography component={"span"}>Pressure</SecondaryTypography>
                </Grid>
                <Grid item>
                    <PrimaryTypography component={"span"}>{`${forecast.weather.current.pressure}hPa`}</PrimaryTypography>
                </Grid>
            </Grid>
        </Grid>
    )
}

const Panel = (props: {forecast: Forecast, value: number}) => {
    const { forecast, value } = props;

    return (
        <TabPanel value={value} index={forecast.id}>
            <Grid item container spacing={2}>
                <Grid item xs>
                    <Box sx={{
                            p: 4,
                            borderRadius: 5,
                            backgroundColor: "#fff",
                            boxShadow: 1,
                            color: "grey.800"
                        }}
                    >
                        <Grid item container spacing={2}>
                            <Grid item xs>
                                <PrimaryTypography gutterBottom>Current Weather</PrimaryTypography>
                            </Grid>
                            <Grid item container spacing={1}>
                                <SummaryGrid forecast={forecast} />
                                <DetailGrid forecast={forecast} />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Grid item container spacing={2} direction="column">
                <Grid item xs>
                    <PrimaryTypography sx={{ fontWeight: "bold", fontSize: 18 }}>7 days Forecast</PrimaryTypography>
                </Grid>
                <Grid item xs sx={{width: "100%"}}>
                    <SevenDayChart daily={forecast.weather.daily} />
                </Grid>
                <Grid item xs sx={{width: "100%"}}>
                    <Slider daily={forecast.weather.daily} />
                </Grid>
            </Grid>
        </TabPanel>
    )
}

const Panels = () => {
    const forecasts = useSelector(selectForecast);
    const tabValue = useSelector(selectTabValue);
    return (
        <>
            {forecasts.map((ele: Forecast) => <Panel key={`forecast-panel-${ele.id}`} forecast={ele} value={tabValue} />)}
        </>
    )
}


const ForecastPanels = () => {
    return (
        <Box>
            <Panels />
        </Box>
    )
}

export default ForecastPanels;
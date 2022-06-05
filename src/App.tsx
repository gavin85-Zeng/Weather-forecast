import React, { useEffect, useState } from "react";
import ForecastPanels from "./components/ForecastCards";
import { fakeLocation, fakeWeather } from "./test/Fake";
import Search from "./components/Search";
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Container, Theme, Typography } from "@mui/material";
import { fetchCurLocWeather, Forecast, selectForecast, setforecast } from "./features/ForecastSlice";
import ApiKeyForm from "./components/ApiKeyDialog";
import { AppDispatch } from "./store";
import CountryTab from "./components/CountryTab";
import { selectApiKey } from "./features/InputState";

const Header = () => {
    let apiKeyForm: string | JSX.Element = '';
    if (isProduction())
        apiKeyForm = <ApiKeyForm />

    return (
        <Grid 
            container
            item
            justifyContent="center"
            alignItems="center"
            spacing={1.5}
        >
            <Grid item sm={5} sx={{ mt: 5 }} >
                <Search />
            </Grid>
            <Grid item sx={{ mt: 5, maxWidth: { xs: 320, sm: 480, md: 600 }}}>
                <CountryTab />
            </Grid>
            <Grid item>
                {apiKeyForm}
            </Grid>
        </Grid>
    )
}

export const isProduction = () =>  {
    return process.env.NODE_ENV === 'production';
}

const App = () => {
    const dispatch = useDispatch<AppDispatch>();
    const forecast = useSelector(selectForecast);
    const apiKey = useSelector(selectApiKey);

    useEffect(() => {
        // set default country weather 
        if (isProduction() && apiKey !== '' && forecast.length === 0) {
            dispatch(fetchCurLocWeather(apiKey));
        }
    }, [apiKey])
    
    // ==============          TEST   Block          ==============
    // ============================================================
    const [uid, setUid] = useState(0);
    const handleFakeDataClick = () => {
        let fake: Forecast = {
            id: uid,
            weather: fakeWeather,
            location: fakeLocation
        }

        let newUID = uid + 1;
        setUid(newUID);
        dispatch(setforecast(fake));

    }

    // ============================================================
    
    return (
        <>
            <div style={{ backgroundColor: "#fff" }}>
                <Container fixed>
                    <Grid item container direction={"column"} xs sx={{p: 3}}>
                        <Header />
                    </Grid>
                    { !isProduction() && <button onClick={handleFakeDataClick}>Set fake data</button>} {/*Testing layout use Fake.tsx*/}
                </Container>
            </div>
            <div>
                <Container fixed>
                    <ForecastPanels />
                </Container>
            </div>
        </>
    )
}

export default App;


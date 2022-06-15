import { Close } from "@mui/icons-material";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { delForecast, Forecast, selectForecast } from "../features/ForecastSlice";
import { selectSearchFlag, selectTabValue, setSearchFlag, setTabValue } from "../features/TabSlice";
import { AppDispatch } from "../store";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }

export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Grid container sx={{ p: 3 }} spacing={3}>
                    {children}
                </Grid>
            )}
        </div>
    );
}

const CountryTab = () => {
    const dispatch = useDispatch<AppDispatch>();
    const forecasts = useSelector(selectForecast);
    const tabValue = useSelector(selectTabValue);
    const isSearch = useSelector(selectSearchFlag);

    useEffect( ()=> {
        if (isSearch) {
            let lastForecast = forecasts[forecasts.length - 1];
            let autoSelectId = lastForecast.id;

            dispatch(setTabValue(autoSelectId));
            dispatch(setSearchFlag(false));
        }
    }, [forecasts])
    
    const removeTab = (event: React.MouseEvent<SVGSVGElement>) => {
        event.stopPropagation(); 

        let tabID = parseInt(event.currentTarget.id);
        let tabIDIdx = 0;

        // get array index position
        forecasts.filter((value, index) => {
            if (value.id === tabID) {
                tabIDIdx = index;
            }
            return value.id !== tabID;
        });

        // set move direction(L/R)
        if (tabValue === tabID) {
            if (tabIDIdx === 0 && forecasts.length > 1) {
                // setValue(forecasts[tabIDIdx + 1].id);
                dispatch(setTabValue(forecasts[tabIDIdx + 1].id));
            } else if (tabIDIdx !== 0 && forecasts.length > 1) {
                // setValue(forecasts[tabIDIdx - 1].id);
                dispatch(setTabValue(forecasts[tabIDIdx - 1].id));
            }
        }

        dispatch(delForecast(tabID));
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        dispatch(setTabValue(newValue));
    };
    
    const tabItems = forecasts.map( (ele: Forecast) => {
        return <Tab 
                    key={`tab-item-${ele.id}`}
                    value={ele.id}
                    label={`${ele.location.name},${ele.location.countryName}`}
                    icon={<Close id={'' + ele.id} onClick={removeTab} />}
                    iconPosition="end"
                />
    });
    
    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={tabValue}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                { tabItems }
            </Tabs>
        </Box>
    )
};

export default CountryTab;
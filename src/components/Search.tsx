import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from "@mui/material/InputBase";
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, selectForecastByName } from "../features/ForecastSlice";
import { AppDispatch, RootState } from "../store";
import { isProduction } from "../App";
import { selectApiKey } from "../features/InputState";
import { setSearchFlag } from "../features/TabSlice";

const Search = () => {

    const [value, setValue] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const usrApiKey = useSelector(selectApiKey);
    const findByName = useSelector((state: RootState) => selectForecastByName(state, value));
    
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // prevent same name request for api request limit
        if (findByName !== undefined) return;

        if (isProduction()) {
            dispatch(
                fetchWeather({
                    loc: value,
                    key: usrApiKey
                })
            )
        } else {
            dispatch(fetchWeather({loc: value}));
        }
        dispatch(setSearchFlag(true));
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return (
        <Paper
            component="div"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center',
                width: '100%'
            }}
        >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search for location"
                    inputProps={{ 'aria-label': 'search for location' }}
                    onChange={handleChange}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={handleClick}>
                    <SearchIcon />
                </IconButton>
        </Paper>
    )
}

export default Search;
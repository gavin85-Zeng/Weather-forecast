import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectApiKey, setApiKey } from "../features/InputState";
import { AppDispatch } from "../store";

// enter api key once
export default function ApiKeyDialog() {
    const [key , setKey] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const apiKey = useSelector(selectApiKey);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKey(e.target.value);
    };

    const handleSubmit = () => {
        if (key.length !== 32) {
            alert('API key must be 32 characters');
            return;
        }
        dispatch(setApiKey(key));
    };

    return (
        <>
            <Dialog open={apiKey === ''}>
                <DialogTitle>API Key</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    This example required OpenWeatherMap API key, please enter your API key here.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="API Key"
                    fullWidth
                    variant="standard"
                    onChange={handleTextChange}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
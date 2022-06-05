import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import './index.scss'
import { store } from "./store";

render(
    <React.StrictMode>
        <Provider store={store}> 
            <App />
        </Provider>
    </React.StrictMode>,
    document.querySelector('#root')
)
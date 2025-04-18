// import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.scss';
// import bootstrap from "bootstrap";

import data from '../data/data.json';
//console.log(data);

import Main from './Main.js';
// import "../css/input.css";
// import "@themes/active/css/theme.css";

// Uncomment when ready to use components to display the weather data.
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../components/App.jsx';
import Controller from './Controller.js';

const API_KEY = process.env.API_KEY;
if (process.env.NODE_ENV === 'debug') {
    setDebugLevel(1)
}


window.c = new Controller(API_KEY);

// without this I get an error at runtime.  babel 7 and preset env.
const regeneratorRuntime = require("regenerator-runtime");


/**
 * Uncomment when ready to use components to display the weather data.
 */
const $root = document.getElementById("app-container");
const root = createRoot($root);

// Make Controller globally accessible


// Render the root React component
root.render(<App />);




// Initialize the Weather class on window load
//window.onload = () => { new Main(); }

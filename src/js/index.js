// import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.scss';
// import bootstrap from "bootstrap";

import App from './App';
// import "../css/input.css";
// import "@themes/active/css/theme.css";

// Uncomment when ready to use components to display the weather data.
// import React from 'react';
// import { createRoot } from 'react-dom/client';

// without this I get an error at runtime.  babel 7 and preset env.
const regeneratorRuntime = require("regenerator-runtime");



/**
 * Uncomment when ready to use components to display the weather data.
 *     const $root = document.getElementById("root");
     const root = createRoot($root);
     root.render(<App />);
 
 */


// Initialize the Weather class on window load
window.onload = () => { new App(); }

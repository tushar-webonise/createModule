import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import allRoutes from './src/js/index-route';
import 'sungard-ui-toolkit/dist/sungard-ui-toolkit.min.css';
import 'sungard-ui-toolkit/dist/sungard-ui-toolkit.min.js';
import './src/sass/tEMPMODULApp.sass';
ReactDOM.render(allRoutes, document.getElementById('container'));

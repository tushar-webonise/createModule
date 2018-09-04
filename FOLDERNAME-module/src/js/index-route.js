import React from 'react';
import {HashRouter} from 'react-router-dom';
import tEMPMODULRoutes from 'routes/tEMPMODUL-routes';
import {renderRoutes} from 'react-router-config';

export default <HashRouter>{renderRoutes(tEMPMODULRoutes)}</HashRouter>;

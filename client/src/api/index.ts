import axios from 'axios';

import { config } from '@config/index';

const api = axios.create( {
    withCredentials: true,
    baseURL: config.apiUrl
} );

api.interceptors.request.use( ( config ) => {
    config.headers.Authorization = `Bearer ${ localStorage.getItem( 'token' ) }`;

    return config;
} );

export default api;

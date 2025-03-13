import { createContext, useReducer } from 'react';
import { MAP_SET_TYPE } from './Constants';

const initialState = { 
    categoryList: {loading: true},
    appointment: {
    doctorName: 'Book Now'
    },
};
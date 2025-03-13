import { createContext, useReducer } from 'react';
import { MAP_SET_TYPE } from './Constants';

export const Map = createContext();

const initialState = {
  map: {
    mapOnClick: 'Map',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case MAP_SET_TYPE:
      return {
        ...state,
        map: {
          ...state.map,
          mapOnClick: action.payload,
        },
      };
    default:
      return state;
  }
}

export function MapProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Map.Provider value={{ state, dispatch }}>
      {props.children}
    </Map.Provider>
  );
}

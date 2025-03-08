import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { MapProvider } from './Map';

const rootElement = document.getElementById("root");

ReactDOM.render(
  <MapProvider>
    <App />
  </MapProvider>,
  rootElement
);

if (rootElement) {
  ReactDOM.render(<App />, rootElement);
} else {
  console.error("Root element not found!");
}

reportWebVitals();

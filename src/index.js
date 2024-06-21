import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { CartProvider } from "./utils/CartContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
        <Provider store={store}>
          <CartProvider>
              <App />         
          </CartProvider>
        
    </Provider>
    
   
  </React.StrictMode>
);


reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, } from 'react-router-dom';
// import Routess from './Navigation/Routes';
// import reportWebVitals from './reportWebVitals';


const theme = createTheme({
  // typography: {
  //   fontFamily: [
  //     "SanFranciscoText",
  //     "sans-serif"
  //   ].join(",")
  // },
  // button: {
  //   fontFamily: [
  //     "SanFranciscoText",
  //     "sans-serif"
  //   ].join(",")
  // }
  // ,
  palette: {
    primary: {
       main: "#ebff00" // This is an orange looking color
              },
    secondary: {
       main: "#000000" //Another orange-ish color
               }
          },


});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>



);



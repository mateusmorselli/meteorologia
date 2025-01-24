import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { theme } from "./styles/Theme";
import CurrentWeather from "./components/CurrentWeather";
import WeatherForecast from "./components/WeatherForecast";

const currentWeatherData = {
  location: 'São Paulo',
  temperature: 52,
};

const forecastData = [
  { date: '25/01', minTemp: '32', maxTemp: '52'},
  { date: '26/01', minTemp: '31', maxTemp: '54'},
  { date: '27/01', minTemp: '34', maxTemp: '55'},
  { date: '28/01', minTemp: '36', maxTemp: '56'},
  { date: '29/01', minTemp: '32', maxTemp: '57'},
  { date: '30/01', minTemp: '31', maxTemp: '58'},
  { date: '31/01', minTemp: '37', maxTemp: '51'},
  { date: '01/02', minTemp: '36', maxTemp: '53'},
  { date: '02/02', minTemp: '30', maxTemp: '54'},
  { date: '03/02', minTemp: '29', maxTemp: '57'},
];

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
      <CurrentWeather 
        location={currentWeatherData.location}
        temperature={currentWeatherData.temperature}
      />
      <WeatherForecast forecast={forecastData} />
    </div>
  </ThemeProvider>
);

export default App;
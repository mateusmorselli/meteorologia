import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { theme } from "./styles/Theme";
import CurrentWeather from "./components/CurrentWeather";
import WeatherForecast from "./components/WeatherForecast";

const App = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Aqui serão definidas a chave e a cidade da API
  const API_KEY = "16c58eeb6fa569dd6eb794c06901dd70";
  const [city, setCity] = useState("Brasília");
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => { //temperatura atual
      try {
        const currentWeatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        const currentWeatherJson = await currentWeatherResponse.json();
        setCurrentWeatherData({
          location: currentWeatherJson.name,
          temperature: (currentWeatherJson.main.temp - 273.15).toFixed(1),
        });

        //previsáo do tempo
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
        );
        const forecastJson = await forecastResponse.json();

        // filtros 
        const dailyForecast = forecastJson.list
          .filter((reading) => reading.dt_txt.includes("12:00:00"))
          .slice(0, 5)
          .map((forecast) => ({
            date: forecast.dt_txt.split(' ')[0],
            minTemp: (forecast.main.temp_min - 273.15).toFixed(1),
            maxTemp: (forecast.main.temp_max - 273.15).toFixed(1),
          }));

          setForecastData(dailyForecast);
    } catch(error) {
      console.error("Erro ao buscar dados da API", error);
    } finally {
      setLoading(false);
    }
    };

    fetchWeatherData();

  }, [city]);

  const handleCityChange = () => {
    if (userInput.trim() !== "") {
      setCity(userInput.trim());
    }
  };

  if(loading) {
    return <div>Carregando dados...</div>
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Digite o nome da cidade"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              marginRight: "10px",
              backgroundColor: "#fff",
              color: "black",
            }}
          />
          <button
            onClick={handleCityChange}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Buscar
          </button>
        </div>
        {currentWeatherData && (
          <CurrentWeather
            location={currentWeatherData.location}
            temperature={currentWeatherData.temperature}
          />
        )}
        {forecastData.length > 0 && <WeatherForecast forecast={forecastData} />}
      </div>
    </ThemeProvider>
  );
};

export default App;
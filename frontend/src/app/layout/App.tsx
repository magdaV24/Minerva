import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";
import Home from "../../pages/home/Home";
import Register from "../../pages/home/Register";
import ThemeButton from "./ThemeButton";
import { darkTheme, lightTheme } from "./Themes";
import UserPage from "../../pages/user/UserPage";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const light = createTheme(lightTheme);
  const dark = createTheme(darkTheme);

  const url1 = "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  const url2 = "https://images.pexels.com/photos/11216257/pexels-photo-11216257.jpeg?auto=compress&cs=tinysrgb&w=600"
  const url = darkMode ? url1 : url2; 
  const theme = darkMode ? dark : light;

  function handleToggleTheme(){
    setDarkMode(prev => !prev)
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register url={url}/>} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </BrowserRouter>
        <ThemeButton handleToggleTheme={handleToggleTheme}/>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;

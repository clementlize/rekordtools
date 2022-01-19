import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from 'react';
import { defaultTheme } from "./config/theme";
import Home from './home/Home';


export function App() {

    return (

        <ThemeProvider theme={defaultTheme}>

            <CssBaseline />

            <React.StrictMode>

                <Home />

            </React.StrictMode>

        </ThemeProvider>
    );
}
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import 'typeface-roboto';
import { defaultTheme } from './config/theme';
import Home from './Home/Home';


export function App() {

    window.Main.on("response", (data: string) => {

        console.log(data);
    })

    return (
        <ThemeProvider theme={defaultTheme}>

            <CssBaseline />

            <Box height={1}>

                <Home />

            </Box>

        </ThemeProvider>
    )
}
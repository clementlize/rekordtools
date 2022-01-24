import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import 'typeface-roboto';
import { Greetings } from './components/Greetings';
import { defaultTheme } from './config/theme';
import { GlobalStyle } from './styles/GlobalStyle';


export function App() {

    window.Main.on("response", (data: string) => {

        console.log(data);
    })

    return (
        <ThemeProvider theme={defaultTheme}>

            <CssBaseline />

            <GlobalStyle />
            <Greetings />

            <Box height={1}>

                <Typography variant="h3">Welcome to rekordtools.</Typography>

            </Box>

        </ThemeProvider>
    )
}
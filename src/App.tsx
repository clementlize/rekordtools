
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { defaultTheme } from './config/theme'
import Home from './home/Home'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Home />
    </ThemeProvider>
  )
}
import React from 'react'
import Players from './components/Players/Players';
import ColorContextProvider from './components/ColorContextProvider'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import 'fontsource-roboto'
import CssBaseline from "@material-ui/core/CssBaseline";
import { FirebaseDatabaseProvider } from '@react-firebase/database'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: 100,
      textAlign: 'center',
      fontFamily: 'Times New Roman, serif',
    }
  },
  palette: {
    type: "dark"
  }
})

function App(){
  return (
    <ThemeProvider theme = {theme}>
    <Container>
      <CssBaseline />
        <ColorContextProvider>
          <Typography variant="h1">Game Lobby</Typography>
          <Players/>
        </ColorContextProvider>
    </Container>
    </ThemeProvider>
  );
}

export default App;

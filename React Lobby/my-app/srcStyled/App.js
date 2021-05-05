import React from 'react'
import Players from './components/players';
import { useState } from "react"
import colorContext from './components/colorContext'
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import 'fontsource-roboto'
import CssBaseline from "@material-ui/core/CssBaseline";

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
  const [colors, setColors] = useState(
  [
    {
      value: "pink",
      label: "Pink",
      used: false
    },
    {
      value: "blue",
      label: "Blue",
      used: false
    },
    {
      value: "green",
      label: "Green",
      used: false
    },
    {
      value: "coral",
      label: "Orange",
      used: false
    },
    {
      value: "black",
      label: "Black",
      used: false
    },
  ],
  );

  const [options, setOptions] = useState(colors.filter(colors => colors.used === false));

  const flipUsed = (color) =>
  {
      for(var i = 0; i < colors.length; i++)
      {
        if(colors[i].value == color)
        {
          var newColors = colors;
          newColors[i].used = !newColors[i].used
          console.log("setColors", newColors[i].value)
          setColors(newColors)
        }
      }
    }

  return (
    <ThemeProvider theme = {theme}>
    <Container>
      <CssBaseline />
        <colorContext.Provider value={{colors: colors, flipUsed: flipUsed, options: options, setOptions: setOptions}}>
          <Typography variant="h1">Game Lobby</Typography>
          <Players/>
        </colorContext.Provider>
    </Container>
    </ThemeProvider>
  );
}

export default App;

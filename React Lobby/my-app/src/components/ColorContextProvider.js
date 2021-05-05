import React from "react";
import { useState } from "react";

export const colorContext = React.createContext();

const ColorContextProvider = ({children}) => {
  const [colors, setColors] = useState([
    {
      value: "pink",
      label: "Pink",
      used: false,
    },
    {
      value: "blue",
      label: "Blue",
      used: false,
    },
    {
      value: "green",
      label: "Green",
      used: false,
    },
    {
      value: "coral",
      label: "Orange",
      used: false,
    },
    {
      value: "black",
      label: "Black",
      used: false,
    },
  ]);

  const [options, setOptions] = useState(
    colors.filter((colors) => colors.used === false)
  );

  const flipUsed = (color, used) => {
    for (let i = 0; i < colors.length; i++) {
      if (colors[i].value == color) {
        let newColors = colors;
        newColors[i].used = used;
        //console.log("setColors", newColors[i].value);
        setColors(newColors);
      }
    }
  };
  
	return (
		<colorContext.Provider value = {{colors: colors, flipUsed: flipUsed, options: options, setOptions: setOptions}}>
			{children}
		</colorContext.Provider>
	);
};

export default ColorContextProvider;
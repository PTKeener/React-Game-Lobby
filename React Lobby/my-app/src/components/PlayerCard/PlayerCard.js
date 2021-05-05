import React, { useContext } from "react";
import Select from "react-select";
import { useState } from "react";
import { colorContext } from "../ColorContextProvider";
import stylesImport from "./PlayerCard.module.css";
import firebase, { db, auth , storage } from "../../firebaseImport";
import Grid from "@material-ui/core/Grid";
import ModalLogin from "../ModalLogin/ModalLogin";
import Auth, { User, logOut, setSetUser } from "../Auth/Auth";
import Button from "@material-ui/core/Button";
import UserPic from "../UserPic/UserPic";

import Container from "@material-ui/core/Container";

const PlayerCard = ({ id }) => {
  const context = useContext(colorContext);

  const [oldColor, setOldColor] = useState(null);
  const [color, setColor] = useState("grey");

  const styles = {
    root: {
      textAlign: "left",
      width: "300px",
      height: "250px",
      margin: "40px auto",
      padding: "20px",
      border: "1px solid",
      backgroundColor: color,
    },
    button: {
      margin: "8px 0",
    },
    img: {
      height: "40px",
      width: "40px"
    }
  };
  const colorStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? `light${color}` : color,
        color: isFocused ? "black" : "white",
      };
    },
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
  };
  
  const handleChange = (inputValue) => {
    selectChange(inputValue.value);
  }

  const selectChange = (value) => {
    if(value == "grey" || context.colors.find(element => element.value == value).used == true){
      value = "grey";
    }

    //console.log(oldColor);
    if (oldColor != null) {
      context.flipUsed(oldColor, false);
      //oldColor.used = false;
    }
    context.flipUsed(value, true);
    //inputValue.used = true;

    setColor(value);
    setOldColor(value);
    context.setOptions(
      context.colors.filter((colors) => colors.used === false)
    );
    
    console.log(user);
    if(user)
    {
      const makeNewDb = firebase.functions().httpsCallable("makeNewDb");
      makeNewDb({id: user.uid, color: value})
    }
  }

  const [user, setUser] = useState(null);

  const resetColor = () => {
    if (oldColor != null) {
      context.flipUsed(oldColor, false);
    }
    setColor("grey");
    setOldColor(null);
    context.setOptions(
      context.colors.filter((colors) => colors.used === false)
    );
  }

  const [image, setImage] = useState(null);

  const updatePic = () => {
    const axios = require("axios");
    axios.get("https://us-central1-game-lobby-training.cloudfunctions.net/getUserPic", {params: {uid: user.uid}}, {
        headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"}
      }).then((response) => {
        setImage(response.data.url);
      })
  }
  
  return (
    <Container style={styles.root}>
        {user != null ? updatePic() : null}
            <Container>
              <Grid container spacing={9}>
                <Grid item md={6}>
                  {user == null ? (
                    <p id={`nameTag${id}`}>P{id}</p>
                  ) : (
                    <p id={`nameTag${id}`}>{user.email}</p>
                  )}
                </Grid>
                <Grid item md={6}>
                  {user != null ? (
                    <UserPic setUser={setUser} resetColor={resetColor} user={user} setURL={setImage} />
                  ) : (
                    <ModalLogin setUser={setUser} selectChange={selectChange} resetColor={resetColor} />
                  )}
                </Grid>
              </Grid>
              {user != null 
              ? <img src={`${image}?${Math.random()}`} key={id} style={styles.img}></img>
              : null
              }
              <hr />

              <Select
                id="colorSelector"
                value="select"
                options={context.options}
                styles={colorStyles}
                onChange={handleChange}
              />
            </Container>
    </Container>
  );
};

export default PlayerCard;

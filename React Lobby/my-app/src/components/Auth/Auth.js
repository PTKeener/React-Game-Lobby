import firebase, { db, auth } from "../../firebaseImport";

let submitType;

const LoginSignup = (e, setUser, selectChange, resetColor) => {
  e.preventDefault();
  const email = e.target["emailInput"].value;
  const password = e.target["passwordInput"].value;
  const getColor = firebase.functions().httpsCallable("getColor");
  const makeNewDb = firebase.functions().httpsCallable("makeNewDb");

  //console.log(email);
  //console.log(password);
  if (submitType == "signup") {
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      e.target.reset();
      setUser(cred.user);
      selectChange("grey");

      makeNewDb({id: cred.user.uid, color: "grey"})
    });
  } else {
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      e.target.reset();
      setUser(cred.user);
      resetColor();

      console.log(cred.user.uid);

      const axios = require("axios");
      axios.get("https://us-central1-game-lobby-training.cloudfunctions.net/getColor", {params: {uid: cred.user.uid}}, {
        headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"}
      }).then((response) => {
        selectChange(response.data.color);
      })
    });
  }
};

const logOut = (setUser, resetColor) => {
  auth.signOut().then(console.log("Signed out"));
  setUser(null);
  resetColor();
};

const setSubmitLogin = () => {
  submitType = "login";
};

const setSubmitSignup = () => {
  submitType = "signup";
};

export {
  setSubmitLogin,
  setSubmitSignup,
  logOut,
  LoginSignup,
};

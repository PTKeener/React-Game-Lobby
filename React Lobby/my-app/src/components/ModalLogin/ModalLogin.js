import Modal from "@material-ui/core/Modal";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {
  setSubmitLogin,
  setSubmitSignup,
  LoginSignup,
} from "../Auth/Auth";

const ModalLogin = ({ setUser, selectChange, resetColor }) => {
  const [openLogin, setOpenLogin] = useState(false);
  const styles = {
    button: {
      margin: "8px 0",
    },
    loginForm: {
      margin: "0 auto",
      height: "200px",
      width: "350px",
      textAlign: "center",
      marginTop: "10%",
      backgroundColor: "white",
      color: "black",
      border: "1px solid",
      opacity: "90%",
    },
    inputField: {
      marginBottom: "10px",
    },
  };

  const handleClose = () => {
    setOpenLogin(false);
  };
  const handleOpen = () => {
    setOpenLogin(true);
  };

  const onSubmit = (e) => {
    LoginSignup(e, setUser, selectChange, resetColor);
  }

  return (
    <div>
      <Button
        style={styles.button}
        variant="contained"
        size="small"
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal open={openLogin} onClose={handleClose} id="loginModal">
        <div>
          <Container style={styles.loginForm}>
            <h1>Login</h1>
            <form id="loginForm" onSubmit={onSubmit}>
              <div style={styles.inputField}>
                <label>Email Address: </label>
                <input
                  type="email"
                  id="emailInput"
                  placeholder="Email"
                  required
                />
                <br />
              </div>
              <div style={styles.inputField}>
                <label>Password: </label>
                <input
                  type="password"
                  id="passwordInput"
                  placeholder="Password"
                  required
                />
              </div>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <Button
                    id="loginButton"
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      setSubmitLogin();
                    }}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item md={6}>
                  <Button
                    id="signupButton"
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      setSubmitSignup();
                    }}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </div>
      </Modal>
    </div>
  );
};

export default ModalLogin;

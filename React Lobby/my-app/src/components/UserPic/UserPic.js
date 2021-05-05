import firebase, { db, auth, storage } from "../../firebaseImport";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Auth, { User, logOut, setSetUser } from "../Auth/Auth";

const UserPic = ({ setUser, resetColor, user, setURL}) => {
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
      marginTop: "15px",
    },
  };

  const [openOptions, setOpenOptions] = useState(false);
	const [image, setImage] = useState(null);

  const handleClose = () => {
    setOpenOptions(false);
  };
  const handleOpen = () => {
    setOpenOptions(true);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
		const uploadTask = storage.ref(`images/${user.uid}`).put(image);
		uploadTask.on("state_changed", snapshot => {}, error => {console.log(error)}, () => {
			storage.ref("images").child(user.uid).getDownloadURL().then(url => {
				console.log(url); 	
				setURL(url);});
		})
		console.log("Uploaded");
	};

  return (
    <Container>
      <Button
        style={styles.button}
        variant="contained"
        size="small"
        onClick={handleOpen}
      >
        Options
      </Button>
      <Modal open={openOptions} onClose={handleClose} id="optionsModal">
        <div>
          <Container style={styles.loginForm}>
            <h1>Options</h1>
            <Button
              style={styles.button}
              variant="contained"
              size="small"
              onClick={() => {
                logOut(setUser, resetColor);
              }}
            >
              Logout
            </Button>
            <Grid container>
              <Grid item md={6}>
                <input
                  type="file"
                  onChange={handleChange}
                  style={styles.inputField}
                />
              </Grid>
              <Grid item md={6}>
                <Button
                  style={styles.button}
                  variant="contained"
                  size="small"
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Modal>
    </Container>
  );
};

export default UserPic;

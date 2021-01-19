import React, { useState, useEffect } from "react";
import { signUpUser } from "../../Redux/actions/userActions";
import { connect } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="primary" align="center">
      {"Copyright © "}
      <Link color="primary" href="https://material-ui.com/">
        Paka-lolo V1
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = { username, password, password_confirmation };
    // password === passwordConfirmation ? setError(false) : setError(true)
    // console.log(error)
    // !error && console.log(formData, "send api call")
    if (password === password_confirmation && username.length > 3) {
      setError(false);
      submitForm(formData);
    }
    username.length < 4 && alert("Username must be at least 4 characters");
    password != password_confirmation && setError(true);
  };

  const submitForm = (formData) => {
    console.log(formData, "send api call");
    props.onSignUpUser(formData, props.history);
  };

  const handleOnChange = (e) => {
    e.preventDefault();

    switch (e.target.name) {
      case "username":
        return setUsername(e.target.value);
      case "password":
        return setPassword(e.target.value);
      case "password_confirmation":
        return setPasswordConfirmation(e.target.value);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleOnChange}
                value={username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleOnChange}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_confirmation"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                // autoComplete="current-password"
                onChange={handleOnChange}
                value={password_confirmation}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                "Passwords Must Match"
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Link href="/signin" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </form>
        <div className="loginError">
          {props.error ? `Sorry. ${props.error}, try again...` : null}
        </div>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (store) => {
  return {
    user: store.user.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpUser: (userSignUpData, history) =>
      signUpUser(userSignUpData, history, dispatch),
    // the above is for api/async calls
    // onChangeData: (newData) => dispatch(dataChangeAction(newData))   ---> this is for normal state changes, dispatch the outcome of an action creator, just to modify state
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

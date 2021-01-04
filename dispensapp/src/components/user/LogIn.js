import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import * as config from '../../config';
import { Backdrop, Fade, Modal } from '@material-ui/core';

const userBaseUrl = config.userBaseUrl(process.env.REACT_APP_API_URL);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://peacocks.ddns.net:3000">
        DispensApp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    borderStyle: 'solid',
    borderColor: '#f50057',
    borderWidth: '2px',
    outline: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  signupLink: {
    justifyContent: 'center'
  }
}));

async function loginUser(credentials) {
  return axios.post(userBaseUrl.concat('login'), {
    "email": credentials.email,
    "password": credentials.password
  }).then(
    (res) => { return res }
  ).catch(
    (err) => { console.log(err); return null }
  )
}

const LogIn = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const auth = await loginUser({
      email,
      password
    });
    if (auth) {
      return props.setAuth(auth.data);
    }
    setModalOpen(true);
  }

  return (
    <Grid container justify="center">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
        </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Indirizzo e-mail"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
          </Button>
            <Grid container className={classes.signupLink}>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="#signup" variant="body2">
                {"Non hai un account? Sign up"}
              </Link>
            </Grid>
          </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={modalOpen}
          onClose={() => { setModalOpen(false) }}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalOpen}>
            <div className={classes.modalPaper}>
              <h2 id="transition-modal-title">Credenziali errate</h2>
              <p id="transition-modal-description">Controlla email e password</p>
            </div>
          </Fade>
        </Modal>
      </Container>
    </Grid>
  );
}


export default LogIn;

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
import { Backdrop, Fade, Modal, Snackbar } from '@material-ui/core';
import axios from 'axios';
import * as config from '../../config';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';

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
    marginTop: theme.spacing(3),
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
}));

async function signUpUser(credentials) {
    console.log(credentials);
    return axios.post(userBaseUrl.concat('signup'), {
      "username": credentials.username,
      "email": credentials.email,
      "password": credentials.password
    }).then(
      (res) => { return res }
    ).catch(
      (err) => { console.log(err); return null }
    )
  }

const SignUp = (props) => {
  const classes = useStyles();

  const history = useHistory();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const signedUp = await signUpUser({
      username,
      email,
      password
    });
    if (signedUp) {
      setShowSuccessMessage(true);
      setTimeout(() => {history.push("/login")}, 2500);
      return;
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
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Username"                
                autoFocus
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Indirizzo e-mail"
                name="email"
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="#login" variant="body2">
                Hai già un account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <Snackbar open={showSuccessMessage} autoHideDuration={2000} onClose={() => { setShowSuccessMessage(false) }}>
          <Alert onClose={() => { setShowSuccessMessage(false) }} severity="success">
            Utente {username} creato
          </Alert>
      </Snackbar>
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
              <h2 id="transition-modal-title">Account esistente</h2>
              <p id="transition-modal-description">Account già esistente con e-mail <b>{email}</b></p>
              <p id="transition-modal-description"><Link href="#login" variant="body2">Login?</Link></p>
            </div>
          </Fade>
        </Modal>
    </Container>
    </Grid>
  );
}

export default SignUp;
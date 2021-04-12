import React, { useEffect, useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"

import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"

import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { useDispatch, useSelector } from "react-redux"
import { Alert } from "@material-ui/lab"
import { Box, CircularProgress } from "@material-ui/core"
import { passwordReset } from "../redux/actions/userActions"
import CreateIcon from "@material-ui/icons/Create"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
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
}))

const ForgotPasswordPage = ({ match }) => {
  const classes = useStyles()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const resetPassword = useSelector((state) => state.resetPassword)
  const { loading, error, message: resetMessage } = resetPassword

  const dispatch = useDispatch()
  useEffect(() => {}, [dispatch, message, resetMessage])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
    } else {
      dispatch(passwordReset(password, match.params.resetToken))
      setMessage("")
    }
  }

  return (
    <Grid container>
      <Link href="/userslist">
        <Button variant="outlined" underline="none">
          {" "}
          Go Back
        </Button>
      </Link>
      <Container component="main" maxWidth="xs">
        <Grid item xs={12} sm={12}>
          <Box alignContent="center" justifyContent="flex">
            <h1>Reset Password</h1>
          </Box>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <CreateIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>

            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : message ? (
              <Alert severity="error">{message}</Alert>
            ) : (
              resetMessage && <Alert severity="success">{resetMessage}</Alert>
            )}

            <form className={classes.form} noValidate onSubmit={submitHandler}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Reset Password
              </Button>
            </form>
          </div>
        </Grid>
      </Container>
    </Grid>
  )
}

export default ForgotPasswordPage

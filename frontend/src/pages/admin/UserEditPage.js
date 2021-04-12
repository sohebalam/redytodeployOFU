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
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"

import CreateIcon from "@material-ui/icons/Create"
import { getAdminDetails, userAdminEdit } from "../../redux/actions/userActions"
import { USER_ADMIN_RESET } from "../../redux/constants/userConstants"

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

const UserEditPage = ({ match, history }) => {
  const userId = match.params.id
  const classes = useStyles()

  const [email, setEmail] = useState("")

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)

  const { loading, error, user } = userDetails

  // const userLogin = useSelector((state) => state.userLogin)

  // const { userInfo } = userLogin

  const userAdmin = useSelector((state) => state.userAdmin)

  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = userAdmin

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_ADMIN_RESET })
      history.push("/userslist")
    } else {
      if (!user?.email || user._id !== userId) {
        dispatch(getAdminDetails(userId))
      } else {
        setLastName(user.lastName)
        setFirstName(user.firstName)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, user, successUpdate, userId, history])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      userAdminEdit({ _id: userId, firstName, lastName, email, isAdmin })
    )
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
          <h1>Edit User</h1>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <CreateIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Edit
            </Typography>

            {loadingUpdate && <CircularProgress />}
            {errorUpdate && <Alert severity="error">{errorUpdate}</Alert>}

            {error && <Alert severity="error">{error}</Alert>}
            {/* {success && <Alert severity="success">Profile Updated</Alert>} */}
            {loading && <CircularProgress />}
            <form className={classes.form} noValidate onSubmit={submitHandler}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ marginLeft: "1rem" }}
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  }
                  label="Is Admin"
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update
              </Button>

              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Container>
    </Grid>
  )
}

export default UserEditPage

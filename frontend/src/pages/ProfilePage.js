import React, { useEffect, useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails, updateUserProfile } from "../redux/actions/userActions"
import { Alert } from "@material-ui/lab"
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"
import Googlelogin from "../components/Googlelogin"
import CreateIcon from "@material-ui/icons/Create"
import {
  USER_LOGIN_REQUEST,
  USER_UPDATE_RESET,
} from "../redux/constants/userConstants"
import { getMyOrders } from "../redux/actions/orderActions"

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

const ProfilePage = ({ location, history }) => {
  const classes = useStyles()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState()

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)

  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)

  const { success } = userUpdateProfile

  const myOrders = useSelector((state) => state.myOrders)
  const { loading: loadingOrders, error: errorOrders, orders } = myOrders

  useEffect(() => {
    if (!userInfo) {
      history.push("login")
    } else {
      if (!user || !user._id || success) {
        dispatch({ type: USER_UPDATE_RESET })

        dispatch(getUserDetails("profile"))
        dispatch(getMyOrders())
        history.push("/profile")
      } else {
        setEmail(user.email)
        setFirstName(user.firstName)
        setLastName(user.lastName)
      }
    }
  }, [history, userInfo, dispatch, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
    } else {
      dispatch(
        updateUserProfile({ id: user._id, firstName, lastName, password })
      )
    }
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        {" "}
        <h1>Orders</h1>{" "}
        {loadingOrders ? (
          <CircularProgress />
        ) : errorOrders ? (
          <Alert severity="error">{errorOrders}</Alert>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>DATE</TableCell>
                  <TableCell>TOTAL</TableCell>
                  <TableCell>PAID</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                    <TableCell>{order.totalPrice}</TableCell>
                    <TableCell>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <Typography>Not Paid</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Link href={`/orders/${order._id}`}>
                        <Button variant="contained" color="secondary">
                          Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </Grid>
      <Grid item xs={12} sm={4}>
        <h1>Edit Profile</h1>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CreateIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Profile
          </Typography>
          {message && <Alert severity="error">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">Profile Updated</Alert>}
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
              Update
            </Button>
            <Googlelogin />
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default ProfilePage

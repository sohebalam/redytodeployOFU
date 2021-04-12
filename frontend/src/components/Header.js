import React, { useEffect, useState } from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Button,
  Link,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import UserLoggedIn from "../components/UserLoggedIn.js"
import { Alert } from "@material-ui/lab"
import { useSelector } from "react-redux"
import logo from "../images/v3.png"
import { useLocation } from "react-router-dom"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const NavBar = () => {
  const classes = useStyles()
  return (
    <div>
      <Box component="nav" marginBottom="1rem">
        <AppBar position="static" style={{ color: "primary" }}>
          <Toolbar>
            <IconButton aria-label="menu">
              <Link href="/">
                {" "}
                {<img src={logo} height="40px" alt="logo" />}
              </Link>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              OpenFreeUni
            </Typography>

            <UserLoggedIn />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default NavBar

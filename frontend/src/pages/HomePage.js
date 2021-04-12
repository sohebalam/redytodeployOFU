import React, { useEffect, useState } from "react"

import { makeStyles } from "@material-ui/core/styles"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { Box, CircularProgress, Container, Grid, Link } from "@material-ui/core"
import ProductCard from "../components/ProductCard"
import { listProducts } from "../redux/actions/productActions"
import { Alert } from "@material-ui/lab"
import Carousel from "../components/Carousel"
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 340,
  },
  media: {
    height: "100%",
  },
  control: {
    padding: theme.spacing(2),
  },
  removeSidePadding: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
}))

export default function HomePage() {
  const userLogin = useSelector((state) => state.userLogin)
  const location = useLocation()
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const classes = useStyles()
  const [message, setMessage] = useState(userInfo?.message)
  const productList = useSelector((state) => state.productList)

  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
    setTimeout(() => {
      setMessage("")
    }, 10000)
  }, [dispatch])

  return (
    <>
      {message && (
        <Alert style={{ justifyContent: "center" }} severity="success">
          <Link href="/profile">{message}</Link>
        </Alert>
      )}
      <Carousel />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid alignItems="flex-end" container spacing={2} direction="row">
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}

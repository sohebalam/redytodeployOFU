import React, { useEffect, useState } from "react"
import Image from "material-ui-image"

import {
  Grid,
  Button,
  Link,
  Typography,
  Box,
  Card,
  List,
  CardMedia,
  makeStyles,
  CardContent,
  CardActions,
  CircularProgress,
} from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { getOrderDetails, payOrder } from "../../redux/actions/orderActions"
import axios from "axios"
import { Alert } from "@material-ui/lab"
import { PayPalButton } from "react-paypal-button-v2"
import { ORDER_PAY_RESET } from "../../redux/constants/actionTypes"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const OrderPage = ({ match, history }) => {
  const classes = useStyles()
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/config/paypal")

      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || order._id !== orderId || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [order, orderId, successPay, dispatch])

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
    order.taxPrice = addDecimals(order.taxPrice)
    order.totalPrice = addDecimals(order.totalPrice)
  }

  // useEffect(() => {
  //   if (!userInfo) {
  //     history.push("/login")
  //   }

  //   if (!order || successPay || successDeliver || order._id !== orderId) {
  //     // dispatch({ type: ORDER_PAY_RESET })
  //     // dispatch({ type: ORDER_DELIVER_RESET })
  //     dispatch(getOrderDetails(orderId))
  //   } else if (!order.isPaid) {
  //     if (!window.paypal) {
  //       addPayPalScript()
  //     } else {
  //       setSdkReady(true)
  //     }
  //   }
  // }, [dispatch, orderId, successPay, successDeliver, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  return loading ? (
    <CircularProgress />
  ) : error ? (
    <Alert severity="warning">{error}</Alert>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Grid container>
        <Grid item md={8}>
          <Card>
            <Box padding="1rem">
              <Box>
                <List>
                  <Box>
                    <strong>Name: </strong> {order.user.firstName},{" "}
                    {order.user.lastName}
                  </Box>
                  <Box>
                    <strong>Email: </strong>
                    <a href={`mailto: ${order.user.email}`}>
                      {" "}
                      {order.user.email}
                    </a>
                  </Box>
                </List>
                <Typography>
                  <strong> Address:</strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  , {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </Typography>
              </Box>
              <hr />
              <Box>
                <Typography>
                  <strong>Payment Method: </strong> {order.paymentMethod},
                </Typography>
                <Typography>
                  {order.isPaid ? (
                    <Alert severity="success">Paid on {order.paidAt}</Alert>
                  ) : (
                    <Alert severity="warning">Not Paid</Alert>
                  )}
                </Typography>
              </Box>
              <hr />
              <Box>
                <List>
                  <strong>Order Items:</strong>{" "}
                  {order.orderItems === 0 ? (
                    <Alert>Order is empty</Alert>
                  ) : (
                    <List>
                      {order.orderItems.map((item, index) => (
                        <List key={index}>
                          <Grid container item>
                            <Grid item md={1} style={{ padding: "0rem" }}>
                              <Image src={item.image} title={item.title} />
                            </Grid>
                            <Grid item style={{ padding: "0.5rem" }}>
                              <Link href={`/product/${item.product}`} />
                              {item.name}
                            </Grid>
                            <Grid item md={4} style={{ padding: "0.5rem" }}>
                              {item.qty} x £{item.price} = £
                              {item.qty * item.price}
                            </Grid>
                          </Grid>
                        </List>
                      ))}
                    </List>
                  )}{" "}
                </List>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item md={4}>
          <Card className={classes.root} style={{ marginLeft: "1rem" }}>
            <CardContent>
              <Grid container style={{ padding: "0.25rem" }}>
                <Box style={{ marginInlineStart: "2.5rem" }}>
                  <Typography
                    variant="h4"
                    component="h4"
                    color="textPrimary"
                    gutterBottom
                  >
                    Order Summary
                  </Typography>
                </Box>
                <Grid item md={6}>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    Price of Items:
                  </Typography>

                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    Tax:
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    Total:
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    £{order.itemsPrice}
                  </Typography>

                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    £{order.taxPrice}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    £{order.totalPrice}
                  </Typography>
                </Grid>
                <CardActions>
                  {!order.isPaid && (
                    <List>
                      {loadingPay && <CircularProgress />}
                      {!sdkReady ? (
                        <CircularProgress />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </List>
                  )}
                </CardActions>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default OrderPage

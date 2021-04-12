import React, { useEffect } from "react"
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
  ListItem,
} from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { createOrder } from "../../redux/actions/orderActions"
import CheckoutSteps from "../../components/CheckOutSteps"
import { Alert } from "@material-ui/lab"
// import { orderCreateReducer } from "../../reducers/orderReducer"

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

const PlaceOrderPage = ({ history }) => {
  const classes = useStyles()
  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,

        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  cart.taxPrice = addDecimals(Number((0.0 * cart.itemsPrice).toFixed(2))) //set to zero
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice)).toFixed(2)

  return (
    <>
      <Box display="flex" justifyContent="center" marginBottom="1rem">
        <CheckoutSteps step1 step2 step3 step4 />
      </Box>

      <Grid container>
        <Grid item md={8}>
          <Card>
            <Box padding="1rem">
              <Box>
                <Typography>
                  <strong> Address:</strong> {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city} ,{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </Typography>
              </Box>
              <hr />
              <Box>
                <Typography>
                  <strong>Payment Method: </strong> {cart.paymentMethod},
                </Typography>
              </Box>
              <hr />
              <Box>
                <List>
                  <strong>Order Items:</strong>{" "}
                  {cart.cartItems === 0 ? (
                    <Alert severity="danger">Your Cart is empty</Alert>
                  ) : (
                    <List>
                      {cart.cartItems.map((item) => (
                        <List key={item.product}>
                          <ListItem>
                            <Grid container item>
                              <Grid item md={2} style={{ padding: "0rem" }}>
                                <Image src={item.image} name={item.name} />
                              </Grid>
                              <Grid item md={2} style={{ padding: "2rem" }}>
                                <Link href={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </Grid>
                              <Grid item md={4} style={{ padding: "2rem" }}>
                                {item.qty} x £{item.price} = £
                                {item.qty * item.price}
                              </Grid>
                            </Grid>
                          </ListItem>
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
                    £{cart.itemsPrice}
                  </Typography>

                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    £{cart.taxPrice}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    £{cart.totalPrice}
                  </Typography>
                </Grid>
              </Grid>
              {error && <Alert severity="error">{error}</Alert>}
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default PlaceOrderPage

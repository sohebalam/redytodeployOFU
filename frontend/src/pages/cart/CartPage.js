import React, { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"

import { addToCart, removeFromCart } from "../../redux/actions/cartActions"
import {
  Grid,
  List,
  Link,
  FormControl,
  Form,
  Button,
  Card,
  Typography,
  ListItem,
  Box,
  makeStyles,
  CardContent,
  CardActions,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import Image from "material-ui-image"
import DeleteIcon from "@material-ui/icons/Delete"
import CheckoutSteps from "../../components/CheckOutSteps"

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

const CartScreen = ({ match, location, history }) => {
  const classes = useStyles()
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split("=")[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push("/login?redirect=address")
  }

  return (
    <>
      <Button variant="outlined" onClick={history.goBack}>
        Go back
      </Button>

      <Box justifyContent="center" marginBottom="1rem">
        <h1>Shopping Cart</h1>
      </Box>

      <Box display="flex" justifyContent="center" marginBottom="1rem">
        <CheckoutSteps step1 />
      </Box>

      <Grid container>
        <Grid item md={8}>
          <Card>
            <Box padding="1rem">
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
                            <Grid container>
                              <Grid item sm={2} style={{ padding: "0rem" }}>
                                <Image src={item.image} name={item.name} />
                              </Grid>
                              <Grid item sm={3} style={{ padding: "2rem" }}>
                                <Link href={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </Grid>
                              <Grid item sm={3} style={{ padding: "2rem" }}>
                                QTY:{" "}
                                <FormControl
                                  as="select"
                                  value={item.qty}
                                  onChange={(e) =>
                                    dispatch(
                                      addToCart(
                                        item.product,
                                        Number(e.target.value)
                                      )
                                    )
                                  }
                                >
                                  {[...Array(item._id).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  ))}
                                </FormControl>
                              </Grid>
                              <Grid item sm={3} style={{ padding: "2rem" }}>
                                <Button
                                  type="button"
                                  onClick={() =>
                                    removeFromCartHandler(item.product)
                                  }
                                >
                                  <DeleteIcon />
                                </Button>
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
          <Card>
            <Grid container>
              <Grid item style={{ padding: "1rem" }}>
                <Typography variant="h5" gutterBottom>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </Typography>
                <hr />
                <Typography variant="h5">
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </Typography>
              </Grid>
              <Grid item style={{ padding: "1rem" }}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default CartScreen

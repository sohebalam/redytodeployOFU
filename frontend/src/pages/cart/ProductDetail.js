import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Image from "material-ui-image"
import { makeStyles } from "@material-ui/core/styles"
import Likes from "../../components/Likes"
import { listProductDetails } from "../../redux/actions/productActions"
import { Alert } from "@material-ui/lab"

const useStyles = makeStyles({
  root: {
    height: 300,
  },
})

const ProductDetail = ({ match, history }) => {
  const dispatch = useDispatch()

  const [qty, setQty] = useState(1)

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [match, dispatch])

  const classes = useStyles()

  const addToCartHandler = () => {
    // setQty(qty + 1)
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link href="/" underline="none">
        <Button variant="outlined">Go back</Button>
      </Link>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container>
          <Grid item xs={12} sm={6} md={6}>
            <Box padding="1rem">
              <Image
                src={product.selectedFile}
                name={product.title}
                imageStyle={{ height: 400 }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
            <Box padding="1rem">
              <Typography component="h5" variant="h5">
                {product.title}
              </Typography>

              <Typography style={{ marginTop: "1rem" }}>
                <strong>Price: ${product.price}</strong>
              </Typography>
              <Typography style={{ marginTop: "1rem" }}>
                Description: {product.description}
              </Typography>
              <Typography style={{ marginTop: "1rem" }}>
                {/* Likes: <Likes product={product} /> */}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
            <Box padding="1rem">
              {" "}
              <Card className={classes.root}>
                <CardContent>
                  <Typography color="textPrimary" gutterBottom>
                    <strong>Price: ${product.price}</strong>
                  </Typography>
                  Course: MERN Beginner
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    size="medium"
                    fullWidth
                    // onClick={addToCartHandler}
                    // onSubmit={() => setQty(qty + 1)}
                    onClick={addToCartHandler}
                  >
                    Add to Card
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default ProductDetail

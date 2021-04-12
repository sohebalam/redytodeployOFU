import React, { useState, useEffect } from "react"
import {
  TextField,
  Button,
  Typography,
  Paper,
  TextareaAutosize,
  CircularProgress,
  Link,
  Container,
} from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import FileBase from "react-file-base64"
import { makeStyles } from "@material-ui/core/styles"
import { Alert } from "@material-ui/lab"
import {
  listProductDetails,
  updateProduct,
} from "../../redux/actions/productActions"
import ProductUpdateForm from "../../components/ProductUpdateForm"

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}))

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  const classes = useStyles()
  const [updateData, setUpdateData] = useState({
    title: "",
    price: "",
    tags: "",
    description: "",
    selectedFile: "",
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (successUpdate) {
      history.push("/upload")
    } else {
      if (!product.title || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setUpdateData({
          title: product.title,
          price: product.price,
          tags: product.tags,
          description: product.description,
          selectedFile: product.selectedFile,
        })
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const clear = () => {
    setUpdateData({
      title: "",
      price: "",
      tags: "",
      description: "",
      selectedFile: "",
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch(updateProduct(updateData, productId))
    clear()
    history.push("/upload")
  }

  return (
    <>
      <Link href="/upload" underline="none">
        <Button variant="outlined">Go Back</Button>
      </Link>
      <Container component="main" maxWidth="xs">
        <h1>Edit Product</h1>
        {loadingUpdate && <CircularProgress />}
        {errorUpdate && <Alert variant="danger">{errorUpdate}</Alert>}
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            setUpdateData={setUpdateData}
            updateData={updateData}
            clear={clear}
          />
        )}
      </Container>
    </>
  )
}

export default ProductEditScreen

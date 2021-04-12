import React, { useState, useEffect } from "react"
import {
  TextField,
  Button,
  Typography,
  Paper,
  TextareaAutosize,
} from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import FileBase from "react-file-base64"
import { makeStyles } from "@material-ui/core/styles"

import { createProduct } from "../redux/actions/productActions"

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

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles()
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    tags: "",
    description: "",
    selectedFile: "",
  })

  const dispatch = useDispatch()

  const clear = () => {
    setCurrentId(0)
    setProductData({
      title: "",
      price: "",
      tags: "",
      description: "",
      selectedFile: "",
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (currentId === 0) {
      dispatch(createProduct(productData))
      clear()
    }
    clear()
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={productData.title}
          onChange={(e) =>
            setProductData({ ...productData, title: e.target.value })
          }
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          value={productData.description}
          onChange={(e) =>
            setProductData({ ...productData, description: e.target.value })
          }
        />
        <TextField
          name="price"
          variant="outlined"
          label="Price"
          fullWidth
          value={productData.price}
          onChange={(e) =>
            setProductData({ ...productData, price: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={productData.tags}
          onChange={(e) =>
            setProductData({ ...productData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setProductData({ ...productData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default Form

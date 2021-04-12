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
} from "../redux/actions/productActions"

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

const ProductUpdateForm = ({
  setUpdateData,
  handleSubmit,
  updateData,
  clear,
}) => {
  const classes = useStyles()
  return (
    <>
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
            value={updateData.title}
            onChange={(e) =>
              setUpdateData({ ...updateData, title: e.target.value })
            }
          />
          <TextField
            name="description"
            variant="outlined"
            label="Description"
            fullWidth
            value={updateData.description}
            onChange={(e) =>
              setUpdateData({
                ...updateData,
                description: e.target.value,
              })
            }
          />
          <TextField
            name="price"
            variant="outlined"
            label="Price"
            fullWidth
            value={updateData.price}
            onChange={(e) =>
              setUpdateData({ ...updateData, price: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags (coma separated)"
            fullWidth
            value={updateData.tags}
            onChange={(e) =>
              setUpdateData({
                ...updateData,
                tags: e.target.value.split(","),
              })
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setUpdateData({ ...updateData, selectedFile: base64 })
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
    </>
  )
}

export default ProductUpdateForm

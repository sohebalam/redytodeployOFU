import React, { useState, useRef } from "react"
import {
  TextField,
  Button,
  Typography,
  Paper,
  TextareaAutosize,
} from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"

import { API_URL } from "../utils/constants"
import axios from "axios"
import { DropzoneArea } from "material-ui-dropzone"
import { makeStyles } from "@material-ui/core/styles"
import { createFile } from "../redux/actions/fileActions"
import { FILE_CREATE_RESET } from "../redux/constants/courseFileType"

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

const Form = (props) => {
  const classes = useStyles()
  const [currentId, setCurrentId] = useState(0)
  const [productData, setProductData] = useState({
    title: "",

    description: "",
    file: [],
  })

  const clear = () => {
    setCurrentId(0)
    setProductData({
      title: "",

      description: "",
      file: [],
    })
  }

  const dispatch = useDispatch()

  const [file, setFile] = useState(null) // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState("") // state for storing previewImage

  const [errorMsg, setErrorMsg] = useState("")
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false) // state to show preview only for images
  const dropRef = useRef() // React ref for managing the hover state of droppable area

  const onDrop = (files) => {
    const [uploadedFile] = files
    setFile(uploadedFile)

    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result)
    }
    fileReader.readAsDataURL(uploadedFile)
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/))
  }

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000"
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb"
    }
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault()

    try {
      const { title, description } = productData
      if (title.trim() !== "" && description.trim() !== "") {
        if (file) {
          const formData = new FormData()
          formData.append("file", file)
          formData.append("title", title)
          formData.append("description", description)

          setErrorMsg("")
          dispatch({ type: FILE_CREATE_RESET })
          dispatch(createFile(formData))
        } else {
          setErrorMsg("Please select a file to add.")
        }
      } else {
        setErrorMsg("Please enter all the field values.")
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data)
    }
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleOnSubmit}
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

        <div>
          <DropzoneArea
            onDrop={onDrop}
            onDragEnter={() => updateBorder("over")}
            onDragLeave={() => updateBorder("leave")}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps({ className: "drop-zone" })}

                // ref={dropRef}
              >
                <input {...getInputProps()} />
                <p>Drag and drop a file OR click here to select a file</p>
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </DropzoneArea>
          {previewSrc ? (
            isPreviewAvailable ? (
              <div className="image-preview">
                <img className="preview-image" src={previewSrc} alt="Preview" />
              </div>
            ) : (
              <div className="preview-message">
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
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

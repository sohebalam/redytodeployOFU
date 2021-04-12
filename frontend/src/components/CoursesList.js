import React, { useState, useEffect } from "react"
import {
  Typography,
  Grid,
  TableHead,
  TableCell,
  TableRow,
  Table,
  TableBody,
  Link,
  CircularProgress,
  Button,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import download from "downloadjs"
import axios from "axios"
import { API_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library, icon } from "@fortawesome/fontawesome-svg-core"
import { faFilePdf } from "@fortawesome/free-regular-svg-icons"
import { faFileImage } from "@fortawesome/free-regular-svg-icons"
import { faFileCode } from "@fortawesome/free-regular-svg-icons"
import { deleteFileCourse, getFiles } from "../redux/actions/fileActions"
import { useLocation } from "react-router"

library.add(faFilePdf, faFileImage, faFileCode)

const CoursesList = ({}) => {
  const location = useLocation()
  // const classes = useStyles()

  const [errorMsg, setErrorMsg] = useState("")

  const dispatch = useDispatch()

  const fileDelete = useSelector((state) => state.fileDelete)
  const { loading, error, success } = fileDelete

  const fileGet = useSelector((state) => state.fileGet)
  const { loading: loadingFiles, error: errorFiles, files } = fileGet

  const deleteHandler = (id) => {
    dispatch(deleteFileCourse(id))
  }

  useEffect(() => {
    dispatch(getFiles())
  }, [dispatch])

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`${API_URL}/download/${id}`, {
        responseType: "blob",
      })
      const split = path.split("/")

      const filename = split[split.length - 1]

      setErrorMsg("")
      return download(result.data, filename, mimetype)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later")
      }
    }
  }

  return (
    <Grid>
      {loadingFiles && <CircularProgress />}
      {errorFiles && <Alert severity="error">{errorFiles}</Alert>}
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Download File</TableCell>
            {location.pathname === "/coursesadmin" && (
              <TableCell>Delete</TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {files?.length > 0 ? (
            files.map(
              ({ _id, title, description, file_path, file_mimetype }) => (
                <TableRow key={_id}>
                  <TableCell>{title}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell>
                    <Link
                      href="#/"
                      onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
                      }
                    >
                      Download{" "}
                      {file_path.split(".").pop() === "pdf" ? (
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          width={400}
                          height={400}
                        />
                      ) : file_path.split(".").pop() === "json" ? (
                        <FontAwesomeIcon
                          icon={faFileCode}
                          width={400}
                          height={400}
                        />
                      ) : file_path.split(".").pop() === "jpg" ? (
                        <FontAwesomeIcon
                          icon={faFileImage}
                          width={400}
                          height={400}
                        />
                      ) : file_path.split(".").pop() === "jpeg" ? (
                        <FontAwesomeIcon
                          icon={faFileImage}
                          width={400}
                          height={400}
                        />
                      ) : file_path.split(".").pop() === "png" ? (
                        <FontAwesomeIcon
                          icon={faFileImage}
                          width={400}
                          height={400}
                        />
                      ) : (
                        <div></div>
                      )}
                    </Link>
                  </TableCell>
                  {location.pathname === "/coursesadmin" && (
                    <TableCell>
                      <Button onClick={() => deleteHandler(_id)}>Delete</Button>
                    </TableCell>
                  )}
                </TableRow>
              )
            )
          ) : (
            <TableRow>
              <TableCell style={{ fontWeight: "300" }}>
                No files found. Please add some.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Grid>
  )
}

export default CoursesList

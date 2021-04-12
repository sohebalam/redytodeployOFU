import React, { useEffect } from "react"
import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import { useDispatch, useSelector } from "react-redux"
import { Alert } from "@material-ui/lab"
import {
  Box,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"
import { listUsers, deleteUser } from "../../redux/actions/userActions"

const UsersPage = ({ history }) => {
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.result.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push("/login")
    }
  }, [dispatch, history, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>FIRSTNAME</TableCell>
              <TableCell>LASTNAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>ADMIN</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.isAdmin ? (
                    <Typography>Admin</Typography>
                  ) : (
                    <Typography>Not Admin</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Link href={`/user/${user._id}/edit`}>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginRight: "0.5rem" }}
                    >
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => deleteHandler(user._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

export default UsersPage

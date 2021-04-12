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
import { listOrders } from "../../redux/actions/orderActions"

const OrdersListPage = ({ history }) => {
  const dispatch = useDispatch()
  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo?.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push("/login")
    }
  }, [dispatch, history])

  return (
    <>
      <h1>Orders</h1>
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
              <TableCell>DATE</TableCell>
              <TableCell>TOTAL PRICE</TableCell>
              <TableCell>PAID</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.user && order.user.firstName}</TableCell>
                <TableCell>{order.user && order.user.lastName}</TableCell>
                <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                <TableCell>£{order.totalPrice}</TableCell>
                <TableCell>
                  {order.isPaid ? (
                    <Typography>{order.paidAt.substring(0, 10)}</Typography>
                  ) : (
                    <Typography>Not Paid</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Link href={`/orders/${order._id}`}>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginRight: "0.5rem" }}
                    >
                      Order Detail
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

export default OrdersListPage

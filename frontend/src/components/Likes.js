import React, { useEffect } from "react"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import DeleteIcon from "@material-ui/icons/Delete"
import { MoreHorizIcon, MoreVertIcon } from "@material-ui/icons/MoreHoriz"

import { useDispatch, useSelector } from "react-redux"
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined"
import { List, ListItem, Typography } from "@material-ui/core"

const Likes = ({ product }) => {
  // const productDetails = useSelector((state) => state.productDetails)
  // const { loading, error, products } = productDetails

  // console.log(product)

  // console.log(user.result.name)

  if (product.likes?.length > 0) {
    return product.likes.find((like) => like === like) ? (
      <>
        <List>
          <ListItem>
            <ThumbUpAltIcon fontSize="small" color="secondary" />
            &nbsp;
            <Typography color="secondary">
              {product.likes.length > 0 &&
                `${product.likes.length} like${
                  product.likes.length > 1 ? "s" : ""
                }`}
            </Typography>
          </ListItem>
        </List>
      </>
    ) : (
      <>
        <List>
          <ListItem>
            <ThumbUpAltOutlined fontSize="small" color="secondary" />
            <Typography color="secondary">
              &nbsp;{product.likes.length}{" "}
              {product.likes.length === 1 ? "Like" : "Likes"}
            </Typography>
          </ListItem>
        </List>
      </>
    )
  }
  return (
    <>
      <List>
        <ListItem>
          <ThumbUpAltOutlined fontSize="small" color="secondary" />
          <Typography color="secondary">&nbsp;Like</Typography>
        </ListItem>
      </List>
    </>
  )
}

export default Likes

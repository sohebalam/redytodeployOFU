import axios from "axios"
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_ADDRESS,
  CART_SAVE_PAYMENT,
} from "../constants/actionTypes"

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.title,
      image: data.selectedFile,
      price: data.price,

      qty,
    },
  })

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const saveAddress = (data) => async (dispatch) => {
  try {
    dispatch({ type: CART_SAVE_ADDRESS, payload: data })

    localStorage.setItem("shippingAddress", JSON.stringify(data))
  } catch (error) {
    console.log(error)
  }
}

export const savePaymentMethod = (data) => async (dispatch) => {
  try {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data })

    localStorage.setItem("paymentMethed", JSON.stringify(data))
  } catch (error) {
    console.log(error)
  }
}

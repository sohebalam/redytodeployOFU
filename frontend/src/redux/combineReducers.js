import { combineReducers } from "redux"
import { cartReducer } from "./reducers/cartReducer"
import {
  userLoginReducer,
  userRegisterReducer,
  // authReducer,
  userDetailsReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userAdminReducer,
  forgotPassowrdReducer,
  resetPasswordReducer,
} from "./reducers/userReducer"

import {
  productListReducer,
  products,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productLikeReducer,
} from "./reducers/productReducer"
import {
  myOrderReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
} from "./reducers/orderReducer"
import {
  fileDeleteReducer,
  FileGetReducer,
  filesCreateReducer,
} from "./reducers/fileReducers"

export const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrders: myOrderReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userAdmin: userAdminReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  forgotPassword: forgotPassowrdReducer,
  resetPassword: resetPasswordReducer,
  productLike: productLikeReducer,
  fileDelete: fileDeleteReducer,
  fileGet: FileGetReducer,
  fileCreate: filesCreateReducer,
})

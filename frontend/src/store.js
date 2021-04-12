// import { createStore, combineReducers, applyMiddleware } from "redux"
// import thunk from "redux-thunk"
// import { composeWithDevTools } from "redux-devtools-extension"
// import {
//   userLoginReducer,
//   userRegisterReducer,
// } from "./redux/reducers/userReducer"

// const middleware = [thunk]

// const reducer = combineReducers({
//   userLogin: userLoginReducer,
//   userRegister: userRegisterReducer,
// })

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null

// const initialState = {
//   userLogin: { userInfo: userInfoFromStorage },
// }

// const store = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// )

// export default store

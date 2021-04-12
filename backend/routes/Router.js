import express from "express"
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
} from "../controllers/orderCont.js"
import { forgotPassword, resetPassword } from "../controllers/passwordCont.js"

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  likeProduct,
  deleteProduct,
} from "../controllers/ProductCont.js"
import {
  adminUpdateUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  google,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userCont.js"
import { admin, protect } from "../middleware/authMiddelware.js"
import upload from "../utils/MulterUpload.js"
import {
  CourseFile,
  deleteCourseFile,
  downloadFileById,
  getAllFiles,
} from "../controllers/CourseCont.js"

const router = express.Router()
// import auth from "../middleware/auth.js"

router.get("/products", getProducts)
router.get("/products/:id", getProduct)
router.post("/products", protect, admin, createProduct)
router.patch("/products/:id", protect, admin, updateProduct)
router.delete("/products/:id", protect, admin, deleteProduct)
router.patch("/products/:id/likeProduct", protect, likeProduct)

//userRoutes
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/forgotpassword", forgotPassword)
router.put("/resetpassword/:resetToken", resetPassword)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.post("/google", google)
router.get("/users", protect, admin, getUsers)
router
  .route("/users/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, adminUpdateUser)

//order routes

router
  .route("/orders")
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders)
router.get("/orders/myorders", protect, getMyOrders)
router.route("/orders/:id").get(protect, getOrderById)

router.route("/orders/:id/pay").put(protect, updateOrderToPaid)
router.get("/config/paypal", (req, res) => res.send(process.env.PAYPAL))

//course router
router.post("/upload", upload.single("file"), CourseFile)

router.get("/getAllFiles", getAllFiles)

router.get("/download/:id", downloadFileById)

router.delete("/file/:id", deleteCourseFile)

export default router

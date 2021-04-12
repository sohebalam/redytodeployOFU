import Header from "./components/Header"
import { BrowserRouter, Route } from "react-router-dom"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AddressPage from "./pages/cart/AddressPage"
import PaymentPage from "./pages/cart/PaymentPage"
import PlaceOrderPage from "./pages/cart/PlaceOrderPage"
import OrderPage from "./pages/cart/OrderPage"
import ProductListPage from "./pages/admin/ProductListPage"
import Footer from "./components/Footer"
import ProductDetail from "./pages/cart/ProductDetail"
import CartPage from "./pages/cart/CartPage"
import ProfilePage from "./pages/ProfilePage"
import UsersPage from "./pages/admin/UsersPage"
import UserEditPage from "./pages/admin/UserEditPage"
import ProductEditPage from "./pages/admin/ProductEditPage"
import OrdersListPage from "./pages/admin/OrdersListPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPage from "./pages/ResetPage"
import CoursesListPage from "./pages/CoursesListPage"
import CoursesPage from "./pages/admin/CoursesPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={HomePage} />
        <Route path="/courses" exact component={CoursesListPage} />
        <Route path="/coursesadmin" exact component={CoursesPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/address" exact component={AddressPage} />
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/placeorder" exact component={PlaceOrderPage} />
        <Route path="/orders/:id" exact component={OrderPage} />
        <Route path="/payment" exact component={PaymentPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/upload" exact component={ProductListPage} />
        <Route path="/product/:id" exact component={ProductDetail} />
        <Route path="/product/:id/edit" exact component={ProductEditPage} />
        <Route path="/cart/:id?" exact component={CartPage} />
        <Route path="/userslist" exact component={UsersPage} />
        <Route path="/user/:id/edit" exact component={UserEditPage} />
        <Route path="/orderslist" exact component={OrdersListPage} />
        <Route path="/forgotpassword" exact component={ForgotPasswordPage} />
        <Route path="/resetpassword/:resetToken" exact component={ResetPage} />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App

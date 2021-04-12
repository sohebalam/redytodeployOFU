import React from "react"
import GoogleButton from "react-google-button"
import { GoogleLogin } from "react-google-login"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { googleAuth } from "../redux/actions/userActions"

const Googlelogin = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const googleSuccess = async (res) => {
    const result = res?.profileObj

    try {
      dispatch(googleAuth(result))
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = () => {
    console.log("Google Sing in unsuccessfull")
  }

  // const submitHandler = (e) => {
  //   e.preventDefault()
  //   if (password !== confirmPassword) {
  //     setMessage("Passwords do not match")
  //   } else {
  //     dispatch(register(firstName, lastName, email, password))
  //   }
  // }

  return (
    <GoogleLogin
      clientId="1040146375926-jejgtvb6posorho3h0anfm8v3vpsuc6m.apps.googleusercontent.com"
      onSuccess={googleSuccess}
      onFailure={googleFailure}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <GoogleButton
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        />
      )}
    />
  )
}

export default Googlelogin

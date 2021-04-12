import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import config from "../config.js"
import jwt from "jsonwebtoken"
// import sendEmail from "../utils/sendEmail.js"
import { sendEmail } from "../middleware/sendEmail.js"

export const forgotPassword = async (req, res) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" })
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const token = jwt.sign({ _id: user._id }, config.secret, {
      expiresIn: "30d",
    })

    user.resetToken = token
    await user.save()
    // Create reset url to email to provided email
    // const resetUrl = `${req.protocol}://${req.get(
    //   "host"
    // )}/passwordreset/${resetToken}`

    const link = `${req.protocol}://localhost:3000/resetpassword/${token}`
    // HTML Message
    const message = `

      
      <div>Click the link below to reset your password or if the link is not working, please paste it into your browser</div><br/>
      <div>${link}</div>
    `

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      })

      res.status(200).json({ message: `Email Sent to ${user.email}` })
    } catch (err) {
      console.log(err)

      user.resetToken = undefined
      // user.resetPasswordExpire = undefined

      await user.save()

      return res.status(500).json({ messsage: "Emial could not be sent" })
    }
  } catch (error) {
    console.log(error)
  }
}

export const resetPassword = async (req, res) => {
  // const { resetToken } = req.body
  const { resetToken } = req.params
  // we can pass through params aswell

  if (resetToken) {
    // token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(resetToken, config.secret)
    req.user = decoded
  }

  try {
    const user = await User.findById(req.user._id)

    if (user) {
      const salt = await bcrypt.genSalt(10)
      if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, salt)
      }
      user.resetToken = undefined
      await user.save()
      res.status(200).json({
        message: `success in updating user`,
      })
      // const token = jwt.sign(
      //   { email: updatedUser.email, id: updatedUser._id },
      //   config.secret,
      //   {
      //     expiresIn: "7d",
      //   }
      // )

      // return res.json({
      //   _id: updatedUser._id,
      //   firstName: updatedUser.firstName,
      //   lastName: updatedUser.lastName,
      //   email: updatedUser.email,

      //   token: token,
      //   message: `success in updating user ${updatedUser.firstName} ${updatedUser.lastName} `,
      // })
    }
  } catch (error) {
    res.status(500)
    throw new Error("Server Error")
  }
}

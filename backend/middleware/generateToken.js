import jwt from "jsonwebtoken"

export const generateToken = (id) => {
  return jwt.sign({ id }, "JWT_SECRET", { expiresIn: "30d" })
}

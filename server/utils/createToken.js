import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import 'dotenv/config'

dotenv.config();

const tokenCreate = (data) => {
    return (jwt.sign(data, process.env.secretKey, {
          expiresIn: "7d",
        }))
}

export default tokenCreate;
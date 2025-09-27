import jwt from "jsonwebtoken"
import config from "../config/config.js"

export const authRequired = (req, res, next) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: "Autorizacion denegada token no valido" })
    jwt.verify(token, config.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token invalidos" })
        req.user=user
        next()
    })
}
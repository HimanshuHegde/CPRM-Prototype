import { request, response } from "express";
import jwt from "jsonwebtoken";

export const authenticationToken = (req = request,res = response,next) =>{

    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.sendStatus(401)
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
} 
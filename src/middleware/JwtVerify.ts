import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default class JwtVerify{
    verify = (request: Request, response: Response, next: NextFunction) => {
        var tokenExist = request.headers["token"];

        if(!tokenExist){
            return response.status(400).json({
                statuscode: 400,
                message: "Token is required"
            });
        }

        jwt.verify(String(tokenExist), process.env.TOKEN_SECRET, function(error, decoded) {
            if(error)
            return response.status(401).json({
                statuscode: 401,
                message: "Invalid Token!"
            });
            
            console.log(decoded)    
            next()
          }); 
    }
}
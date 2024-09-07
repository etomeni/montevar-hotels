import { Request, Response, NextFunction } from "express-serve-static-core";
import Jwt  from "jsonwebtoken";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.get('Authorization');
    
        if (!authHeader) {
            const error = new Error("Not authenticated!");
            // error.statusCode = 401;
            error.message = "Not authenticated! Please login and try again.";
    
            return res.status(401).json({
                message: error.message,
                statusCode: 401,
                error
            });
        }
    
        const token = authHeader.split(' ')[1];
        let  decodedToken: any;
        try {
            const secretForToken = process.env.JWT_SECRET;

            decodedToken = Jwt.verify(token, `${secretForToken}`)
        } catch (error: any) {
            error.statusCode = 500;
            error.message = "wrong authentication token";
    
            return res.status(500).json({
                message: error.message,
                status: false,
                statusCode: error.statusCode,
                error
            });
        }
    
        if (!decodedToken) {
            return res.status(401).json({
                message: "Not authenticated! unable to verify user authtentication token.",
                status: false,
                statusCode: 401,
            });
        }
    

        req.body.middlewareParam = {
            isLoggedin: true,
            userId: decodedToken.userId,
            email: decodedToken.email,
            username: decodedToken.username,
            _id: decodedToken._id
        };
        // req.isLoggedin = true;
        // req.userId = decodedToken.userId;
        // req.email = decodedToken.email;
        // req.username = decodedToken.username;
    
        next();
    } catch (error: any) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
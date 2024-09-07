import { Request, Response, NextFunction } from "express-serve-static-core";

export const get404 = (req: Request, res: Response, next: NextFunction) => {

    return res.status(404).json({
        status: false,
        statusCode: 404, 
        message: 'Endpoint url resource Not Found.'
    });
}

export const get500 = (error: any, req:Request, res: Response, next: NextFunction) => {
    // const data = error.data;

    return res.status(error.statusCode || 500).json({
        error: {
            message: error.message,
            data: error.data
        }
    });
}

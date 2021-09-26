import { get } from "lodash";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const privateKey = process.env.TOKKEN_SECRET as string;

const validateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
    );

    if (!accessToken) return res.status(400).send({
        success: false,
        message: "No token received"
    });

    try {
        const decoded = jwt.verify(accessToken, privateKey);
        // @ts-ignore
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Invalid token"
        });
    }
};

export default validateToken;
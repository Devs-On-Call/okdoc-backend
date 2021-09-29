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
        const decoded = jwt.verify(accessToken, privateKey) as {
            _id: string, iat: number, exp: number,
        };

        if (Date.now() >= decoded.exp * 1000) return res.status(400).send({
            success: false,
            message: "Token has expired"
        });

        const patientId = get(req, "params.patientId");
        if (patientId !== decoded._id) return res.status(400).send({
            success: false,
            message: "PatientId and token don't match"
        });

        next();
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Invalid token"
        });
    }
};

export default validateToken;

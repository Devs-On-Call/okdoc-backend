import { get } from "lodash";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.utils";

const validateToken =
    (requiresPatiendId: boolean = true) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const accessToken = get(req, "headers.authorization", "").replace(
            /^Bearer\s/,
            ""
        );

        if (!accessToken)
            return res.status(400).send({
                success: false,
                message: "No token received",
            });

        const verifiedToken = verifyToken(accessToken);

        if (verifiedToken.expired)
            return res.status(400).send({
                success: false,
                message: "Token has expired",
            });

        if (!verifiedToken.valid)
            return res.status(400).send({
                success: false,
                message: "Invalid token",
            });
        if (requiresPatiendId) {
            var patientId = get(req, "params.patientId");
            if (!patientId) {
                patientId = req.body.patient;
            }
            if (patientId !== verifiedToken.decoded?._id)
                return res.status(400).send({
                    success: false,
                    message: "PatientId and token don't match",
                });
        }

        next();
    };

export default validateToken;

import { get } from "lodash";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const validatePatientId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const patientId = get(req, "params.patientId");

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return res.send({
            success: false,
            message: "Give a valid patientId",
        });
    }

    next();
};

export default validatePatientId;

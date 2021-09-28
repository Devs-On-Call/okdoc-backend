import { Request, Response } from "express";
import { get } from "lodash";
import mongoose from "mongoose";
import { findPrescriptions } from "../service/prescription.service";


export async function getPrescriptionHandler(req: Request, res: Response) {
    const patientId = get(req, "params.patientId");

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return res.send({
            success: false,
            message: "Give a valid patientId",
        });
    }

    const prescriptions = await findPrescriptions(patientId);

    if (!prescriptions) {
        return res.send({
            success: false,
            message: "Patient not found",
        });
    }

    return res.send({
        success: true,
        message: "Success",
        data: prescriptions
    })
}
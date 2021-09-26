import { Request, Response } from "express";
import { get } from "lodash";
import mongoose from "mongoose";
import { findPatient } from "../service/patient.service";


export async function getPatientHandler(req: Request, res: Response) {
    const patientId = get(req, "params.patientId");

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return res.send({
            success: false,
            message: "Give a valid patientId",
        });
    }

    const patient = await findPatient(patientId);

    if (!patient) {
        return res.send({
            success: false,
            message: "Patient not found",
        });
    }

    return res.send({
        success: true,
        message: "Success",
        data: patient
    })
}
import { Request, Response } from "express";
import { get } from "lodash";
import { findPatient } from "../service/patient.service";

export async function getPatientHandler(req: Request, res: Response) {
    const patientId = get(req, "params.patientId");
    const patient = await findPatient(patientId);

    if (!patient) {
        return res.send({
            success: false,
            message:
                "Something went wrong while searching for your information",
        });
    }

    return res.send({
        success: true,
        message: "Success",
        data: patient,
    });
}

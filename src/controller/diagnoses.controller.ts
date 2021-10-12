import { Request, Response } from "express";
import { findPatientDiagnoses } from "../service/diagnosis.service";
import { get } from "lodash";

export async function getPatientDiagnosesHandler(req: Request, res: Response) {
    const patientId = get(req, "params.patientId");
    const diagnoses = await findPatientDiagnoses(patientId);

    if (!diagnoses) {
        return res.status(404).send({
            success: false,
            message: "Something went wrong while searching for your diagnoses",
        });
    }

    return res.send({
        success: true,
        message: "Success",
        data: diagnoses,
    });
}

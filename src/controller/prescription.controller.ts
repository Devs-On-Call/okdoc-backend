import { Request, Response } from "express";
import { get } from "lodash";
import { findPrescriptions } from "../service/prescription.service";

export async function getPatientPrescriptionsHandler(req: Request, res: Response) {
    const patientId = get(req, "params.patientId");
    const prescriptions = await findPrescriptions(patientId);

    if (!prescriptions) {
        return res.status(404).send({
            success: false,
            message: "Something went wrong while searching for your prescriptions",
        });
    }

    return res.send({
        success: true,
        message: "Success",
        data: prescriptions
    });
}

import { Request, Response } from "express";
import { get } from "lodash";
import { findPatientAppointments } from "../service/appointment.service";

export async function getPatientAppointmentsHandler(
    req: Request,
    res: Response
) {
    const patientId = get(req, "params.patientId");
    const appointments = await findPatientAppointments(patientId);

    if (!appointments) {
        return res.send({
            success: false,
            message:
                "Something went wrong while searching for your appointments",
        });
    }

    return res.send({
        success: true,
        message: "Success",
        data: appointments,
    });
}

import { Request, Response } from "express";
import { get } from "lodash";
import mongoose from "mongoose";
import { findPatientAppointments } from "../service/appointment.service";


export async function getPatientAppointmentsHandler(req: Request, res: Response) {
    const patientId = get(req, "params.patientId");

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return res.send({
            success: false,
            message: "Give a valid patientId",
        });
    }

    const appointments = await findPatientAppointments(patientId);

    if (!appointments) {
        return res.send({
            success: false,
            message: "Something went wrong",
        });
    }

    return res.send({
        success: true,
        message: "Success",
        data: {
            appointments: appointments
        }
    })
}
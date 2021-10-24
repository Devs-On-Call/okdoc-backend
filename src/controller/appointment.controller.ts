import { Request, Response } from "express";
import { get } from "lodash";
import {
    addAppointment,
    findPatientAppointments,
    validTime,
} from "../service/appointment.service";
import { doctorExists } from "../service/doctors.service";
import { hospitalExists } from "../service/hospital.service";
import { appointmentExists } from "../service/appointment.service";

export async function getPatientAppointmentsHandler(
    req: Request,
    res: Response
) {
    const patientId = get(req, "params.patientId");
    const appointments = await findPatientAppointments(patientId);

    if (!appointments) {
        return res.status(404).send({
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

export async function postAppointmentHandler(req: Request, res: Response) {
    const insert = await addAppointment(req.body);
    if (!insert) {
        return res.status(400).send({
            success: false,
            message: "There was a problem adding your appointment",
        });
    }

    return res.send({
        success: true,
        message: "Your appoinment was added successfully",
    });
}

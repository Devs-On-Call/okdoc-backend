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
    const doctor = await doctorExists(req.body.doctor);
    if (!doctor || doctor.length === 0) {
        return res.status(400).send({
            success: false,
            message: "Doctor does not exist",
        });
    }
    const hospital = await hospitalExists(req.body.hospital);

    if (!hospital || hospital.length === 0) {
        return res.status(400).send({
            success: false,
            message: "Hospital does not exist",
        });
    }
    const date = new Date(req.body.date);
    if (!(date instanceof Date && !isNaN(date.getTime()))) {
        return res.status(400).send({
            success: false,
            message: "Date format incorrect",
        });
    }
    const isValidTime = await validTime(date);
    if (!isValidTime) {
        return res.status(400).send({
            success: false,
            message:
                "Booking time should be between 9:00 and 16:30 in 30 minute increments",
        });
    }
    const appointment = await appointmentExists(date, req.body.doctor);

    if (appointment && appointment.length > 0) {
        return res.status(400).send({
            success: false,
            message: "Doctor already has an appointment at that time",
        });
    }

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

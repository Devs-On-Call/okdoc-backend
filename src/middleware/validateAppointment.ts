import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import { doctorExists } from "../service/doctors.service";
import { hospitalExists } from "../service/hospital.service";
import { appointmentExists, validTime } from "../service/appointment.service";

const validateAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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

    next();
};

export default validateAppointment;

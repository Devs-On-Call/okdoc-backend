import Appointment from "../model/appointment.model";
import Doctor from "../model/doctor.model";
import Hospital from "../model/hospital.model";
import Profession from "../model/profession.model";

export async function findPatientAppointments(id: string) {
    try {
        const patient = await Appointment.find(
            { patient: id },
            "date reason doctor hospital"
        )
            .sort("date")
            .populate({
                path: "doctor",
                model: Doctor,
                populate: { path: "profession", model: Profession },
            })
            .populate({
                path: "doctor",
                model: Doctor,
                populate: { path: "hospital", model: Hospital },
            })
            .populate({ path: "hospital", model: Hospital });
        return patient;
    } catch (e: any) {
        return false;
    }
}

export async function appointmentExists(date: Date, doctorId: string) {
    try {
        const appointment = await Appointment.find(
            { date: date, doctor: doctorId },
            "_id"
        );
        return appointment;
    } catch (e: any) {
        return false;
    }
}

export async function validTime(date: Date) {
    const minutes = date.getUTCMinutes();
    const hours = date.getUTCHours();
    return hours < 17 && hours >= 9 && (minutes == 0 || minutes == 30);
}

export async function addAppointment(body: any) {
    const hospital = body.hospital;
    const patient = body.patient;
    const date = new Date(body.date);
    const doctor = body.doctor;
    const reason = body.reason;

    const object = [
        {
            hospital: hospital,
            patient: patient,
            date: date,
            doctor: doctor,
            reason: reason,
        },
    ];
    try {
        Appointment.insertMany(object);
        return true;
    } catch (e: any) {
        return false;
    }
}

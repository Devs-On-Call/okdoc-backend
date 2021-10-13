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
            }).populate({
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

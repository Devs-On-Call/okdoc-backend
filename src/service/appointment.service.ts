import Appointment from "../model/appointment.model";
import Doctor from "../model/doctor.model";
import Hospital from "../model/hospital.model";

export async function findPatientAppointments(id: string) {
    try {
        const patient = await Appointment.find({ patient: id }, 'date reason doctor hospital')
            .populate({ path: "doctor", model: Doctor })
            .populate({ path: "hospital", model: Hospital });
        return patient;
    } catch (e: any) {
        return false;
    }
}

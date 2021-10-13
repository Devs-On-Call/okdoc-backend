import Doctor from "../model/doctor.model";
import Hospital from "../model/hospital.model";
import Patient, { PatientDocument } from "../model/patient.model";
import Profession from "../model/profession.model";

export async function findPatient(id: string) {
    try {
        const patient = await Patient.findById(id)
            .populate({
                path: "familyDoctor",
                model: Doctor,
                populate: { path: "profession", model: Profession }
            })
            .populate({
                path: "familyDoctor",
                model: Doctor,
                populate: { path: "hospital", model: Hospital }
            });
        return patient;
    } catch (e: any) {
        return false;
    }
}

export async function patientExists(amka: PatientDocument["amka"]) {
    try {
        const patient = await Patient.findOne({ amka });
        return patient;
    } catch (e: any) {
        return false;
    }
}

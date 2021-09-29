import Doctor from "../model/doctor.model";
import Patient, { PatientDocument } from "../model/patient.model";

export async function findPatient(id: string) {
    try {
        const patient = await Patient.findById(id).populate({ path: "familyDoctor", model: Doctor });
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

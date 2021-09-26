import Patient, { PatientDocument } from "../model/patient.model";


export async function patientExists(amka: PatientDocument["amka"]) {
    const patient = await Patient.findOne({ amka });

    if (!patient) {
        return false;
    }

    return patient;
}
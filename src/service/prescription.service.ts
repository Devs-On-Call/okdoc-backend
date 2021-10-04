import Diagnosis from "../model/diagnosis.model";
import Doctor from "../model/doctor.model";
import Prescription from '../model/prescription.model';

export async function findPrescriptions(id: string) {
    try {
        const prescriptions = await Prescription.find({ patient: id }, '-patient')
            .sort("-date")
            .populate({ path: "doctor", model: Doctor })
            .populate({ path: 'diagnosis', model: Diagnosis, select: { patient: 0, doctor: 0 } });
        return prescriptions;
    } catch (e: any) {
        return false;
    }
}


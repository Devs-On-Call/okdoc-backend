import P from "pino";
import Diagnose from "../model/diagnosis.model";
import Doctor from "../model/doctor.model";
import Hospital from "../model/hospital.model";
import Profession from "../model/profession.model";

export async function findPatientDiagnoses(id: string) {
    try {
        const diagnoses = await Diagnose.find({ patient: id }, "-patient ")
            .sort("-date")
            .populate({
                path: "doctor",
                model: Doctor,
                populate: { path: "profession", model: Profession },
            })
            .populate({
                path: "doctor",
                model: Doctor,
                populate: { path: "hospital", model: Hospital },
            });
        return diagnoses;
    } catch (e: any) {
        return false;
    }
}

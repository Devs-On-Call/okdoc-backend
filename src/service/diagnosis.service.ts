import Diagnose from "../model/diagnosis.model";
import Doctor from "../model/doctor.model";
import mongoose, { ObjectId } from "mongoose";


export async function findPatientDiagnoses(id: string) {
    try {
        const diagnoses = await Diagnose.find({ patient: id }, '-patient ')
           .populate({ path: "doctor", model: Doctor })
            return diagnoses
    } catch (e: any) 
    {
        return false;
    }
}
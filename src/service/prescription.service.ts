import Doctor from "../model/doctor.model";
import Prescription from '../model/prescription.model';

export async function findPrescriptions(id:string){
    try{
        const prescriptions = await Prescription.find({patient: id}, '-patient').populate({path: "doctor", model: Doctor});
        return prescriptions;
    } catch (e:any){
        return false;
    }
}


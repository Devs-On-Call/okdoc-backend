import Doctors from "../model/doctor.model";

export async function getDoctors(professionId: string  ,hospitalId: string) {
    try {
        const doctors = await Doctors.find({profession: professionId , hospital: hospitalId}, "name lastName");
        

        return doctors;
    } catch (e: any) {
        return false;
    }
}
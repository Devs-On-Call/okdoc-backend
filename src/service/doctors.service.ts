import Doctors from "../model/doctor.model";
import Profession from "../model/profession.model";

export async function getDoctors(professionId: string, hospitalId: string) {
    try {
        const doctors = await Doctors.find(
            { profession: professionId, hospital: hospitalId },
            "name lastName profession"
        ).populate({
            path: "profession",
            model: Profession,
        });

        return doctors;
    } catch (e: any) {
        return false;
    }
}

export async function doctorExists(doctorId: string) {
    try {
        const doctor = await Doctors.find({ _id: doctorId }, "_id");

        return doctor;
    } catch (e: any) {
        return false;
    }
}

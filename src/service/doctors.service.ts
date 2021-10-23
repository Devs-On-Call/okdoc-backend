import Doctors from "../model/doctor.model";

export async function getDoctors(professionId: string, hospitalId: string) {
    try {
        const doctors = await Doctors.find(
            { profession: professionId, hospital: hospitalId },
            "name lastName profession"
        );

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

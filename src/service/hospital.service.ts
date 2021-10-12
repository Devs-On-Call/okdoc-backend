import Doctor from "../model/doctor.model";
import Hospital from "../model/hospital.model";

export async function getHospitals(professionId: string) {
    try {
        const ids = await Doctor.find(
            { profession: professionId },
            "hospital"
        ).distinct("hospital");

        const hospitals = await Hospital.find({ _id: { $in: ids } }, "name");

        return hospitals;
    } catch (e: any) {
        return false;
    }
}

import Doctor from "../model/doctor.model";
import Hospital from "../model/hospital.model";

export async function getHospitals(professionId: string) {
    try {
        const query = professionId == null ? {} : { profession: professionId };

        const ids = await Doctor.find(
            query,
            "hospital"
        ).distinct("hospital");

        const hospitals = await Hospital.find(
            { _id: { $in: ids } },
            "name address email"
        );

        return hospitals;
    } catch (e: any) {
        return false;
    }
}

export async function hospitalExists(hospitalId: string) {
    try {
        const hospital = await Hospital.find({ _id: hospitalId }, "_id");

        return hospital;
    } catch (e: any) {
        return false;
    }
}

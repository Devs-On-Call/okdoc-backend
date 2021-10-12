import { Request, Response } from "express";
import { get } from "lodash";
import { getHospitals } from "../service/hospital.service";
import { findPatient } from "../service/patient.service";

export async function getHospitalsHandler(req: Request, res: Response) {
    const professionId = req.query.professionId as string;
    const hospitals = await getHospitals(professionId);

    if (!hospitals) {
        return res.status(404).send({
            success: false,
            message:
                "Something went wrong while searching for your information",
        });
    }

    return res.send({
        success: true,
        message: "Success",
        data: hospitals,
    });
}

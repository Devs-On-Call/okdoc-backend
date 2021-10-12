import { Request, Response } from "express";
import { getDoctors } from "../service/doctors.service";

export async function getDoctorsHandler(req: Request, res: Response) {
    const professionId = req.query.professionId as string;
    const hospitalId = req.query.hospitalId as string;

    const doctors = await getDoctors(professionId, hospitalId);

    if (!doctors) {
        return res.status(404).send({
            success: false,
            message: "There was a problem with getting doctors",
        });
    }

    return res.send({
        success: true,
        message: "Success",
        data: doctors,
    });
}

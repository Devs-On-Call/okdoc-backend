import { Request, Response } from "express";
import mongoose from "mongoose";
import { getBooked } from "../service/booked.service";

export async function getBookedHandler(req: Request, res: Response) {
    const doctorIdstr = req.query.doctorId as string;
    const doctorId = new mongoose.Types.ObjectId(doctorIdstr);

    const booked = await getBooked(doctorId);

    if (!booked) {
        return res.status(404).send({
            success: false,
            message: "There was a problem with getting booked appointments",
        });
    }

    return res.send({
        success: true,
        message: "Success",
        data: booked,
    });
}

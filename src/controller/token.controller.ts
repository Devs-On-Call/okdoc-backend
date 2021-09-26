import { Request, Response } from "express";
import { patientExists } from "../service/token.service";
import jwt from "jsonwebtoken";

export async function createTokenHandler(req: Request, res: Response) {
    const patient = await patientExists(req.body.amka);

    if (!patient) {
        return res.status(401).send({
            success: false,
            message: "Patient doesn't exist"
        });
    }

    const accessToken = jwt.sign({ _id: patient._id }, process.env.TOKKEN_SECRET as string, {
        expiresIn: "1h"
    });

    return res.header("Authorization", accessToken).send({
        success: true,
        message: "Login succesful"
    })


}
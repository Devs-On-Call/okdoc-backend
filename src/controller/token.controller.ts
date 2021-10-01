import { Request, Response } from "express";
import { patientExists } from "../service/patient.service";
import { createToken } from "../utils/jwt.utils";

export async function createTokenHandler(req: Request, res: Response) {
    const patient = await patientExists(req.body.amka);

    if (!patient) {
        return res.status(401).send({
            success: false,
            message: "Patient doesn't exist"
        });
    }

    const accessToken = createToken(patient._id, "1h");

    return res.header("Authorization", accessToken).send({
        success: true,
        message: "Login successful"
    });
}

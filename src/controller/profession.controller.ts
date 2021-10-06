import { Request, Response } from "express";
import { getProfessions } from "../service/profession.service";

export async function getProfessionsHandler(req: Request, res: Response) {
    const professions = await getProfessions();
    if (!professions) {
        res.send({
            success: false,
            message: "There was a problem with getting professions",
        });
    }

    return res.send({
        success: true,
        message: "Success",
        data: professions,
    });
}

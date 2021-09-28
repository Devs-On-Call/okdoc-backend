import { Express, Request, Response } from "express";
import { getPatientHandler } from "./controller/patient.controller";
import { createTokenHandler } from "./controller/token.controller";
import validateRequest from "./middleware/validateRequest";
import validateToken from "./middleware/validateToken";
import { createTokenSchema } from "./validation/token.schema";
import { getPrescriptionHandler } from "./controller/prescription.controller";

export default function (app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

    // Login
    app.post("/api/tokens", validateRequest(createTokenSchema), createTokenHandler);

    // Profile
    app.get("/api/patients/:patientId", validateToken, getPatientHandler);

    //prescriptions
    app.get("/api/patients/:patientId/prescriptions", validateToken, getPrescriptionHandler)
}
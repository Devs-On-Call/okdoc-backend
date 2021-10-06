import { Express, Request, Response } from "express";
import { getPatientAppointmentsHandler } from "./controller/appointment.controller";
import { getPatientHandler } from "./controller/patient.controller";
import { createTokenHandler } from "./controller/token.controller";
import validateRequest from "./middleware/validateRequest";
import validateToken from "./middleware/validateToken";
import { createTokenSchema } from "./validation/token.schema";
import { getPatientPrescriptionsHandler } from "./controller/prescription.controller";
import { getPatientDiagnosesHandler } from "./controller/diagnoses.controller";
import validatePatientId from "./middleware/validatePatientId";
import { getProfessionsHandler } from "./controller/profession.controller";

export default function (app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) =>
        res.sendStatus(200)
    );

    app.post(
        "/api/tokens",
        validateRequest(createTokenSchema),
        createTokenHandler
    );

    app.get(
        "/api/patients/:patientId",
        validatePatientId,
        validateToken(true),
        getPatientHandler
    );

    app.get(
        "/api/patients/:patientId/appointments",
        validatePatientId,
        validateToken(true),
        getPatientAppointmentsHandler
    );

    app.get(
        "/api/patients/:patientId/prescriptions",
        validatePatientId,
        validateToken(true),
        getPatientPrescriptionsHandler
    );

    app.get(
        "/api/patients/:patientId/diagnoses",
        validatePatientId,
        validateToken(true),
        getPatientDiagnosesHandler
    );

    app.get("/api/professions", validateToken(false), getProfessionsHandler);
}

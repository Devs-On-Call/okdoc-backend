import { Express, Request, Response } from "express";
import { getPatientAppointmentsHandler } from "./controller/appointment.controller";
import { getPatientHandler } from "./controller/patient.controller";
import { createTokenHandler } from "./controller/token.controller";
import validateRequest from "./middleware/validateRequest";
import validateToken from "./middleware/validateToken";
import { createTokenSchema } from "./validation/token.schema";
import { getPatientPrescriptionHandler} from "./controller/prescription.controller";
import { getPatientDiagnosesHandler} from "./controller/diagnoses.controller";


export default function (app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

    // Login
    app.post("/api/tokens", validateRequest(createTokenSchema), createTokenHandler);

    // Profile
    app.get("/api/patients/:patientId", validateToken, getPatientHandler);

    // Appointments
    app.get("/api/patients/:patientId/appointments", validateToken, getPatientAppointmentsHandler);

    // Prescriptions
    app.get("/api/patients/:patientId/prescriptions", validateToken, getPatientPrescriptionHandler);

    // Diagnoses
    app.get("/api/patients/:patientId/diagnoses", validateToken, getPatientDiagnosesHandler);
   
}

import { Request, Response } from "express";
import { patientExists } from "../service/patient.service";
import jwt from "jsonwebtoken";
import { findPatientDiagnoses } from "../service/diagnosis.service";
import { get } from "lodash";
import mongoose, { ObjectId } from "mongoose";


export async function getPatientDiagnosesHandler(req: Request, res: Response) {
    const patientId = get (req, "params.patientId");

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return res.send({
            success: false,
            message: "Give patientId",
        });
    }

    const diagnoses = await findPatientDiagnoses(patientId);

    if (!diagnoses) {
        return res.send({
            success: false,
            message: "Diagnose dont exist",
        });
    }

    return res.send({
        success: true,
        message: "Success",
        data: {
            diagnoses 
        },
    
    });

    }

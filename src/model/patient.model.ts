import mongoose, { ObjectId } from "mongoose";

export interface PatientDocument extends mongoose.Document {
    amka: string,
    name: string,
    lastName: string,
    bloodType: string,
    familyDoctor: ObjectId
}

const PatientSchema = new mongoose.Schema(
    {
        amka: { type: String, minLength: 11, maxLength: 11, required: true, unique: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        bloodType: { type: String },
        familyDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }
    }
);

const Patient = mongoose.model("Patient", PatientSchema);

export default Patient;

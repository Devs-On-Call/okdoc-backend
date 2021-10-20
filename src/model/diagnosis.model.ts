import mongoose, { ObjectId } from "mongoose";

export interface DiagnosisDocument extends mongoose.Document {
    date: Date;
    diagnosis: string;
    patient: ObjectId;
    doctor: ObjectId;
}

const DiagnosisSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    diagnosis: { type: String },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    prescription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prescription",
        required: true,
    },
});

const Diagnosis = mongoose.model("Diagnosis", DiagnosisSchema);

export default Diagnosis;

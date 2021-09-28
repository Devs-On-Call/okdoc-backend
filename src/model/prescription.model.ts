import mongoose, { ObjectId } from "mongoose";

export interface PrescriptionDocument extends mongoose.Document {
    date: Date,
    diagnosis: ObjectId,
    drug: string,
    dosage: string,
    duration: number,
    patient: ObjectId,
    doctor: ObjectId
}


const PrescriptionSchema = new mongoose.Schema(
    {
        doctor: {type:mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true},
        date: { type: Date, required: true},
        diagnosis: { type: mongoose.Schema.Types.ObjectId, ref: "Diagnosis", required: true},
        drug: {type:String, required: true},
        dosage: { type: String, required: true },
        duration: { type: Number, required: true},
        patient: {type:mongoose.Schema.Types.ObjectId, ref: "Patient", required: true}
    }
);

const Prescription = mongoose.model("Prescription", PrescriptionSchema);

export default Prescription;

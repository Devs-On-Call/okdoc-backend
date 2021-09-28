import mongoose, { ObjectId } from "mongoose";

export interface AppointmentDocument extends mongoose.Document {
    date: Date,
    reason: string,
    patient: ObjectId,
    doctor: ObjectId,
    hospital: ObjectId,
}

const AppointmentSchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        reason: { type: String },
        patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
        doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
        hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

export default Appointment;

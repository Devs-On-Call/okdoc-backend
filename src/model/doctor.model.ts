import mongoose, { ObjectId } from "mongoose";

export interface DoctorDocument extends mongoose.Document {
    name: string,
    lastName: string,
    profession: string,
}

const DoctorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        profession: { type: String, required: true },
    },
);

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;

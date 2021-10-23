import mongoose from "mongoose";

export interface HospitalDocument extends mongoose.Document {
    name: string,
    address: string,
    phoneNumber: string,
    email: string,
}

const HospitalSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        phoneNumber: { type: String },
        email: { type: String },
    }
);

const Hospital = mongoose.model("Hospital", HospitalSchema);

export default Hospital;

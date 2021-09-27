import mongoose from "mongoose";

export interface HospitalDocument extends mongoose.Document {
    name: String,
    address: String,
    phoneNumber: String,
}


const HospitalSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        phoneNumber: { type: String },
    }
);

const Hospital = mongoose.model("Hospital", HospitalSchema);

export default Hospital;
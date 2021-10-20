import mongoose from "mongoose";

export interface HospitalDocument extends mongoose.Document {
    name: string;
    address: string;
    phoneNumber: string;
}

const HospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
});

const Hospital = mongoose.model("Hospital", HospitalSchema);

export default Hospital;

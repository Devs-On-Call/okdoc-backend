import mongoose from "mongoose";

export interface ProfessionDocument extends mongoose.Document {
    name: string;
}

const ProfessionSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const Profession = mongoose.model("Profession", ProfessionSchema);

export default Profession;

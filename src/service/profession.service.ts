import Profession from "../model/profession.model";

export async function getProfessions() {
    try {
        const professions = await Profession.find({}, "-_id");
        return professions;
    } catch (e: any) {
        return false;
    }
}

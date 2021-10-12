import Profession from "../model/profession.model";

export async function getProfessions() {
    try {
        const professions = await Profession.find({});

        return professions;
    } catch (e: any) {
        return false;
    }
}

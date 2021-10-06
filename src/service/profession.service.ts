import Profession from "../model/profession.model";

export async function getProfessions() {
    try {
        const professions = await Profession.find({}, "-_id").distinct("name");
        /*array.forEach(element => professions.values{
            professio
        });
        const professionsList = <string[]>JSON.parse(professions);
        var query = Profession.find({}, "-_id");
        query.exec()
*/
        return professions;
    } catch (e: any) {
        return false;
    }
}

import { object, string } from "yup";

export const createTokenSchema = object({
    body: object({
        amka: string()
            .length(11, "Must be a valid AMKA")
            .required("AMKA is required")
    })
});

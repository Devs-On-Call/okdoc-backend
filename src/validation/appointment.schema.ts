import { object, string, date } from "yup";

export const createAppointmentSchema = object({
    body: object({
        patient: string().required("Patiend is required"),
        reason: string().required("Reason is Required"),
        doctor: string().required("Doctor is required"),
        hospital: string().required("Hospital is required"),
        date: date().min(new Date()).required("Date is required"),
    }),
});

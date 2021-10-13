import Appointment from "../model/appointment.model";
import mongoose from "mongoose";

export async function getBooked(id: mongoose.Types.ObjectId) {
    const today = new Date();
    const enddate = new Date((new Date().setDate(today.getDate()+30)));
    try {
        const booked = await Appointment.aggregate([
            // First Stage
            {
              $match : { "date": { $gte: today, $lt: enddate}, "doctor": id}
            },
            // Second Stage
            {
              $group : {
                 _id : { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                 booked_times: { $push: {$dateToString: { format: "%H:%M", date: "$date" } }},

              }
            },
           ])

        return booked;
    } catch (e: any) {
        return false;
    }
}

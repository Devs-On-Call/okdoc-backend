import app from "../app";
import chai, { expect } from "chai";
import { createToken } from "../utils/jwt.utils";
import chaiHttp from "chai-http";
import Appointment from "../model/appointment.model";

chai.use(chaiHttp);
const should = chai.should();

describe("/api/appointments", () => {
    const patientIdJudith = "6151df074a29957b163f98a8";
    const token = createToken(patientIdJudith);

    it("Should say that doctor is already busy at that time", function (done) {
        chai.request(app)
            .post("/api/appointments")
            .set("Authorization", "Bearer " + token)
            .send({
                patient: "6151df074a29957b163f98a8",
                reason: "Dead",
                doctor: "6151da404a29957b163f98a4",
                hospital: "6151ddb64a29957b163f98a5",
                date: "2021-12-06T16:00:00.000+00:00",
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("success");
                res.body.success.should.equal(false);
                res.body.should.have.property("message");
                res.body.message.should.equal(
                    "Doctor already has an appointment at that time"
                );
                done();
            });
    });

    it("Should return error about appointment being before today", function (done) {
        chai.request(app)
            .post("/api/appointments")
            .set("Authorization", "Bearer " + token)
            .send({
                patient: "6151df074a29957b163f98a8",
                reason: "Dead",
                doctor: "6151da404a29957b163f98a4",
                hospital: "6151ddb64a29957b163f98a5",
                date: "2020-12-06T16:00:00.000+00:00",
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("success");
                res.body.success.should.equal(false);
                res.body.should.have.property("message");
                res.body.message.should.include(
                    "body.date field must be later than"
                );
                done();
            });
    });

    it("Should return error about doctor not existing", function (done) {
        chai.request(app)
            .post("/api/appointments")
            .set("Authorization", "Bearer " + token)
            .send({
                patient: "6151df074a29957b163f98a8",
                reason: "Dead",
                doctor: "6151da404a29957b163f98g4",
                hospital: "6151ddb64a29957b163f98a5",
                date: "2021-12-06T16:00:00.000+00:00",
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("success");
                res.body.success.should.equal(false);
                res.body.should.have.property("message");
                res.body.message.should.equal("Doctor does not exist");
                done();
            });
    });

    it("Should return error about hospital not existing", function (done) {
        chai.request(app)
            .post("/api/appointments")
            .set("Authorization", "Bearer " + token)
            .send({
                patient: "6151df074a29957b163f98a8",
                reason: "Dead",
                doctor: "6151da404a29957b163f98a4",
                hospital: "6151ddb64a29957b163f98b5",
                date: "2021-12-06T16:00:00.000+00:00",
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("success");
                res.body.success.should.equal(false);
                res.body.should.have.property("message");
                res.body.message.should.equal("Hospital does not exist");
                done();
            });
    });

    it("Should return error about date format being incorrect", function (done) {
        chai.request(app)
            .post("/api/appointments")
            .set("Authorization", "Bearer " + token)
            .send({
                patient: "6151df074a29957b163f98a8",
                reason: "Dead",
                doctor: "6151da404a29957b163f98a4",
                hospital: "6151ddb64a29957b163f98a5",
                date: "2021-22-06T16:00:00.000+00:00",
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("success");
                res.body.success.should.equal(false);
                res.body.should.have.property("message");
                res.body.message.should.equal("Date format incorrect");
                done();
            });
    });

    it("Should return error about time being outside of working hours", function (done) {
        chai.request(app)
            .post("/api/appointments")
            .set("Authorization", "Bearer " + token)
            .send({
                patient: "6151df074a29957b163f98a8",
                reason: "Dead",
                doctor: "6151da404a29957b163f98a4",
                hospital: "6151ddb64a29957b163f98a5",
                date: "2021-12-06T18:00:00.000+00:00",
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("success");
                res.body.success.should.equal(false);
                res.body.should.have.property("message");
                res.body.message.should.equal(
                    "Booking time should be between 9:00 and 16:30 in 30 minute increments"
                );
                done();
            });
    });
    it("Should return message about successfully adding appointment", function (done) {
        chai.request(app)
            .post("/api/appointments")
            .set("Authorization", "Bearer " + token)
            .send({
                patient: "6151df074a29957b163f98a8",
                reason: "for test only",
                doctor: "6151da404a29957b163f98a4",
                hospital: "6151ddb64a29957b163f98a5",
                date: "2021-12-06T13:00:00.000+00:00",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success");
                res.body.success.should.equal(true);
                res.body.should.have.property("message");
                res.body.message.should.equal(
                    "Your appoinment was added successfully"
                );
                done();
            });
    });

    after(async function () {
        try {
            await Appointment.deleteOne({
                reason: "for test only",
            });
        } catch (e: any) {
            console.log(e);
        }
    });
});

import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";
import { createToken } from "../utils/jwt.utils";

chai.use(chaiHttp);
const should = chai.should();

describe("/api/patients/:patientId", () => {
    const patientIdJim = "615043f6d0fb0121f3d50512";
    const patientIdJudith = "6151df074a29957b163f98a8";
    const token = createToken(patientIdJim);
    const expiredToken = createToken(patientIdJim, "-10s"); // negative expiration

    it("should return the patients info when given a valid token", function (done) {
        chai.request(app)
            .get("/api/patients/" + patientIdJim)
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success");
                res.body.success.should.equal(true);
                res.body.should.have.property("message");
                res.body.message.should.equal("Success");
                res.body.should.have.property("data");
                res.body.data.should.have.property("amka");
                res.body.data.should.have.property("name");
                res.body.data.should.have.property("lastName");
                res.body.data.should.have.property("bloodType");
                res.body.data.should.have.property("familyDoctor");
                res.body.data.familyDoctor.should.have.property("name");
                res.body.data.familyDoctor.should.have.property("lastName");
                res.body.data.familyDoctor.should.have.property("profession");
                done();
            });
    });

    it("should return error 'Give a valid patientId' when given an invalid patientI [validatePatientId]", function (done) {
        chai.request(app)
            .get("/api/patients/" + "123")
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("success");
                res.body.success.should.equal(false);
                res.body.should.have.property("message");
                res.body.message.should.equal("Give a valid patientId");
                done();
            });
    });

    it("should return error 'No token received' when given no token [validateToken]", function (done) {
        chai.request(app)
            .get("/api/patients/" + patientIdJim)
            // .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("success");
                res.body.success.should.equal(false);
                res.body.should.have.property("message");
                res.body.message.should.equal("No token received");
                done();
            });
    });

    it("should return error 'Token has expired' when given an expired token [validateToken]", function (done) {
        chai.request(app)
            .get("/api/patients/" + patientIdJim)
            .set("Authorization", "Bearer " + expiredToken)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("success");
                res.body.success.should.equal(false);
                res.body.should.have.property("message");
                res.body.message.should.equal("Token has expired");
                done();
            });
    });

    it("should return error 'Invalid token' when given an invalid token [validateToken]", function (done) {
        chai.request(app)
            .get("/api/patients/" + patientIdJim)
            .set("Authorization", "Bearer " + token + "123")
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("success");
                res.body.success.should.equal(false);
                res.body.should.have.property("message");
                res.body.message.should.equal("Invalid token");
                done();
            });
    });

    it("should return error 'PatientId and token don't match' [validateToken]", function (done) {
        chai.request(app)
            .get("/api/patients/" + patientIdJudith)
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("success");
                res.body.success.should.equal(false);
                res.body.should.have.property("message");
                res.body.message.should.equal(
                    "PatientId and token don't match"
                );
                done();
            });
    });
});

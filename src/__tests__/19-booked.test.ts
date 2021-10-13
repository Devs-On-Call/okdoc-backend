import app from "../app";
import chai, { expect } from "chai";
import { createToken } from "../utils/jwt.utils";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const should = chai.should();

describe("/api/appointments", () => {
    const patientIdJim = "615043f6d0fb0121f3d50512";
    const token = createToken(patientIdJim);

    const doctorId = "6151da404a29957b163f98a4";

    it("should return the booked times and dates for a given doctor", function (done) {
        chai.request(app)
            .get(`/api/appointments?doctorId=${doctorId}`)
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success");
                res.body.success.should.equal(true);
                res.body.should.have.property("message");
                res.body.message.should.equal("Success");
                res.body.should.have.property("data");
                res.body.data.should.be.not.empty;
                done();
            });
    });
});

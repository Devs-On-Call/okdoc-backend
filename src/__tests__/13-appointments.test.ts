import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";
import { createToken } from "../utils/jwt.utils";

chai.use(chaiHttp);
const should = chai.should();

describe("/api/patients/:patientId/appointments", () => {
    const patientIdJudith = "6151df074a29957b163f98a8";
    const token = createToken(patientIdJudith);

    it("should return the patients appointments info when given a valid token", () => {
        chai
            .request(app)
            .get(`/api/patients/${patientIdJudith}/appointments`)
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success");
                res.body.success.should.equal(true);
                res.body.should.have.property("message");
                res.body.message.should.equal("Success");
                res.body.should.have.property("data");
                res.body.data.should.have.length(2);
                res.body.data[0].should.have.property("reason");
                res.body.data[0].should.have.property("date");
                res.body.data[0].should.have.property("doctor");
                res.body.data[0].doctor.should.have.property("name");
                res.body.data[0].doctor.should.have.property("lastName");
                res.body.data[0].doctor.should.have.property("profession");
                res.body.data[0].should.have.property("hospital");
                res.body.data[0].hospital.should.have.property("name");
                res.body.data[0].hospital.should.have.property("address");
                res.body.data[0].hospital.should.have.property("phoneNumber");
            });
    });

});

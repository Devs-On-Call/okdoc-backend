import app from "../app";
import chai from "chai";
import { createToken } from "../utils/jwt.utils";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const should = chai.should();

describe("/api/patients/:patientId/prescriptions", () => {
    const patientIdJim = "615043f6d0fb0121f3d50512";
    const token = createToken(patientIdJim);

    it("should return the patient's prescriptions", () => {
        chai.request(app)
            .get(`/api/patients/${patientIdJim}/prescriptions`)
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success");
                res.body.success.should.equal(true);
                res.body.should.have.property("message");
                res.body.message.should.equal("Success");
                res.body.should.have.property("data");
                // res.body.data.should.have.length(1);
                res.body.data[0].should.have.property("diagnosis");
                res.body.data[0].should.have.property("date");
                res.body.data[0].should.have.property("doctor");
                res.body.data[0].should.have.property("dosage");
                res.body.data[0].should.have.property("drug");
                res.body.data[0].should.have.property("duration");
                res.body.data[0].doctor.should.have.property("profession");
                res.body.data[0].doctor.should.have.property("lastName");
                res.body.data[0].doctor.should.have.property("name");
            });
    });
});

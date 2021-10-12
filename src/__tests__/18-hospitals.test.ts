import app from "../app";
import chai, { expect } from "chai";
import { createToken } from "../utils/jwt.utils";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const should = chai.should();

describe("/api/hospitals", () => {
    const patientIdJim = "615043f6d0fb0121f3d50512";
    const token = createToken(patientIdJim);

    const professionId = "615c425614da612a4f026f6a";

    it("should return the hospitals with doctors of specific profession", function (done) {
        chai.request(app)
            .get(`/api/hospitals?professionId=${professionId}`)
            .set("Authorization", "Bearer " + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("success");
                res.body.success.should.equal(true);
                res.body.should.have.property("message");
                res.body.message.should.equal("Success");
                res.body.should.have.property("data");
                done();
            });
    });
});

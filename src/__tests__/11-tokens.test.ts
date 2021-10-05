import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const should = chai.should();

describe("/api/tokens", () => {
    it("should return a jwt in the header when given a valid and existing AMKA", () => {
        chai
            .request(app)
            .post("/api/tokens")
            .send({
                "amka": "12345678911"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.header.should.have.property("authorization");
                res.body.should.have.property("success");
                res.body.success.should.equal(true);
                res.body.should.have.property("message");
                res.body.message.should.equal("Login successful");
            });
    });

    it("should return error 'Must be a valid AMKA' when given a wrong AMKA", () => {
        chai
            .request(app)
            .post("/api/tokens")
            .send({
                "amka": "123456789111" // 12 numbers instead of 11
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("success");
                res.body.success.should.equal(false);
                res.body.should.have.property("message");
                res.body.message.should.equal("Must be a valid AMKA");
            });
    });

    it("should return error 'AMKA is required' when given no AMKA", () => {
        chai
            .request(app)
            .post("/api/tokens")
            .send({
                // "amka": "12345678911"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("success");
                res.body.success.should.equal(false);
                res.body.should.have.property("message");
                res.body.message.should.equal("AMKA is required");
            });
    });
});

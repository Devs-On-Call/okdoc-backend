import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const should = chai.should();

describe("/healthcheck", () => {
  it("should return OK", () => {
    chai
      .request(app)
      .get("/healthcheck")
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});

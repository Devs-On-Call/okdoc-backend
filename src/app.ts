import dotenv from "dotenv";
dotenv.config();
import express from "express";
import log from "./logger";
import routes from "./routes";
import connect from "./db/connect";

const port = parseInt(process.env.PORT || "", 10) || 3000 as number;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app.listen(port, () => {
    log.info(`Server listening at port ${port}`);

    connect();

    routes(app);
});

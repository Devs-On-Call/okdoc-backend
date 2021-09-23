require('dotenv').config()
import express from "express";
import log from "./logger";
import routes from "./routes";
import connect from "./db/connect";
// import { deserializeUser } from "./middleware";

const port = parseInt(process.env.PORT || "") || 3000 as number;

const app = express();
// app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    log.info(`Server listening at port ${port}`);

    connect();

    routes(app);
});
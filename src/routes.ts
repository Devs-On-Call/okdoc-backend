import { Express, Request, Response } from "express";
import { createTokenHandler } from "./controller/token.controller";
import validateRequest from "./middleware/validateRequest";
import { createTokenSchema } from "./validation/token.schema";

export default function (app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

    // Login
    app.post("/api/tokens", validateRequest(createTokenSchema), createTokenHandler);
}
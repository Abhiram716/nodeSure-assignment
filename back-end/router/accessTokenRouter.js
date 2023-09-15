import express from "express";
import AccessTokenController from "../controllers/accessToken.js";

const AccessTokenRouter = express.Router();

AccessTokenRouter.post("/", AccessTokenController.createAccessToken);

export default AccessTokenRouter;

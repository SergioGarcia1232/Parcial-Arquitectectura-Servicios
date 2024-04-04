import { Router } from "express";
import { verifyToken } from "./token.middlewares.js";

const middle = Router();

middle.use("/vehiculo",verifyToken);

export default middle;
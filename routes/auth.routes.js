import { Router } from "express";
import { login } from "../controllers/auth.controller.js";

const routerAuth = Router();

routerAuth.post('/',login);

export default routerAuth;
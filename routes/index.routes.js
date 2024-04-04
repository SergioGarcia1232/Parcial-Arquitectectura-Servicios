import { Router } from "express";
import routeVehiculo from "./Vehiculo.routes.js";
import routerAuth from "./auth.routes.js";

const router = Router();

router.use('/vehiculo', routeVehiculo);
router.use("/auth",routerAuth);
//router.use('/api', routeVehiculo); // Usa tus rutas de vehículos en la aplicación

export default router;
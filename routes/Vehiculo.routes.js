import { Router } from "express";
import {validate} from "../middlewares/validator.middlewares.js"
import {postVehiculValidator} from "../validators/vehiculo.validators.js"
import { getvehiculo, postVehiculoController, GetVehiculoUnico, updateVehiculo ,insertVehicleFromExternalAPI, DeleteVehiculo} from "../controllers/Vehiculo.controller.js";

const routeVehiculo = Router();

routeVehiculo.get("/", getvehiculo );
routeVehiculo.get("/:id", GetVehiculoUnico );
routeVehiculo.post("/", validate(postVehiculValidator), postVehiculoController );
// Ruta para actualizar un producto por su ID
routeVehiculo.put("/:id_vehiculo", updateVehiculo);
// Definir la ruta para insertar datos desde la API externa
routeVehiculo.post('/insertar-desde-api/:id_vehiculo', insertVehicleFromExternalAPI);
routeVehiculo.delete('/:id_vehiculo',DeleteVehiculo)

export default routeVehiculo;
import { getVehiculoUnicoModel, getVehiculomodel, postVehiculoModel, actualizarVehiculo,getDataFromApiAndInsert, eliminarVehiculo} from "../models/vehiculo.models.js";

export const getvehiculo = async (_, res) => {
    try {
        let vehiculo = await getVehiculomodel();
        res.status(200).json({ success: true, vehiculo });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al obtener los vehiculos" });
    }
};

export const GetVehiculoUnico = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await getVehiculoUnicoModel(id);
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, data: "No hay datos" });
    }
};

export const postVehiculoController = async (req, res) => {
    let {car,car_model,car_color,car_model_year,car_vin,price,availability,user_id} = req.body;

    // Verificar si los datos del vehículo están completos
    if (!car || !car_model || !car_color || !car_model_year || !car_vin || !price || !availability || !user_id) {
        return res.status(400).json({ success: false, msg: 'Los datos del vehículo no están completos' });
    }

    try {
        // Llamar a la función postVehiculo para insertar el vehículo en la base de datos local
        let data = await postVehiculoModel(car,car_model,car_color,car_model_year,car_vin,price,availability,user_id);
        console.log(data);
        return res.status(200).json({ success: true, data: data });
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'Error al insertar datos en la base de datos local' });
    }
};

export const updateVehiculo = async (req, res) => {
    try {
        let { id_vehiculo } = req.params;
        let { car, car_model, car_color, car_model_year, car_vin, price, availability, user_id } = req.body;
        console.log('ID del vehículo:', id_vehiculo);

        // Llamar al método actualizarProducto para actualizar el producto
        const updatedVehiculo = await actualizarVehiculo(car, car_model, car_color, car_model_year, car_vin, price, availability, user_id, id_vehiculo);

        res.status(200).json({
            success: true,
            data: updatedVehiculo,
            message: 'Vehiculo actualizado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el producto'
        });
    }
};


// En tu archivo de controladores, por ejemplo, controllers/Vehiculo.controller.js


export const insertVehicleFromExternalAPI = async (req, res) => {
    try {
        const { id_vehiculo } = req.params; // Obtener el ID del vehículo de la URL
        const { user_id } = req.body; // Obtener el user_id del cuerpo de la solicitud JSON

        // Verificar si el user_id se proporciona en el cuerpo de la solicitud
        if (!user_id) {
            return res.status(400).json({ success: false, message: 'El user_id es requerido en el cuerpo de la solicitud' });
        }

        // Llamar a la función para obtener datos de la API y luego insertarlos en la base de datos local
        const result = await getDataFromApiAndInsert(id_vehiculo, user_id);

        res.status(200).json({ success: true, message: result });
    } catch (error) {
        console.error('Error al insertar vehículo desde la API externa:', error);
        res.status(500).json({ success: false, message: 'Error al insertar vehículo desde la API externa' });
    }
};

export const DeleteVehiculo = async (req, res) => {
    try {
        const { id_vehiculo } = req.params; // Obtener el ID del vehículo de la URL

        // Verificar si el user_id se proporciona en el cuerpo de la solicitud
        if (!id_vehiculo) {
            return res.status(400).json({ success: false, message: 'El user_id es requerido en el cuerpo de la solicitud' });
        }

        // Llamar a la función para obtener datos de la API y luego insertarlos en la base de datos local
        const result = await eliminarVehiculo(id_vehiculo);

        res.status(200).json({ success: true, message: result });
    } catch (error) {
        console.error('Error al insertar vehículo desde la API externa:', error);
        res.status(500).json({ success: false, message: 'Error al insertar vehículo desde la API externa' });
    }
};

import axios from 'axios';
import pgServices from '../services/pg.services.js';

async function fetchExternalData(id) {
    try {
        // Construir la URL de la API externa usando el ID proporcionado
        const url = `https://myfakeapi.com/api/cars/${id}`;
        
        // Realizar la solicitud GET a la API externa
        const response = await axios.get(url);

        // Obtener los datos de la respuesta
        const externalData = response.data.Car;

        /*// Verificar si la clave "cars" está presente en los datos y es una matriz
        if (!externalData.cars || !Array.isArray(externalData.cars)) {
            // Lanzar un error si la estructura de los datos no es la esperada
            throw new Error('La clave "cars" no está presente o no es una matriz en los datos de la API externa');
        }

        // Devolver la matriz de carros
        */
        return externalData;
        
    } catch (error) {
        console.error('Error al obtener los datos de la API externa:', error);
        throw new Error('Error al obtener los datos de la API externa');
    }
}

export default fetchExternalData;





// Función para insertar un vehículo en la base de datos local
export const postVehiculoModel = async (car,car_model,car_color,car_model_year,car_vin,price,availability,user_id) => {
    const pg = new pgServices();
    return await pg.connection.query('INSERT INTO VEHICULO (car,car_model,car_color,car_model_year,car_vin,price,availability,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',[car,car_model,car_color,car_model_year,car_vin,price,availability,user_id]);
};

// Función para insertar un vehículo en la base de datos local
export const postVehiculoModelAPI = async (id_v,car,car_model,car_color,car_model_year,car_vin,price,availability,user_id) => {
    const pg = new pgServices();
    return await pg.connection.query('INSERT INTO VEHICULO (id_vehiculo,car,car_model,car_color,car_model_year,car_vin,price,availability,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',[id_v,car,car_model,car_color,car_model_year,car_vin,price,availability,user_id]);
};
// Función para obtener los vehículos desde la base de datos local
export const getVehiculomodel = async () => {
    const pg = new pgServices();
    return await pg.connection.query("SELECT * FROM VEHICULO");
};

// Función para obtener un vehículo único desde la base de datos local
export const getVehiculoUnicoModel = async (id) => {
    try {
        const pg = new pgServices();
        return await pg.connection.oneOrNone("SELECT * FROM VEHICULO where ID_VEHICULO = $1", [id]);
    } catch (error) {
        return 'no hay datos';
    }
};

/*
// Función que encapsula el proceso completo de obtener datos de la API y luego insertarlos en la base de datos local
export const getDataFromApiAndInsert = async () => {
    try {
        const externalData = await fetchExternalData();
        // Aquí podrías aplicar cualquier lógica adicional necesaria para procesar los datos antes de insertarlos en la base de datos local
        await postVehiculModel(externalData.car, externalData.car_model, externalData.car_color, externalData.car_model_year, externalData.car_vin, externalData.price, externalData.availability, externalData.user);
        return 'Datos insertados correctamente en la base de datos local';
    } catch (error) {
        console.error('Error al obtener datos de la API y/o insertarlos en la base de datos local:', error);
        throw new Error('Error al obtener datos de la API y/o insertarlos en la base de datos local');
    }
};

*/
export const actualizarVehiculo = async (car, car_model, car_color, car_model_year, car_vin, price, availability, user_id, id_vehiculo) => {
    const pg = new pgServices();
    try {
        const query = `
            UPDATE VEHICULO
            SET car = $1, car_model = $2, car_color = $3, car_model_year = $4, car_vin = $5, price = $6, availability = $7, user_id = $8
            WHERE ID_VEHICULO = $9
            RETURNING *;
        `;
        const values = [car, car_model, car_color, car_model_year, car_vin, price, availability, user_id, id_vehiculo];

        const updatedVehiculo = await pg.connection.one(query, values);
        return updatedVehiculo;
    } catch (error) {
        // Manejar el error si la actualización falla
        console.error('Error al actualizar el vehículo:', error);
        throw error;
    }
};

export const eliminarVehiculo = async (id_vehiculo) => {
    try {
        
        const pg = new pgServices();
        const queryText = 'DELETE FROM VEHICULO WHERE ID_VEHICULO = $1';
        const result = pg.connection.query(queryText, [id_vehiculo]);
        return result;
    } catch (error) {
        console.error('Error al eliminar en la base de datos local:', error);
        throw new Error('Error al eliminar en la base de datos local');
    }
};



export const getDataFromApiAndInsert = async (id_vehiculo, user_id) => {
    try {
        const externalData = await fetchExternalData(id_vehiculo); // Obtener datos de la API externa usando el ID del vehículo
        console.log(externalData);
        const id_v = externalData.id;
        const car = externalData.car;
        const carModel = externalData.car_model;
        const carColor = externalData.car_color;
        const carModelYear = externalData.car_model_year;
        const carVin = externalData.car_vin;
        const priceData = externalData.price;
        const price = parseFloat(priceData.replace('$', ''));
        const availability = externalData.availability;
        await postVehiculoModelAPI(id_v,car,carModel,carColor,carModelYear,carVin,price,availability, user_id); // Insertar datos en la base de datos local con el user_id proporcionado

        return 'Vehículo insertado correctamente en la base de datos local';
    } catch (error) {
        console.error('Error al obtener datos de la API y/o insertarlos en la base de datos local:', error);
        throw new Error('Error al obtener datos de la API y/o insertarlos en la base de datos local');
    }
};

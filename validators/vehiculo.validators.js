import { checkSchema } from "express-validator";

export const postVehiculValidator = checkSchema({
    car: {
        errorMessage: 'Vehiculo no valido',
        notEmpty: true,
        isLength: {
            options: { min: 1 },
            errorMessage: 'El nombre debe ser minimo una letra'
        }
    },
    car_model: {
        errorMessage: 'Modelo del vehiculo invalido',
        notEmpty: true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'El modelo del carro debe ser mínimo de 3 letras'
        }
    },car_color: {
        errorMessage: 'Color invalido',
        notEmpty: true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'El Color debe ser mínimo de 3 letras'
        }
    },
    car_model_year: {
        matches: { options: /^[0-9]+$/ },
        errorMessage: 'El valor es solo numero'
    },
    car_vin: {
        errorMessage: 'Modelo del vehiculo invalido',
        notEmpty: true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'El modelo del carro debe ser mínimo de 3 letras'
        }
    },
    price: {
        errorMessage: 'Precio del vehículo inválido',
        isNumeric: {
            errorMessage: 'El precio del vehículo debe ser un valor numérico'
        }
    },
    availability: {
        errorMessage: 'Disponibilidad del vehículo inválida',
        isBoolean: {
            errorMessage: 'La disponibilidad del vehículo debe ser un valor booleano'
        }
    },
    user_id: {
        isInt: {
            options: { min: 1 },
            errorMessage: 'El ID de usuario debe ser un número entero positivo'
        }
    }
}, ["body"]);

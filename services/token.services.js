import Jwt from "jsonwebtoken";
import { env } from "../config/default.js";

if (!env.secretKey) {
    console.error("La clave secreta no está definida.");
    process.exit(1); // Detiene la aplicación si no hay clave secreta
}

export const generateToken = (data) => {
    console.log('Datos recibidos para generar el token:', data);
    const token = Jwt.sign(
        { data },
        env.secretKey,
        { expiresIn: '1h' }
    );
    console.log('Token generado:', token);
    return token;
};
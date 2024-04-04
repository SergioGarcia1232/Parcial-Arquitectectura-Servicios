// controllers/auth.controller.js
import { getUsuario } from "../models/auth.models.js";
import { generateToken } from "../services/token.services.js";

export const login = async (req, res) => {
    try {
        // Asegúrate de utilizar req.body para solicitudes POST
        const { username, password } = req.body;

        let data = await getUsuario(username, password);
        
        if (!data) {
            throw new Error("Credenciales no válidas");
        }

        const token = generateToken(data);
        res.status(200).json({
            token: token,
            success: true,
            msg: 'Logueado correctamente'
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            msg: 'Datos incorrectos',
            token: ''
        });
    }
};

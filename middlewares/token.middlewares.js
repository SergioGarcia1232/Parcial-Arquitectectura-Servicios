import Jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    // Obtener el token de los headers de la solicitud
    const token = req.headers["authorization"];

    // Verificar si el token existe y tiene el formato correcto
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({
            msg: 'Authorization header is missing or has incorrect format'
        });
    }

    // Extraer el token sin la palabra "Bearer "
    const tokenWithoutBearer = token.slice(7);

    try {
        // Verificar el token y decodificarlo
        const decoded = Jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);
        // Asignar los datos decodificados a req.user para que estén disponibles en las rutas protegidas
        req.user = decoded;
        // Llamar a next() para pasar al siguiente middleware o controlador
        next();
    } catch (error) {
        // Manejar errores de verificación de token
        return res.status(401).json({
            msg: 'Unauthorized'
        });
    }
};
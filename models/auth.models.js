import pgServices from "../services/pg.services.js";

export const getUsuario = async (username, password) => {
    const pg = new pgServices();
    try {
        return await pg.connection.oneOrNone('SELECT ID, USERNAME FROM USUARIO WHERE USERNAME = $1 AND PASSWORD = $2', [username, password]);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        // Dependiendo de tu aplicación, podrías querer lanzar el error o manejarlo de manera específica
        throw error;
    }
}

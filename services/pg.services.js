import pgPromise from "pg-promise";
import { env } from "../config/default.js";

export default class pgServices{
    constructor(){
        const pgp = pgPromise({});
        this.connection = pgp(env.postgres)
        this.connection.connect()
        .then(obj=>{
            console.log("base de datos conectada " + obj.client.serverVersion);
        })
        .catch(error =>{
            console.log("Error ",error.menssage || error);
        })
    }
}
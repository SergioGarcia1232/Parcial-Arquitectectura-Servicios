import bodyParser from "body-parser";
import express from "express";
import {env} from "./default.js";
import router from "../routes/index.routes.js";
import pgServices from "../services/pg.services.js";
import middle from "../middlewares/index.middlewares.js";

export default class Server{

    constructor(){
        this.app = express();
        this.port = env.port;
    }

    connectionDB(){
        new pgServices();
    }


    middlewards(){

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(middle);
    }

    route(){
       this.app.use(router)
    }

    runServer(){
        this.app.listen(this.port, ()=>{
            console.log("buenos dias");
        })
    }

    load(){
        this.connectionDB();
        this.middlewards();
        this.route();
        this.runServer();
    }
}
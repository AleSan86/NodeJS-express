import config from "./config.js";
import mongoose from "mongoose";

export default class MongoSingleton {
    static #instance;

    constructor(){
        this.#connectMongoDB();
    };

    static getInstance(){
        if (this.#instance) {
            console.log("Ya se ha abierto una conexion a MongoDB.");
        } else {
            this.#instance = new MongoSingleton();
        }
        return this.#instance;
    };

    #connectMongoDB = async ()=>{
        try {
            await mongoose.connect(config.mongoUrl);
            console.log("////////////////////////////////////////////////////////////");
            console.log("Conectado con éxito a MongoDB usando Mongoose (Singleton).");
            console.log("Para correr test unitario usar: npm run test");
            console.log("Para correr test avanzado usar: npm run supertest");
            console.log("Para consultar la documentación, usar la ruta: http://localhost:8080/apidocs/");
            console.log("Para correr Mock test, usar la ruta: http://localhost:8080/api/mock/users");
            console.log("////////////////////////////////////////////////////////////");
        } catch (error) {
            console.error("No se pudo conectar a la BD usando Mongoose: " + error);
            process.exit();
        }
    };
}
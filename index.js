import express from "express"; //ECS6
//const express = require('express'); //ECS5///requerimos el modulo express
import morgan from "morgan"; //ECS6
//const morgan= require('morgan');//ECS5
import cors from "cors"; //ECS6
//const cors= require('cors');//ECS5
import path from "path";
import mongoose from "mongoose";
import router from "./routers";

/* conection whit the MongooDB */
mongoose.Promise = global.Promise;
const dbUrl = "mongodb://localhost:27017/dbsistem";
mongoose
  .connect(dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((mongoose) => console.log("connected to the DB on port 27017"))
  .catch((err) => console.log(err));

const app = express();
/* Middlewears */
app.use(morgan("dev")); //utilice morgan con parametro 'dev' indicando modo de desarrollo
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //permitimos(true) a nuestro backend recibir peticiones json por medio del metodo post
app.use(express.static(path.join(__dirname, "public"))); //dirname es una constante de nodejs, almacena , en este caso, el directorio del archivo utilizado ( index.js) Raiz con el text 'public'

app.use("/api", router);
app.set("port", process.env.PORT || 3000); //puerto dinamico asignado por el servicio (process.env.PORT), de lo contrario por default '3000'

/* app.get('/home', function (req, res) {//funcion de middleware con 2 argumentos
    res.send('Hello World!');//responde enviando el texto 
  }); */

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
  console.log(path.join(__dirname, "public")); //obtener la ruta
});

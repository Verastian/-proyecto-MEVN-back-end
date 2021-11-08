import models from "../models"; //todos los modelos
import bcrypt from 'bcryptjs';
import token from '../services/token';
/* import { response } from "express"; */
/* import { model } from "mongoose"; */

export default {
    add: async (req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password,10);//encriptacion
            const reg = await models.User.create(req.body) //metodo create (Queries) de mongoo almacena todo el objeto en la colleccion User, lo recibimos en el body por medio de ajax
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: "an error occurred",
            });
            next(e);
        }
    },
    query: async (req, res, next) => {
        try {
            const reg = await models.User.findOne({ _id: req.query._id }); //metodo finOne (Queries)
            if (!reg) {//si no encuentra el filtro el id
                res.status(404).send({
                    message: " the record does not exist",
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message: "an error occurred",
            });
            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            let value = req.query.value;
            const reg = await models.User
                .find({
                    $or: [
                        { 'name': new RegExp(value, 'i') },//primer parametro indica una busqueda
                        { 'email': new RegExp(value, 'i') }
                    ]
                },
                    { createdAt: 0 })// 2 params  indica propiedades filtradas(ej. {createAT:0} no se mostrara )
                .populate('category', { name: 1 })//nos muestra el nombre de la categoria respectiva 
                .sort({ 'createdAt': -1 });// ordenara por fecha de creacion de manera descendente
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: "an error occurred",
            });
            next(e);
        }
    },
    update: async (req, res, next) => {
        try {
            let pass= req.body.password;
            const reg0 = await model.User.findOne({
                _id:req.body._id
            });
            if(pass != reg0.password){
                req.body.password = await bcrypt.hash(req.body.password,10)//encriptacion
            }

            const reg = await models.User.findByIdAndUpdate(
                {
                    _id: req.body._id,
                },
                {
                    rol: req.body.rol,//
                    name: req.body.name,
                    documentType: req.body.documentType,//
                    documentNum: req.body.documentNum,
                    address:req.body.address,//
                    phone:req.body.phone,//
                    email:req.body.emal,
                    password:req.body.password,
                    state:req.body.state,
                    createdAt:req.body.createdAt

                }
            );
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: "an error occurred",
            });
            next(e);
        }
    },
    remove: async (req, res, next) => {
        try {
            const reg = await models.User.findByIdAndDelete({ _id: req.body._id });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: "an error occurred",
            });
            next(e);
        }
    },
    activate: async (req, res, next) => {
        try {
            const reg = await models.User.findByIdAndUpdate({ _id: req.body._id }, { state: 1 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: "an error occurred",
            });
            next(e);
        }
    },
    deactivate: async (req, res, next) => {
        try {
            const reg = await models.User.findByIdAndUpdate({ _id: req.body._id }, { state: 0 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: "an error occurred",
            });
            next(e);
        }
    },
    login: async (req,res,next)=>{
        try {
            let user= await models.User.findOne({email:req.body.email, state:1});
            if(user){
                //existe un usuario con este email
                let match = await bcrypt.compare(req.body.password,user.password);
                if(match){
                    let tokenReturn = await token.encode(user._id);
                    res.status(200).json({user,tokenReturn}); 
                    /* res.json('Correct password') */
                }else{
                    res.json('Incorrect password')
                }
            }else{
                req.status(404).send({
                    message:'Username does not exist'
                })
            }
        } catch (e) {
            res.status(500).send({
                message: "an error occurred",
            });
            next(e);
        }
    },
};

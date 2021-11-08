import models from "../models"; //todos los modelos

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Article.create(req.body) //metodo create (Queries) de mongoo almacena todo el objeto en la colleccion Article, lo recibimos en el body por medio de ajax
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
            const reg = await models.Article.findOne({ _id: req.query._id }) //metodo finOne (Queries)
            .populate('category',{name:1});
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
    queryCode: async (req, res, next) => {
        try {
            const reg = await models.Article.findOne({ code: req.query.code }) //metodo finOne (Queries)
            .populate('category',{name:1});
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
            const reg = await models.Article
            .find({
                $or: [
                    { 'name': new RegExp(value, 'i') },//primer parametro indica una busqueda
                    { 'description': new RegExp(value, 'i') }
                ]
            },
            { createdAt: 0 })// 2 params  indica propiedades filtradas(ej. {createAT:0} no se mostrara )
            .populate('category',{name:1})
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
            const reg = await models.Article.findByIdAndUpdate(
                {
                    _id: req.body._id,
                },
                {
                    article: req.body.article,//
                    code: req.body.code,//
                    name: req.body.name,
                    description: req.body.description,
                    price_sale:req.body.price_sale,//
                    stock:req.body.stock,//
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
            const reg = await models.Article.findByIdAndDelete({ _id: req.body._id });
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
            const reg = await models.Article.findByIdAndUpdate({ _id: req.body._id }, { state: 1 });
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
            const reg = await models.Article.findByIdAndUpdate({ _id: req.body._id }, { state: 0 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: "an error occurred",
            });
            next(e);
        }
    },
};

import models from "../models"; //todos los modelos

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Person.create(req.body); //metodo create (Queries) de mongoo almacena todo el objeto en la colleccion Person, lo recibimos en el body por medio de ajax
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
      const reg = await models.Person.findOne({ _id: req.query._id }); //metodo finOne (Queries)
      if (!reg) {
        //si no encuentra el filtro el id
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
      const reg = await models.Person.find(
        {
          $or: [
            { name: new RegExp(value, "i") }, //primer parametro indica una busqueda
            { email: new RegExp(value, "i") },
          ],
        },
        { createdAt: 0 }
      ) // 2 params  indica propiedades filtradas(ej. {createAT:0} no se mostrara )
        .sort({ createdAt: -1 }); // ordenara por fecha de creacion de manera descendente
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "an error occurred",
      });
      next(e);
    }
  },
  ClientList: async (req, res, next) => {
    try {
      let value = req.query.value;
      const reg = await models.Person.find(
        {
          $or: [
            { name: new RegExp(value, "i") }, //primer parametro indica una busqueda
            { email: new RegExp(value, "i") },
          ],
          personType: "Client",
        },
        { createdAt: 0 }
      ) // 2 params  indica propiedades filtradas(ej. {createAT:0} no se mostrara )
        .sort({ createdAt: -1 }); // ordenara por fecha de creacion de manera descendente
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "an error occurred",
      });
      next(e);
    }
  },
  ProvidersList: async (req, res, next) => {
    try {
      let value = req.query.value;
      const reg = await models.Person.find(
        {
          $or: [
            { name: new RegExp(value, "i") }, //primer parametro indica una busqueda
            { email: new RegExp(value, "i") },
          ],
          personType: "Providers",
        },
        { createdAt: 0 }
      ) // 2 params  indica propiedades filtradas(ej. {createAT:0} no se mostrara )
        .sort({ createdAt: -1 }); // ordenara por fecha de creacion de manera descendente
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
      const reg = await models.Person.findByIdAndUpdate(
        {
          _id: req.body._id,
        },
        {
          personType: req.body.personType, //
          name: req.body.name,
          documentType: req.body.documentType, //
          documentNum: req.body.documentNum,
          address: req.body.address, //
          phone: req.body.phone, //
          email: req.body.emal,
          state: req.body.state,
          createdAt: req.body.createdAt,
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
      const reg = await models.Person.findByIdAndDelete({ _id: req.body._id });
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
      const reg = await models.Person.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 }
      );
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
      const reg = await models.Person.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "an error occurred",
      });
      next(e);
    }
  },
};

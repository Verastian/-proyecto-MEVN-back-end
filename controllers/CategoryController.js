import models from "../models"; //todos los modelos

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Category.create(req.body); //metodo create (Queries) de mongoo almacena todo el objeto en la colleccion category, lo recibimos en el body por medio de ajax
      res.status(200).send({
        message: `The ${req.body.name} category was successfully added`,
        type:'success',
        
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: `A server error has occurred. Could not add category ${req.body.name}`,
        type: 'danger',
        
      });
      next(e);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.Category.findOne({ _id: req.query._id }); //metodo finOne (Queries)
      if (!reg) {
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
      const reg = await models.Category.find({});
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
      const reg = await models.Category.findByIdAndUpdate(
        {
          _id: req.body._id,
        },
        {
          name: req.body.name,
          description: req.body.description,
        }
      );
      res.status(200).send({
        message: `The ${req.body.name} category has been updated successfully`,
        type:'success',
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: `A server error has occurred. The category ${req.body.name} could not be updated`,
        type: 'danger',
      });
      next(e);
    }
  },
  remove: async (req, res, next) => {
    /* let id = mongoose.Types.ObjectId(req.body._id); */
    console.log(req.body._id)
    try {
      const reg = await models.Category.findByIdAndDelete({_id:req.body._id});
      res.status(200).send({
        message: `The ${req.body.name} has been successfully removed`,
        type:'success',
      });
      res.status(200).json(reg);
      
    } catch (e) {
      res.status(500).send({
        message: `A server error has occurred. The ${req.body.name} could not be removed`,
        type:'danger',
      });
      next(e);
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.Category.findByIdAndUpdate({_id:req.body._id},{state:1});
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
      const reg = await models.Category.findByIdAndUpdate({_id:req.body._id},{state:0});
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "an error occurred",
      });
      next(e);
    }
  },
};

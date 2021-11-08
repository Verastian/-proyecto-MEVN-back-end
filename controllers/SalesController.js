import models from "../models";

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Sales.create(req.body);
      //Actualizar stock
      let details = req.body.details;
      details.map(function (x) {
        decreaseStock(x._id, x.amount);
      });
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
      const reg = await models.Sales.findOne({ _id: req.query._id })
        .populate("user", { name: 1 })
        .populate("person", { name: 1 });
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
      const reg = await models.Sales.find({
        $or: [
          { voucherNum: new RegExp(value, "i") },
          { voucherSerie: new RegExp(value, "i") },
        ],
      })
        .populate("user", { name: 1 })
        .populate("person", { name: 1 })
        .sort({ createdAt: -1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "an error occurred",
      });
      next(e);
    }
  },
  /*
    update: async (req,res,next) => {
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{name:req.body.name,descripcion:req.body.descripcion});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message: "an error occurred",
            });
            next(e);
        }
    },
    remove: async (req,res,next) => {
        try {
            const reg = await models.Categoria.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message: "an error occurred",
            });
            next(e);
        }
    },
    */
  activate: async (req, res, next) => {
    try {
      const reg = await models.Sales.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 1 }
      );
      //Actualizar stock
      let details = reg.details;
      details.map(function (x) {
        decreaseStock(x._id, x.amount);
      });
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
      const reg = await models.Sales.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 0 }
      );
      //Actualizar stock
      let details = reg.details;
      details.map(function (x) {
        increaseStock(x._id, x.amount);
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "an error occurred",
      });
      next(e);
    }
  },
  monthsChart: async (req, res, next) => {
    try {
      const reg = await models.Sales.aggregate([
        {
          $group: {
            _id: {
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
            },
            total: { $sum: "$total" },
            num: { $sum: 1 },
          },
        },
        {
          $sort: {
            "_id.year": -1,
            "_id.month": -1,
          },
        },
      ]).limit(12);

      res.sttus(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "an error occurred",
      });
      next(e);
    }
  },
  checkDates: async (req, res, next) => {
    try {
      let start = req.query.start;
      let end = req.query.end;
      const reg = await models.Sales.find({
        "createdAt":{
            "$gte":start,
            "$lt":end
        }
      })
        .populate("user", { name: 1 })
        .populate("person", { name: 1 })
        .sort({ createdAt: -1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "an error occurred",
      });
      next(e);
    }
  },
};

async function increaseStock(idarticle, amount) {
  let { stock } = await models.Article.findOne({ _id: idarticle });
  let nStock = parseInt(stock) + parseInt(amount);
  const reg = await models.Article.findByIdAndUpdate(
    { _id: idarticle },
    { stock: nStock }
  );
}

async function decreaseStock(idarticle, amount) {
  let { stock } = await models.Article.findOne({ _id: idarticle });
  let nStock = parseInt(stock) - parseInt(amount);
  const reg = await models.Article.findByIdAndUpdate(
    { _id: idarticle },
    { stock: nStock }
  );
}

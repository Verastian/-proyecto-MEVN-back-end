import models from "../models"; //todos los modelos


export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Income.create(req.body); //metodo create (Queries) de mongoo almacena todo el objeto en la colleccion Income, lo recibimos en el body por medio de ajax
      //actualizar Stock
      let details = req.body.details;//obtenemos el array de details del modelo income
      details.map(function (x) {//por cada objeto del array details ejecutamos la funcion increaseStock 
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
  query: async (req, res, next) => {
    try {
      const reg = await models.Income.findOne({ _id: req.query._id }) //metodo finOne (Queries)
      .populate("user", { name: 1 }) //referencia  a usuario,nombre de usuario
      .populate("person", { name: 1 }); //referencia a persona, nombre de persona
      
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
      const reg = await models.Income.find(
        {
          $or: [
            { voucherNum: new RegExp(value, "i") },
            { voucherSeries: new RegExp(value, "i") },
          ],
        },
        { createdAt: 0 }
        )
        .populate("user", { name: 1 }) //referencia  a usuario,nombre de usuario
        .populate("person", { name: 1 }) //referencia a persona, nombre de persona
        .sort({ createdAt: -1 });
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
      const reg = await models.Income.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 }
        );
        //actualizar Stock
        let details = reg.details;
        details.map((x) => {
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
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.Income.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 }
        );
        //actualizar Stock
        let details = reg.details;
        details.map((x) => {
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
  monthsChart: async(req,res,next)=>{
  
    try {
      const reg = await models.Income.aggregate(
        [
          {
            $group:{
              _id:{
                month:{$month: "$createdAt"},
                year:{$year: "$createdAt"}
              },
              total:{$sum:"$total"},
              num:{$sum:1}
            }
          },
          {
            $sort:{
              "_id.year":-1,"_id.month":-1
            }
          }
        ]
      ).limit(12);
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
      const reg = await models.Income.find({
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

async function increaseStock(idArticle, amount) {
  let { stock } = await models.Article.findOne({
    _id: idArticle,
  });
  let nStock = parseInt(stock) + parseInt(amount);

  const reg = await models.Article.findByIdAndUpdate(
    { _id: idArticle },
    { stock: nStock }
  );
}
async function decreaseStock(idArticle, amount) {
  let { stock } = await models.Article.findOne({
    _id: idArticle,
  });
  let nStock = parseInt(stock) - parseInt(amount);

  const reg = await models.Article.findByIdAndUpdate(
    { _id: idArticle },
    { stock: nStock }
  );
}

import tokenService from "../services/token";
export default {
  checkUser: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "No Token",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (
      response.rol === "admin" ||
      response.rol === "almacen" ||
      response.rol === "vendedor"
    ) {
        next();
    }else{
        return res.status(403).send({
            message: 'Not authorized '
        });
    }
  },
  checkAdmin: async (req, res, next) => {
    if (!req.headers.token) {
        return res.status(404).send({
          message: "No Token",
        });
      }
      const response = await tokenService.decode(req.headers.token);
      if (
        response.rol === "admin"
      ) {
          next();
      }else{
          return res.status(403).send({
              message: 'Not authorized '
          });
      }
  },
  checkGrocer: async (req, res, next) => {
    if (!req.headers.token) {
        return res.status(404).send({
          message: "No Token",
        });
      }
      const response = await tokenService.decode(req.headers.token);
      if (
        response.rol === "admin" ||
        response.rol === "almacenero"
        ) {
          next();
      }else{
          return res.status(403).send({
              message: 'Not authorized '
          });
      }
  },
  checkSales: async (req, res, next) => {
    if (!req.headers.token) {
        return res.status(404).send({
          message: "No Token",
        });
      }
      const response = await tokenService.decode(req.headers.token);
      if (
        response.rol === "admin" ||
        response.rol === "vendedor"
      ) {
          next();
      }else{
          return res.status(403).send({
              message: 'Not authorized '
          });
      }
  },
};

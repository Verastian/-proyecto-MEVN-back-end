import routerx from 'express-promise-router';
import userController from '../controllers/UserController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add',auth.checkAdmin,userController.add);
router.get('/query',auth.checkAdmin,userController.query);
router.get('/list',auth.checkAdmin,userController.list);
router.put('/update',auth.checkAdmin,userController.update);
router.delete('/remove',auth.checkAdmin,userController.remove);
router.put('/activate',auth.checkAdmin,userController.activate);
router.put('/deactivate',auth.checkAdmin,userController.deactivate);
router.post('/login',userController.login);

export default router;
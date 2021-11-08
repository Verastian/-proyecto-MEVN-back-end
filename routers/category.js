import routerx from 'express-promise-router';
import categoryController from '../controllers/CategoryController';
import auth from '../middlewares/auth';

const router = routerx();

//router.post('/add',auth.checkGrocer,categoryController.add);
router.post('/add',categoryController.add);
router.get('/query',auth.checkGrocer,categoryController.query);
/* router.get('/list',auth.checkGrocer,categoryController.list); */
router.get('/list',categoryController.list);
/* router.put('/update',auth.checkGrocer,categoryController.update); */
router.put('/update',categoryController.update);
router.delete('/remove',categoryController.remove);
/* router.delete('/remove',auth.checkGrocer,categoryController.remove); */
router.put('/activate',categoryController.activate);
router.put('/deactivate',categoryController.deactivate);
/* router.put('/activate',auth.checkGrocer,categoryController.activate);
router.put('/deactivate',auth.checkGrocer,categoryController.deactivate);
 */
export default router;
import routerx from 'express-promise-router';
import articleController from '../controllers/ArticleController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add',auth.checkGrocer,articleController.add);
router.get('/query',auth.checkGrocer,articleController.query);
router.get('/queryCode',auth.checkUser,articleController.queryCode);
router.get('/list',auth.checkGrocer,articleController.list);
router.put('/update',auth.checkGrocer,articleController.update);
router.delete('/remove',auth.checkGrocer,articleController.remove);
router.put('/activate',auth.checkGrocer,articleController.activate);
router.put('/deactivate',auth.checkGrocer,articleController.deactivate);

export default router;
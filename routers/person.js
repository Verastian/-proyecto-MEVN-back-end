import routerx from 'express-promise-router';
import personController from '../controllers/PersonController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add',auth.checkUser,personController.add);
router.get('/query',auth.checkUser,personController.query);
router.get('/list',auth.checkUser,personController.list);
router.get('/ClientList',auth.checkUser,personController.ClientList);
router.get('/ProvidersList',auth.checkUser,personController.ProvidersList);
router.put('/update',auth.checkUser,personController.update);
router.delete('/remove',auth.checkUser,personController.remove);
router.put('/activate',auth.checkUser,personController.activate);
router.put('/deactivate',auth.checkUser,personController.deactivate);


export default router;
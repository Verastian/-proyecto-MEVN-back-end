import routerx from 'express-promise-router';
import salesController from '../controllers/SalesController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add',auth.checkSales,salesController.add);
router.get('/query',auth.checkSales,salesController.query);
router.get('/list',auth.checkSales,salesController.list);
router.get('/checkDates',auth.checkUser,salesController.checkDates);
router.get('/monthsChart',auth.checkUser,salesController.monthsChart);
/*
router.put('/update',auth.verifyAlmacenero,salesController.update);
router.delete('/remove',auth.verifyAlmacenero,salesController.remove);
*/
router.put('/activate',auth.checkSales,salesController.activate);
router.put('/deactivate',auth.checkSales,salesController.deactivate);

export default router;
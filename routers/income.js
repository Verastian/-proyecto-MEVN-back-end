import routerx from 'express-promise-router';
import incomeController from '../controllers/IncomeController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add',auth.checkGrocer,incomeController.add);
router.get('/query',auth.checkGrocer,incomeController.query);
router.get('/list',auth.checkGrocer,incomeController.list);
router.get('/checkDates',auth.checkUser,incomeController.checkDates);
router.get('/monthsChart',auth.checkUser,incomeController.monthsChart);
router.put('/activate',auth.checkGrocer,incomeController.activate);
router.put('/deactivate',auth.checkGrocer,incomeController.deactivate);

export default router;
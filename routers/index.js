import routerx from 'express-promise-router';
import categoryRouter from './category';
import articleRouter from './article';
import userRouter from './user';
import personRouter from './person';
import incomeRouter from './income';
import salesRouter from './sales';

const router = routerx();

router.use('/person', personRouter);
router.use('/user', userRouter);
router.use('/article', articleRouter);
router.use('/category', categoryRouter);
router.use('/sales', salesRouter);
router.use('/income', incomeRouter);


export default router;
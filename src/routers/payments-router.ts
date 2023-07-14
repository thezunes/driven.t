import { Router } from 'express';
import { authenticateToken, validateBody } from '../middlewares';
import * as paymentControllers from '@/controllers/payment-controller';

const paymentRouter = Router();

paymentRouter.get('/', authenticateToken, paymentControllers.getPaymentById);

paymentRouter.post('/process', authenticateToken, paymentControllers.paymentProcess);

export { paymentRouter };

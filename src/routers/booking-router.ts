import { Router } from 'express';
import { changeBooking, createBooking, getBooking } from '@/controllers/booking-controller';
import { authenticateToken } from '@/middlewares';

const bookingsRouter = Router();

bookingsRouter.use(authenticateToken);
bookingsRouter.get('/', getBooking);
bookingsRouter.post('/', createBooking);
bookingsRouter.put('/:bookingId', changeBooking);

export { bookingsRouter };

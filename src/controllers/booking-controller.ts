import { Response } from 'express';
import httpStatus from 'http-status';
import bookingsService from '@/services/booking-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const booking = await bookingsService.getBooking(userId);
    res.status(httpStatus.OK).send(booking);
  } catch (error) {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  try {
    const booking = await bookingsService.createBooking(userId, roomId);
    res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function changeBooking(req: AuthenticatedRequest, res: Response) {
  const roomId = req.body.roomId;
  const bookingId = req.params.bookingId;
  try {
    const booking = await bookingsService.changeBooking(Number(bookingId), roomId);
    res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    res.sendStatus(httpStatus.FORBIDDEN);
  }
}

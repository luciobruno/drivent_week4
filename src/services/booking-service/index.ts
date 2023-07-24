import { forbiddenError, notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getBooking(userId: number) {
  const booking = await bookingRepository.getBooking(userId);
  if (!booking) throw notFoundError();
  return booking;
}

async function createBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }
  const room = await bookingRepository.getRoomById(roomId);
  const bookings = await bookingRepository.getAllBookingsByRoomId(roomId);
  if (!room) throw notFoundError();
  if (bookings.length >= room.capacity) throw forbiddenError();
  const booking = await bookingRepository.createBooking(userId, roomId);
  return { bookingId: booking.id };
}

async function changeBooking(bookingId: number, roomId: number) {
  const room = await bookingRepository.getRoomById(roomId);
  if (!room) throw notFoundError();
  const bookings = await bookingRepository.getAllBookingsByRoomId(roomId);
  if (bookings.length >= room.capacity) throw forbiddenError();
  const booking = await bookingRepository.changeBooking(bookingId, roomId);
  return { bookingId: booking.id };
}

const bookingsService = {
  getBooking,
  createBooking,
  changeBooking,
};

export default bookingsService;

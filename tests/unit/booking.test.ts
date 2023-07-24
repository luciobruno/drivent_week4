import faker from '@faker-js/faker';
import bookingsService from '@/services/booking-service';
import { notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';

describe('Booking Service Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('get booking tests', () => {
    it("should return notFoundError when doesn't exist a booking for user", async () => {
      jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(null);
      const response = bookingsService.getBooking(1);
      expect(response).rejects.toEqual(notFoundError());
    });
    it('should return booking when exist', async () => {
      const mock = {
        id: faker.datatype.number(),
        Room: {
          id: faker.datatype.number(),
          hotelId: faker.datatype.number(),
          name: faker.name.jobTitle(),
          capacity: faker.datatype.number(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
      jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(mock);
      const userId = faker.datatype.number();
      const result = await bookingsService.getBooking(userId);
      expect(result).toEqual(mock);
      expect(bookingRepository.getBooking).toHaveBeenCalledWith(userId);
    });
  });
  describe('post booking tests', () => {
    it('should create booking and return bookingId', async () => {
      const mock = { bookingId: faker.datatype.number() };
      jest.spyOn(bookingsService, 'createBooking').mockResolvedValue(mock);
      const roomId = faker.datatype.number();
      const userId = faker.datatype.number();
      const booking = await bookingsService.createBooking(userId, roomId);

      expect(bookingsService.createBooking).toHaveBeenCalledWith(userId, roomId);
      expect(booking).toEqual(mock);
    });
  });
});

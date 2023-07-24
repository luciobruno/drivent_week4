import { prisma } from '@/config';

async function getBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function getBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId: userId,
    },
    include: {
      Room: true,
    },
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      roomId: roomId,
      userId: userId,
    },
  });
}
async function changeBooking(bookingId: number, roomId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId: roomId,
    },
  });
}

async function getRoomById(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
}

async function getAllBookingsByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId: roomId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

const bookingRepository = {
  getBooking,
  createBooking,
  changeBooking,
  getRoomById,
  getAllBookingsByRoomId,
  getBookingByUserId,
};

export default bookingRepository;

import express from 'express';
import { createBooking, getUserBookings } from '../controllers/booking.controller.js';

const router = express.Router();

router.route('/').post(createBooking);
router.route('/:email').get(getUserBookings);

export default router; 
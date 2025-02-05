import express from 'express';
import { createBooking, getUserBookings, confirmBooking, cancelBooking } from '../controllers/booking.controller.js';

const router = express.Router();

router.route('/').post(createBooking);
router.route('/:email').get(getUserBookings);
router.route('/:id/confirm').put(confirmBooking);
router.route('/:id/cancel').put(cancelBooking);



export default router; 
import Booking from "../mongodb/models/booking.js";
import Property from "../mongodb/models/property.js";
import User from "../mongodb/models/user.js";

export const createBooking = async (req, res) => {
    try {
        const { 
            propertyId, 
            startDate, 
            endDate, 
            email 
        } = req.body;

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the property
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        // Calculate total price (example: daily rate * number of days)
        const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
        const totalPrice = property.price * days;

        // Create booking
        const newBooking = await Booking.create({
            property: propertyId,
            user: user._id,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            totalPrice,
            status: 'pending'
        });

        res.status(201).json({ 
            message: "Booking created successfully", 
            booking: newBooking 
        });
    } catch (error) {
        console.error("Booking creation error:", error);
        res.status(500).json({ 
            message: "Error creating booking", 
            error: error.message,
            stack: error.stack
        });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const { email } = req.params;

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find user's bookings
        const bookings = await Booking.find({ user: user._id })
            .populate('property')
            .sort({ createdAt: -1 });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching bookings", 
            error: error.message 
        });
    }
};

export const confirmBooking = async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    booking.status = 'confirmed';
    await booking.save();
    res.status(200).json({ message: "Booking confirmed" });
};

export const cancelBooking = async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    booking.status = 'cancelled';
    await booking.save();
    res.status(200).json({ message: "Booking cancelled" });
};


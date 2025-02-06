import { useState, useEffect } from 'react';
import { 
    Typography, 
    Box, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    Button
} from '@mui/material';

export const BookingsList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user-auth') || '{}');
                
                const response = await fetch(`http://localhost:8080/api/v1/bookings/${user.email}`);
                const data = await response.json();

                if (response.ok) {
                    setBookings(data);
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.error('Fetch bookings error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleConfirm = async (id: string) => {
        const response = await fetch(`http://localhost:8080/api/v1/bookings/${id}/confirm`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            // Update local state to reflect the change
            setBookings(prevBookings => 
                prevBookings.map(booking => 
                    booking._id === id 
                        ? { ...booking, status: 'confirmed' } 
                        : booking
                )
            );
        } else {
            console.error('Failed to confirm booking');
        }
    }

    const handleCancel = async (id: string) => {
        const response = await fetch(`http://localhost:8080/api/v1/bookings/${id}/cancel`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            // Update local state to reflect the change
            setBookings(prevBookings => 
                prevBookings.map(booking => 
                    booking._id === id 
                        ? { ...booking, status: 'cancelled' } 
                        : booking
                )
            );
        } else {
            console.error('Failed to cancel booking');
        }
    }

    if (loading) return <Typography>Loading bookings...</Typography>;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                My Bookings
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Property</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking._id}>
                                <TableCell>{booking.property.title}</TableCell>
                                <TableCell>
                                    {new Date(booking.startDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {new Date(booking.endDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{booking.status}</TableCell>
                                <TableCell>
                                    {booking.status === 'pending' && (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{ mr: 1, mb: 1 }}
                                                onClick={() => handleConfirm(booking._id)}
                                            >
                                                Confirm
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleCancel(booking._id)}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    )}
                                    {booking.status === 'confirmed' && (
                                        <Typography color="primary">Confirmed</Typography>
                                    )}
                                    {booking.status === 'cancelled' && (
                                        <Typography color="error">Cancelled</Typography>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}; 
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
    TableRow 
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}; 
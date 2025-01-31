import { useDelete, useShow } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Stack,
  Paper,
  Grid,
  Chip,
  Divider,
  Avatar,
  Button,
  Rating
} from "@mui/material";
import {
  Place,
  Chat as ChatBubble,
  Delete,
  Edit,
  Phone,
  Home as HomeIcon,
  BathtubOutlined,
  KingBedOutlined,
  SquareFootOutlined,
  LocalParking,
  Verified
} from "@mui/icons-material";

import { CustomButton } from "../../components";

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

export const PropertyDetail: React.FC = () => {
    const navigate = useNavigate();
    const user_data = localStorage.getItem('user-auth');
    const user = user_data ? JSON.parse(user_data) : null;
    const { mutate } = useDelete();
    const { id } = useParams();
    const { queryResult } = useShow({ resource: 'properties', id: id });
    const { data, isLoading, isError } = queryResult;
    const propertyDetails = data?.data ?? {};
    const isCurrentUser = user?.email === propertyDetails.creator?.[0]?.email;

    if (isLoading) return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h5">Loading property details...</Typography>
      </Box>
    );

    if (isError) return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h5" color="error">Something went wrong!</Typography>
      </Box>
    );

    const handleDeleteProperty = () => {
        const response = confirm("Are you sure you want to delete this property?");
        if (response) {
            mutate(
                { resource: "properties", id: id as string },
                { onSuccess: () => navigate("/properties") }
            );
        }
    };

    return (
        <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1200, margin: '0 auto' }}>
            <Paper elevation={0} sx={{ 
              borderRadius: '16px',
              overflow: 'hidden',
              bgcolor: '#fff'
            }}>
                {/* Property Image Section */}
                <Box sx={{ 
                  position: 'relative',
                  height: { xs: 300, md: 500 },
                  width: '100%'
                }}>
                    <img
                        src={propertyDetails.photo}
                        alt={propertyDetails.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                    <Box sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                      p: 3,
                      color: '#fff'
                    }}>
                        <Typography variant="h4" fontWeight="bold">
                            {propertyDetails.title}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                            <Place />
                            <Typography>{propertyDetails.location}</Typography>
                        </Stack>
                    </Box>
                </Box>

                <Grid container spacing={3} sx={{ p: 3 }}>
                    {/* Left Column */}
                    <Grid item xs={12} md={8}>
                        {/* Property Details */}
                        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: '12px', border: '1px solid #eee' }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                <Chip 
                                  icon={<HomeIcon />} 
                                  label={propertyDetails.propertyType} 
                                  color="primary" 
                                  variant="outlined" 
                                />
                                <Typography variant="h5" color="primary" fontWeight="bold">
                                    ${propertyDetails.price}
                                    <Typography component="span" variant="body2" color="text.secondary">
                                        /day
                                    </Typography>
                                </Typography>
                            </Stack>

                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid item xs={6} sm={3}>
                                    <Stack alignItems="center" spacing={1}>
                                        <KingBedOutlined color="action" />
                                        <Typography variant="body2" color="text.secondary">
                                            Bedrooms
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {propertyDetails.bedrooms || 'N/A'}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Stack alignItems="center" spacing={1}>
                                        <BathtubOutlined color="action" />
                                        <Typography variant="body2" color="text.secondary">
                                            Bathrooms
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {propertyDetails.bathrooms || 'N/A'}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Stack alignItems="center" spacing={1}>
                                        <SquareFootOutlined color="action" />
                                        <Typography variant="body2" color="text.secondary">
                                            Square Footage
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {propertyDetails.squareFootage ? 
                                                `${propertyDetails.squareFootage.toLocaleString()} sqft` : 
                                                'N/A'
                                            }
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Stack alignItems="center" spacing={1}>
                                        <LocalParking color="action" />
                                        <Typography variant="body2" color="text.secondary">
                                            Parking Spaces
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {propertyDetails.parkingSpaces || 'N/A'}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            <Typography variant="h6" gutterBottom>Description</Typography>
                            <Typography color="text.secondary" paragraph>
                                {propertyDetails.description}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Right Column */}
                    <Grid item xs={12} md={4}>
                        {/* Agent Card */}
                        <Paper elevation={0} sx={{ p: 3, borderRadius: '12px', border: '1px solid #eee' }}>
                            <Stack alignItems="center" spacing={2}>
                                <Avatar
                                    src={propertyDetails.creator?.[0]?.avatar}
                                    sx={{ width: 80, height: 80 }}
                                />
                                <Stack alignItems="center" spacing={1}>
                                    <Typography variant="h6">
                                        {propertyDetails.creator?.[0]?.name}
                                        <Verified sx={{ ml: 1, color: 'primary.main', width: 20 }} />
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Professional Agent
                                    </Typography>
                                    <Rating value={5} readOnly size="small" />
                                </Stack>

                                <Stack direction="row" spacing={2} width="100%">
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        startIcon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                                        onClick={() => isCurrentUser && navigate(`/properties/edit/${propertyDetails._id}`)}
                                    >
                                        {!isCurrentUser ? "Message" : "Edit"}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        color={!isCurrentUser ? "primary" : "error"}
                                        startIcon={!isCurrentUser ? <Phone /> : <Delete />}
                                        onClick={() => isCurrentUser && handleDeleteProperty()}
                                    >
                                        {!isCurrentUser ? "Call" : "Delete"}
                                    </Button>
                                </Stack>
                            </Stack>
                        </Paper>

                        {/* Map Preview */}
                        <Paper 
                          elevation={0} 
                          sx={{ 
                            mt: 3, 
                            borderRadius: '12px', 
                            overflow: 'hidden',
                            border: '1px solid #eee' 
                          }}
                        >
                            <img
                                src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
                                alt="Location map"
                                style={{ width: '100%', height: 200, objectFit: 'cover' }}
                            />
                        </Paper>

                        {/* Book Now Button */}
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ mt: 3, py: 1.5 }}
                        >
                            Book Now
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};
import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  Box, 
  Stack, 
  Paper, 
  Grid, 
  Chip 
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
} from "../../components";

import { fetchUKPropertyMarketUpdates } from '../../utils/ukPropertyMarketData';

export const Home: React.FC = () => {
  const [marketUpdates, setMarketUpdates] = useState<{
    topRegions: Array<{
      name: string;
      averageSalePrice: number;
      averageRent: number;
      priceChange: number;
      rentChange: number;
    }>;
    topRegionsAverage: {
      name: string;
      averageSalePrice: number;
      averageRent: number;
      averagePriceChange: string;
    };
    lastUpdated: string;
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [marketData] = await Promise.all([
          fetchUKPropertyMarketUpdates()
        ]);
        
        setMarketUpdates(marketData);
      } catch (error) {
        console.error('Error loading data', error);
      }
    };

    loadData();
  }, []);

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      {/* UK Property Market Updates */}
      {marketUpdates && (
        <Paper 
          elevation={3} 
          sx={{ 
            mt: 4, 
            p: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #f4f6f8 100%)',
            borderRadius: '16px',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              color: '#2D3748',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 3
            }}
          >
            🇬🇧 UK Property Market Update
          </Typography>
          {/* Top 5 Regions */}
          <Typography variant="h6" sx={{ mb: 2, color: '#4A5568' }}>
            Top 5 Performing Regions
          </Typography>
          <Grid container spacing={2}>
            {marketUpdates.topRegions?.map((region, index) => (
              <Grid item xs={12} key={region.name}>
                <Paper 
                  sx={{ 
                    p: 2.5,
                    border: '1px solid #eee',
                    borderLeft: '4px solid',
                    borderLeftColor: index === 0 ? 'primary.main' : 'grey.300',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="h6" color="primary" sx={{ minWidth: '24px' }}>
                          #{index + 1}
                        </Typography>
                        <Typography variant="h6">
                          {region.name}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Stack spacing={0.5}>
                        <Typography variant="body2" color="text.secondary">
                          Average Sale Price
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body1" fontWeight="bold">
                            £{region.averageSalePrice.toLocaleString()}
                          </Typography>
                          <Chip 
                            size="small"
                            label={`${region.priceChange > 0 ? '+' : ''}${region.priceChange}%`}
                            color={region.priceChange > 0 ? 'success' : 'error'}
                          />
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Stack spacing={0.5}>
                        <Typography variant="body2" color="text.secondary">
                          Average Rent
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body1" fontWeight="bold">
                            £{region.averageRent.toLocaleString()}/mo
                          </Typography>
                          <Chip 
                            size="small"
                            label={`${region.rentChange > 0 ? '+' : ''}${region.rentChange}%`}
                            color={region.rentChange > 0 ? 'success' : 'error'}
                          />
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>

         {/* Top Regions Averages */}
        


          <Typography 
            variant="caption" 
            display="block" 
            sx={{ 
              mt: 2,
              color: '#718096',
              textAlign: 'right'
            }}
          >
            Last Updated: {marketUpdates.lastUpdated}
          </Typography>
        </Paper>
      )}

<Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
            title="Properties for Sale"
            value={ 684}
            series={[75, 25]}
            colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
            title="Properties for Rent"
            value={550}
            series={[60, 40]}
            colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
            title="Total customers"
            value={5684}
            series={[75, 25]}
            colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
            title="Properties for Cities"
            value={555}
            series={[75, 25]}
            colors={["#275be8", "#c4e8ef"]}
        />
      </Box>
      
      <Stack mt="25px" width="100%"
      direction={{xs: 'column', lg: 'row'}}>
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
    </Box>
  )
}
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
import { fetchLastYearPropertyData } from '../../utils/propertyDataFetcher';
import { fetchUKPropertyMarketUpdates } from '../../utils/ukPropertyMarketData';

export const Home: React.FC = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [marketUpdates, setMarketUpdates] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [propertyResults, marketData] = await Promise.all([
          fetchLastYearPropertyData(),
          fetchUKPropertyMarketUpdates()
        ]);
        
        setPropertyData(propertyResults);
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

      {/* UK Property Market Updates */}
      {marketUpdates && (
        <Paper 
          elevation={3} 
          sx={{ 
            mt: 4, 
            p: 3, 
            backgroundColor: '#f4f4f4' 
          }}
        >
          <Typography variant="h6" gutterBottom>
            🇬🇧 UK Property Market Update
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                🏠 Average Sale Price: £{marketUpdates.averageSalePrice.toLocaleString()}
                <Chip 
                  icon={marketUpdates.salePriceChange > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                  label={`${Math.abs(marketUpdates.salesPriceChange)}%`} 
                  color={marketUpdates.salesPriceChange > 0 ? 'success' : 'error'}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Typography>
              <Typography variant="body1">
                🏢 Average Rent: £{marketUpdates.averageRent}/month
                <Chip 
                  icon={marketUpdates.rentChange > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                  label={`${Math.abs(marketUpdates.rentChange)}%`} 
                  color={marketUpdates.rentChange > 0 ? 'success' : 'error'}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Top Performing Regions:
                {marketUpdates.topPerformingRegions.map(region => (
                  <Chip 
                    key={region} 
                    label={region} 
                    size="small" 
                    sx={{ ml: 1, mt: 1 }} 
                  />
                ))}
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Last Updated: {marketUpdates.lastUpdated}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}

      <Stack mt="25px" width="100%"
      direction={{xs: 'column', lg: 'row'}}>
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
    </Box>
  )
}
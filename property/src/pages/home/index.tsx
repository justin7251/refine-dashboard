import { Typography, Box, Stack } from '@mui/material'

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
} from "./components";

export const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>
      <Box>
        <PieChart />
      </Box>
    </Box>
  )
}
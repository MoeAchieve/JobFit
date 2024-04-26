import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box, Card } from '@mui/material';

//TODO: Edit to be same as Job component structure

export default function JobsSkeleton() {
  return (
    [...Array(10)].map((_, index) => (
      <Card
        variant="outlined"
        key={index}
        sx={{
          my: 1,
          display: "flex",
          alignItems: "center",
          px: 1,
          py: 2,
          gap: 2,
        }}
    >
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Box width="40%">
          <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} />
          <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
        </Box>
    </Card >
    ))
  );
}

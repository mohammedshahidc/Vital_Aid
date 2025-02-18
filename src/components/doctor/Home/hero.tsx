
'use client'
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Doctor from "../../../../public/Doctor.png";

function Hero() {

  const username=localStorage.getItem('username')

  
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 3,
      }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="space-between" sx={{ width: '100%', maxWidth: 1200, px: 4 }}>
        
        {/* Text container */}
        <Grid item xs={12} md={6} textAlign={{ xs: 'center', md: 'left' }}>
          <Typography variant="h4" sx={{ color: 'green', fontWeight: 'lighter' }}>
            Welcome <br />
            {username && username}
          </Typography>
        </Grid>

        {/* Image container */}
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <Image
            src={Doctor}
            alt="Doctor illustration"
            width={450}
            height={400}
            className="rounded-lg"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Hero;


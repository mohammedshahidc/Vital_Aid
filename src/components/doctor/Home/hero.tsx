"use client";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

function Hero() {
  const username =
    typeof window !== "undefined" ? localStorage.getItem("username") : "";

  return (
    <div className="bg-white min-h-screen">
      <Box
        sx={{
          backgroundColor: "white",
          height: "85vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: { md: "160px", xs: "0" },
          width: { md: "calc(100% - 260px)", xs: "100%" },
        }}
      >
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 4 }}
        >
          <Grid item xs={12} md={6} textAlign={{ xs: "center", md: "left" }}>
            <Typography
              variant="h4"
              sx={{ color: "green", fontWeight: "lighter" }}
            >
              Welcome <br />
              {username && username}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Image
              src="/Doctor.png"
              alt="Doctor illustration"
              width={450}
              height={400}
              className="rounded-lg"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Hero;

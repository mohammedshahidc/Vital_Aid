"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Typography, Box, Divider, useMediaQuery } from "@mui/material";
import { Menu, Message, Event, RateReview, AccountCircle } from "@mui/icons-material";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ sidebarOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  
  const showSidebar = pathname !== "/doctor/message";

  useEffect(() => {
    if (pathname === "/doctor/message") {
      toggleSidebar(); // Hide sidebar when entering message page
    }
  }, [pathname]);

  return (
    <>
      {/* Sidebar Toggle Button (Small Screens) */}
      {isSmallScreen && showSidebar && (
        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: "absolute",
            top: 15,
            left: 15,
            bgcolor: "#e3f2fd",
            color: "#0277bd",
            "&:hover": { bgcolor: "#bbdefb" },
          }}
        >
          <Menu />
        </IconButton>
      )}

      <Drawer
        variant={isSmallScreen ? "temporary" : "persistent"}
        anchor="left"
        open={showSidebar && sidebarOpen}
        onClose={toggleSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: 260,
            color: "#0277bd",
            position: "fixed",
            top: isSmallScreen ? 0 : "64px",
            height: isSmallScreen ? "100%" : "calc(100% - 64px)",
            borderRadius: isSmallScreen ? "0px" : "0px 15px 15px 0px",
            boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      >

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, py: 3 }}>
          <AccountCircle sx={{ fontSize: 32, color: "#0277bd" }} />
          <Typography variant="h6" fontWeight="bold">Doctor Panel</Typography>
        </Box>

        <Divider sx={{ bgcolor: "#90caf9", mx: 2 }} />

    
        <List>
          {[
            { text: "Profile", icon: <AccountCircle />, url: "/doctor/profile" },
            { text: "Messages", icon: <Message />, url: "/doctor/message" },
            { text: "Appointments", icon: <Event />, url: "/doctor/tokens" },
            { text: "Reviews", icon: <RateReview />, url: "/doctor/reviews" },
          ].map((item, index) => (
            <ListItem key={index} disablePadding>
              <Link href={item.url} passHref style={{ width: "100%", textDecoration: "none", color: "inherit" }}>
                <ListItemButton
                  onClick={() => isSmallScreen && toggleSidebar()}
                  sx={{
                    borderRadius: 2,
                    mx: 2,
                    my: 1,
                    bgcolor: pathname === item.url ? "#bbdefb" : "transparent",
                    color: pathname === item.url ? "#01579b" : "inherit",
                    "&:hover": { bgcolor: "#bbdefb", color: "#01579b" },
                  }}
                >
                  <ListItemIcon sx={{ color: "#0277bd" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} sx={{ fontWeight: "bold" }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

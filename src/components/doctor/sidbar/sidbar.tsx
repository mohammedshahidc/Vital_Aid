"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  Box,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import {
  Menu,
  Dashboard,
  Event,
  Message,
  RateReview,
  Visibility,
} from "@mui/icons-material";
import Image from "next/image";
import { useAppSelector } from "@/lib/store/hooks";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ sidebarOpen, toggleSidebar }: SidebarProps) {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);
  const router=useRouter()
  const pathname = usePathname();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const showSidebar = pathname !== "/doctor/message";

  useEffect(() => {
    if (pathname === "/doctor/message") {
      toggleSidebar();
    }
  }, [pathname, toggleSidebar]);

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, url: "/doctor" },
    { text: "Appointments", icon: <Event />, url: "/doctor/tokens" },
    { text: "Messages", icon: <Message />, url: "/doctor/message" },
    { text: "Reviews", icon: <RateReview />, url: "/doctor/reviews" },
  ];

  return (
    <>
      {isSmallScreen && showSidebar && (
        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: "absolute",
            top: 15,
            left: 15,
            bgcolor: "rgba(66, 165, 245, 0.1)",
            color: "#42a5f5",
            "&:hover": { bgcolor: "rgba(66, 165, 245, 0.2)" },
            zIndex: 1300,
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
            width: 250,
            background: "white",
            color: "#333",
            position: "fixed",
            top: 0,
            height: "100vh",
            border: "none",
            
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
          <Box sx={{ display: "flex", alignItems: "center"}}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "#42a5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Typography
                sx={{ color: "white", fontWeight: "bold", fontSize: "18px" }}
              >
                V
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontSize: "18px", color: "#333" }}
              >
                <Image src={"/VitalAid.png"} width={80} height={100} alt="lo" />
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: 1, py: 2 }}>
          <List sx={{ px: 2 }}>
            {menuItems.map((item, index) => {
              const isActive = pathname === item.url;
              return (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <Link
                    href={item.url}
                    passHref
                    style={{
                      width: "100%",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <ListItemButton
                      onClick={() => isSmallScreen && toggleSidebar()}
                      sx={{
                        borderRadius: "12px",
                        py: 1.5,
                        px: 2,
                        bgcolor: isActive
                          ? "rgba(66, 165, 245, 0.1)"
                          : "transparent",
                        border: isActive
                          ? "1px solid rgba(66, 165, 245, 0.3)"
                          : "1px solid transparent",
                        "&:hover": {
                          bgcolor: "rgba(66, 165, 245, 0.08)",
                        },
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: isActive ? "#42a5f5" : "#666",
                          minWidth: "40px",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{
                          "& .MuiListItemText-primary": {
                            fontWeight: isActive ? "600" : "400",
                            fontSize: "14px",
                            color: isActive ? "#42a5f5" : "#333",
                          },
                        }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Box sx={{ p: 3, borderTop: "1px solid #e0e0e0" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#42a5f5",
                color: "white",
                mr: 2,
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {user?.name?.
                split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: "600", fontSize: "14px", color: "#333" }}
              >
                {user?.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#666", fontSize: "12px" }}
              >
                Cardiologist
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              size="small"
              sx={{
                flex: 1,
                color: "#42a5f5",
                border: "1px solid rgba(66, 165, 245, 0.3)",
                fontSize: "11px",
                py: 0.5,
                "&:hover": {
                  bgcolor: "rgba(66, 165, 245, 0.08)",
                  border: "1px solid rgba(66, 165, 245, 0.5)",
                },
              }}
              startIcon={<Visibility sx={{ fontSize: "14px" }} />}
              onClick={() => router.push("/doctor/profile")}
            >
              View Profile
            </Button>
           
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

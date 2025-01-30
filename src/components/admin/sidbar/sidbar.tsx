"use client";

"use client";

import React, { useState } from "react";
import {
  Card,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventIcon from "@mui/icons-material/Event";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";


const Sidebar = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (panel: number) => {
    setOpen(open === panel ? null : panel);
  };

  return (
    <>

      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-transparent text-gray-500 p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoClose size={24} /> : <FaBars size={24} />}
      </button>

      <div
        className={`fixed inset-y-0 left-0  rounded-3xl bg-sky-50 dark:bg-gray-900 border-r border-gray-200 shadow-md transform transition-transform duration-300 z-40 w-64 flex flex-col h-screen ${isOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
      >
        <div className="flex justify-center pt-3 pb-4">
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          Admin Panel
        </Typography>
        </div>
        
        <Card
          sx={{
            height: "100vh",
            padding: 2,
            boxShadow: 3,
            bgcolor: "background.paper",
          }}
        >
          <List>
            <Accordion expanded={open === 1} onChange={() => handleOpen(1)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <Typography>Users</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <Link
                    href="/admin/usersList"
                    style={{ textDecoration: "none", color: "inherit" }}
                    
                  >
                    <ListItemButton onClick={() => setIsOpen(!isOpen)}>
                      <ListItemText primary="Active Users" />
                    </ListItemButton>
                  </Link>
                  <Link
                    href="/admin/blockedList"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemText primary="Blocked Users" />
                    </ListItemButton>
                  </Link>
                 
                </List>
              </AccordionDetails>
            </Accordion>
          </List>
          <List>
            <Accordion expanded={open === 2} onChange={() => handleOpen(2)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <Typography>Doctors</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <Link
                    href=""
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemText primary="Active Doctors" />
                    </ListItemButton>
                  </Link>
                  <Link
                    href="/Admin-pendinglist"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemText primary="Add Doctors" />
                    </ListItemButton>
                  </Link>
                </List>
              </AccordionDetails>
            </Accordion>
          </List>
          <List>
            <Accordion expanded={open === 3} onChange={() => handleOpen(3)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <Typography>Appoinment</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <Link
                    href="/Admin-listing"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemText primary="All Appoinments" />
                    </ListItemButton>
                  </Link>

                </List>
              </AccordionDetails>
            </Accordion>
          </List>
          <List>
            <Accordion expanded={open === 4} onChange={() => handleOpen(4)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <Typography>Events</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <Link
                    href="/Admin-listing"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemText primary="All Events" />
                    </ListItemButton>
                  </Link>
                  <Link
                    href="/Admin-pendinglist"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemText primary="Create Events" />
                    </ListItemButton>
                  </Link>
                </List>
              </AccordionDetails>
            </Accordion>
          </List>
          <List>
            <Accordion expanded={open === 5} onChange={() => handleOpen(5)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItemIcon>
                  <BloodtypeIcon />
                </ListItemIcon>
                <Typography>Blood Donors</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <Link
                    href="/Admin-listing"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemText primary="All Donors" />
                    </ListItemButton>
                  </Link>
                  <Link
                    href="/Admin-pendinglist"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemText primary=" Add a Donor" />
                    </ListItemButton>
                  </Link>
                </List>
              </AccordionDetails>
            </Accordion>
          </List>
          <List>
            <Accordion expanded={open === 6} onChange={() => handleOpen(6)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItemIcon>
                  <VolunteerActivismIcon />
                </ListItemIcon>
                <Typography>Volunteers</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <Link
                    href="/Admin-listing"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemText primary="All Volunteers" />
                    </ListItemButton>
                  </Link>
                  <Link
                    href="/Admin-pendinglist"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemText primary="Add volunteer" />
                    </ListItemButton>
                  </Link>
                </List>
              </AccordionDetails>
            </Accordion>
          </List>
          <List>
            <Accordion expanded={open === 7} onChange={() => handleOpen(7)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItemIcon>
                  <MedicalServicesIcon />
                </ListItemIcon>
                <Typography>Equipments</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <Link
                    href="/Admin-listing"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemText primary="All Equipment" />
                    </ListItemButton>
                  </Link>
                  <Link
                    href="/Admin-pendinglist"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemText primary="Add Equipments" />
                    </ListItemButton>
                  </Link>
                </List>
              </AccordionDetails>
            </Accordion>
          </List>
        </Card>
      </div>


      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;

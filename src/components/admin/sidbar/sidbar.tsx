"use client";

import React, { useState } from "react";
import {
  Card,
  Typography,
  Accordion,
  AccordionSummary,
  List,
  ListItemIcon,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

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
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';


const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(false);

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
            <Accordion >
              <Link href={"/admin/usersList"}>
                <AccordionSummary>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <Typography>Users</Typography>
                </AccordionSummary>
              </Link>
            </Accordion>
          </List>
          <List>
            <Accordion >
              <Link href={"/admin/doctors"}>
                <AccordionSummary>
                  <ListItemIcon>
                    <LocalHospitalIcon />
                  </ListItemIcon>
                  <Typography>Doctors</Typography>
                </AccordionSummary>
              </Link>
            </Accordion>
          </List>
          <List>
            <Accordion >
              <Link href={""}>
                <AccordionSummary>
                  <ListItemIcon>
                    <CalendarMonthIcon />
                  </ListItemIcon>
                  <Typography>Appoinment</Typography>
                </AccordionSummary>
              </Link>
            </Accordion>
          </List>
          <List>
            <Accordion >
              <Link href={"/admin/allEvents"}>
                <AccordionSummary>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <Typography>Events</Typography>
                </AccordionSummary>
              </Link>
            </Accordion>
          </List>
          <List>
            <Accordion >
              <Link href={"/admin/donorsTable"}>
                <AccordionSummary>
                  <ListItemIcon>
                    <BloodtypeIcon />
                  </ListItemIcon>
                  <Typography>Blood Donors</Typography>
                </AccordionSummary>
              </Link>
            </Accordion>
          </List>
          <List>
            <Accordion >
              <Link href={"/admin/volunteers/list"}>
                <AccordionSummary>
                  <ListItemIcon>
                    <VolunteerActivismIcon />
                  </ListItemIcon>
                  <Typography>Volunteers</Typography>
                </AccordionSummary>
              </Link>
            </Accordion>
          </List>
          <List>
            <Accordion >
              <Link href={"/admin/equipments/list"}>
                <AccordionSummary>
                  <ListItemIcon>
                    <MedicalServicesIcon />
                  </ListItemIcon>
                  <Typography>Equipments</Typography>
                </AccordionSummary>
              </Link>
            </Accordion>
          </List>
          <List>
            <Accordion >
              <Link href={"/admin/requests"}>
                <AccordionSummary>
                  <ListItemIcon>
                    <AddCardOutlinedIcon/>
                  </ListItemIcon>
                  <Typography>Equipment Requests</Typography>
                </AccordionSummary>
              </Link>
            </Accordion>
          </List>
          <List>
          <Accordion>
  <Link href={"/admin/allDonations"}>
    <AccordionSummary>
      <ListItemIcon>
        <MonetizationOnIcon /> {/* Use an appropriate icon for donations */}
      </ListItemIcon>
      <Typography>Donations</Typography>
    </AccordionSummary>
  </Link>
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

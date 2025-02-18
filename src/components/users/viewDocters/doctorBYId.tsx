
// "use client";

// import React from "react";
// import { useParams } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import { fetchDoctorById } from "@/lib/Query/hooks/doctorById";
// import {
//   Box,
//   Card,
//   CardContent,
//   Avatar,
//   Typography,
//   Button,
//   CircularProgress,
//   Alert,
//   Grid,
//   Divider,
// } from "@mui/material";
// import Link from "next/link";

// interface DoctorInfo {
//   email: string;
//   name: string;
//   phone: string;
//   _id: string;
// }

// interface DoctorData {
//   description: string;
//   doctor: DoctorInfo;
//   profileImage: string;
//   qualification: string[];
//   specialization: string[];
//   hospital: string;
//   address: string;
// }

// export default function Doctor() {
//   const { id } = useParams();

//   const { data, error, isLoading } = useQuery<DoctorData>({
//     queryKey: ["doctor", id],
//     queryFn: () => fetchDoctorById(id as string),
//     enabled: !!id,
//   });

//   if (isLoading)
//     return (
//       <Box textAlign="center" py={10}>
//         <CircularProgress />
//         <Typography variant="h6" mt={2}>
//           Loading doctor details...
//         </Typography>
//       </Box>
//     );

//   if (error)
//     return (
//       <Box textAlign="center" py={10}>
//         <Alert severity="error">
//           Error fetching doctor details: {(error as Error).message}
//         </Alert>
//       </Box>
//     );

//   if (!data)
//     return (
//       <Box textAlign="center" py={10}>
//         <Typography variant="h6" color="gray">
//           No doctor details found
//         </Typography>
//       </Box>
//     );

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" py={4} px={2}>
//       {/* Doctor Profile Section */}
//       <Card
//         sx={{
//           maxWidth: 900,
//           width: "100%",
//           p: 3,
//           borderRadius: 3,
//           boxShadow: 3,
//         }}
//       >
//         <Grid container spacing={3} alignItems="center">
//           {/* Doctor Image */}
//           <Grid item xs={12} md={4} display="flex" justifyContent="center">
//             <Avatar
//               src={data.profileImage || "/doctor.jpg"}
//               alt="Doctor Profile"
//               sx={{
//                 width: 140,
//                 height: 140,
//                 border: "3px solid #e0e0e0",
//               }}
//             />
//           </Grid>

//           {/* Doctor Info */}
//           <Grid item xs={12} md={8}>
//             <Typography variant="h4" fontWeight="bold">
//               {data.doctor.name}
//             </Typography>
//             <Typography variant="h6" color="primary" fontWeight="500" mt={1}>
//               {data.specialization.join(", ")}
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               {data.hospital}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" mt={1}>
//               📍 {data.address}
//             </Typography>

//             <Link href={`/user/doctors/booking/${data.doctor._id}`} passHref>
//               <Button
//                 variant="contained"
//                 color="error"
//                 sx={{ mt: 3, px: 4, py: 1, fontSize: 16 }}
//               >
//                 Book Appointment
//               </Button>
//             </Link>
//           </Grid>
//         </Grid>
//       </Card>

//       {/* About Section */}
//       <Card
//         sx={{
//           maxWidth: 900,
//           width: "100%",
//           mt: 4,
//           p: 3,
//           borderRadius: 3,
//           boxShadow: 3,
//           bgcolor: "background.paper",
//         }}
//       >
//         <CardContent>
//           <Typography variant="h5" fontWeight="bold" color="text.primary" gutterBottom>
//             About
//           </Typography>
//           <Typography variant="body1" color="text.secondary" paragraph>
//             {data.description}
//           </Typography>

//           <Divider sx={{ my: 2 }} />

//           {/* Qualifications */}
//           <Typography variant="h6" fontWeight="bold" color="text.primary" mt={2}>
//             Qualifications
//           </Typography>
//           <Box component="ul" sx={{ pl: 2, color: "text.secondary" }}>
//             {data.qualification.map((qual, index) => (
//               <Typography component="li" key={index} variant="body2">
//                 {qual}
//               </Typography>
//             ))}
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctorById } from "@/lib/Query/hooks/doctorById";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Link from "next/link";

interface DoctorInfo {
  email: string;
  name: string;
  phone: string;
  _id: string;
}

interface DoctorData {
  description: string;
  doctor: DoctorInfo;
  profileImage: string;
  qualification: string[];
  specialization: string[];
  hospital: string;
  address: string;
  experience: string;
  consultationFee: string;
  availability: string;
}

export default function Doctor() {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery<DoctorData>({
    queryKey: ["doctor", id],
    queryFn: () => fetchDoctorById(id as string),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <Box textAlign="center" py={10}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Loading doctor details...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" py={10}>
        <Alert severity="error">
          Error fetching doctor details: {(error as Error).message}
        </Alert>
      </Box>
    );

  if (!data)
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h6" color="gray">
          No doctor details found
        </Typography>
      </Box>
    );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" py={4} px={2}>
      {/* Doctor Profile Section */}
      <Card sx={{ maxWidth: 900, width: "100%", p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4} display="flex" justifyContent="center">
            <Avatar
              src={data.profileImage || "/doctor.jpg"}
              alt="Doctor Profile"
              sx={{ width: 140, height: 140, border: "3px solid #e0e0e0" }}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h4" fontWeight="bold">
              {data.doctor.name}
            </Typography>
            <Typography variant="h6" color="primary" fontWeight="500" mt={1}>
              {data.specialization.join(", ")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {data.hospital}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              📍 {data.address}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              📞 {data.doctor.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              ✉️ {data.doctor.email}
            </Typography>

            <Link href={`/user/doctors/booking/${data.doctor._id}`} passHref>
              <Button variant="contained" color="error" sx={{ mt: 3, px: 4, py: 1, fontSize: 16 }}>
                Book Appointment
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Card>

      {/* About & Additional Details */}
      <Card sx={{ maxWidth: 900, width: "100%", mt: 4, p: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            About
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {data.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight="bold" color="text.primary" mt={2}>
            Qualifications
          </Typography>
          <List dense>
            {data.qualification.map((qual, index) => (
              <ListItem key={index}>
                <ListItemText primary={qual} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight="bold" color="text.primary" mt={2}>
            Additional Information
          </Typography>
          <List dense>
            
            <ListItem>
              <ListItemText primary={`Consultation Fee: ${data.consultationFee||'Free'}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Availability: ${data.availability}`} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
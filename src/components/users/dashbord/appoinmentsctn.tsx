import { Button, Card, CardContent, Chip } from "@mui/material";
import React from "react";
import { FaStethoscope } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGetTokenForUser } from "@/lib/Query/hooks/addToken";
import { useAppSelector } from "@/lib/store/hooks";
import EventIcon from "@mui/icons-material/Event";
import { MdRefresh } from "react-icons/md";

function Appoinmentsctn() {
  const Router = useRouter();

  const { user } = useAppSelector((state) => state.auth);
  const { tokens ,refetch} = useGetTokenForUser(user?.id ?? "");
  console.log(tokens);
  
  return (
    <>
      <Card className="shadow-lg rounded-xl overflow-hidden border-t-4 border-teal-400">
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-teal-50 to-white">
          <div className="flex justify-start">
          <h3 className="text-lg font-semibold text-gray-500 flex items-center">
            <FaStethoscope className="mr-2 h-4 w-4" />
            Appointment History
          </h3>
          </div>
         <div className="flex justify-end gap-2">
         <Button
            variant="outlined"
            color="success"
            size="small"
            onClick={() => Router.push("/user/doctors")}
          >
            + New Appointment
          </Button>
          <MdRefresh  size={29} className="text-teal-500" onClick={()=>refetch()}/>
         </div>
          
        </div>

        <CardContent className="space-y-3 max-h-48 overflow-y-auto scrollbar-none p-4">
          {tokens.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <FaStethoscope
                className="text-gray-300 mb-2"
                style={{ fontSize: 36 }}
              />
              
              <Button
                variant="text"
                size="small"
                color="success"
                className="mt-2"
                onClick={() => Router.push("/user/doctors")}
              >
                Book your first appointment
              </Button>
            </div>
          ) : (
            tokens.map(
              (appointment: {
                _id: string;
                doctorId: { name: string ,_id: string};
                date: string;
              }) => (
                <div
                  key={appointment._id}
                  className="p-3 bg-gradient-to-r from-green-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all border-l-4 border-teal-400"
                >
                  <div className="flex justify-between items-center cursor-pointer" onClick={()=>Router.push(`/user/doctors/doctor/${appointment?.doctorId?._id}`)}>
                    <div className="font-medium" >
                      Dr. {appointment?.doctorId?.name}
                    </div>
                    <Chip
                      label={appointment.date}
                      size="small"
                      color="success"
                      variant="outlined"
                      icon={<EventIcon fontSize="small" />}
                    />
                  </div>
                </div>
              )
            )
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default Appoinmentsctn;

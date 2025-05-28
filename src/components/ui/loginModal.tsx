
import React from "react";
import { Modal, Box, Button } from "@mui/material";
import { setType } from "@/lib/store/features/userSlice";
import { useAppDispatch } from "@/lib/store/hooks";

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
    const dispatch = useAppDispatch()

    const handleTypeChange = (type: string) => {
        dispatch(setType(type));
        onClose()
    };


    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 300,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Button
                    variant="contained"
                    className="bg-green-500"
                    fullWidth
                    onClick={() => handleTypeChange("User")}
                    sx={{ mb: 2 }}
                >
                    User
                </Button>

                <Button
                    variant="contained"
                    className="bg-blue-500"
                    fullWidth
                    onClick={() => handleTypeChange("Doctor")}
                    sx={{ mb: 2 }}
                >
                    Doctor
                </Button>
                <Button
                    variant="contained"
                    className="bg-purple-500"
                    fullWidth
                    onClick={() => handleTypeChange("Admin")}
                    
                >
                    Admin
                </Button>

            </Box>
        </Modal>
    );
};

export default LoginModal;

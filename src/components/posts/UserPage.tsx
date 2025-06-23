import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UpdateUserForm from "./UpdateUserForm";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../services/usersApi";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  Button,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: user,
    error,
    isLoading,
    isFetching,
    refetch,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    memoFullName, //can be used in some component for the card
  } = useGetUserQuery(Number(id), {
    selectFromResult: (result) => ({
      ...result,
      memoFullName: result.data
        ? `${result.data.first_name} ${result.data.last_name}`
        : "",
    }),
  });
  const [showSuccess, setShowSuccess] = useState(false);

  if (isLoading || isFetching)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  if (error || !user)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">User not found</Typography>
      </Box>
    );

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Home Page
        </Button>
      </Box>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
          boxShadow: "0 8px 32px 0 rgba(255,152,0,0.2)",
          border: "2px solid #ff9800",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            src={user.avatar}
            alt={user.first_name}
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#ff9800",
              color: "#fff",
              border: "3px solid #ffa726",
              boxShadow: "0 4px 16px 0 rgba(255,152,0,0.25)",
            }}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography color="text.secondary">{user.email}</Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom>
          Edit User
        </Typography>
        <UpdateUserForm
          id={user.id}
          initialValues={{
            name: `${user.first_name} ${user.last_name}`,
            job: "",
          }}
          onSuccess={() => {
            setShowSuccess(true);
            refetch();
          }}
        />
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            User updated successfully!
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default UserPage;

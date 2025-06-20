import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UpdateUserForm from "./UpdateUserForm";
import { useGetUserQuery } from "../../services/usersApi";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: user,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetUserQuery(Number(id));
  const [showSuccess, setShowSuccess] = useState(false);

  if (isLoading)
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
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            src={user.avatar}
            alt={user.first_name}
            sx={{ width: 80, height: 80 }}
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
        {isFetching && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress size={28} />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default UserPage;

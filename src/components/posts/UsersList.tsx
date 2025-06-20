import React, { useState } from "react";
import { useListUsersQuery } from "../../services/usersApi";
import AddUserForm from "./AddUserForm";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";


const UsersList = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, refetch, isFetching } = useListUsersQuery({
    page,
  });

  if (isLoading)
    return (
      <Container
        maxWidth="md"
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  if (error)
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Error loading users</Alert>
      </Container>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Users List
      </Typography>
      <Grid container spacing={3}>
        {data?.data.map((user) => (
          <Grid key={user.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="140"
                image={user.avatar}
                alt={user.first_name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component={Link}
                  to={`/posts/${user.id}`}
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={data?.total_pages || 1}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          shape="rounded"
        />
      </Box>
      <Box mt={4}>
        <AddUserForm refetchUsers={refetch} isFetchingUsers={isFetching} />
      </Box>
    </Container>
  );
};

export default UsersList;

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
  const { data, error, isLoading, refetch, isFetching } = useListUsersQuery(
    { page },
    { pollingInterval: 30000 }
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
      {isLoading || isFetching ? (
        <Container
          maxWidth="md"
          sx={{ mt: 4, display: "flex", justifyContent: "center" }}
        >
          <CircularProgress />
        </Container>
      ) : (
        <Grid container spacing={3}>
          {data?.data.map((user) => (
            <Grid key={user.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "2px solid #ff9800",
                  borderRadius: 3,
                  boxShadow: "0 4px 24px 0 rgba(255,152,0,0.12)",
                  background:
                    "linear-gradient(135deg, #fffde7 0%, #ffe0b2 100%)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px) scale(1.03)",
                    boxShadow: "0 8px 32px 0 rgba(255,152,0,0.22)",
                    borderColor: "#ffa726",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={user.avatar}
                  alt={user.first_name}
                  sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottom: "2px solid #ffb74d",
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component={Link}
                    to={`/posts/${user.id}`}
                    sx={{
                      textDecoration: "none",
                      color: "#ff9800",
                      fontWeight: "bold",
                    }}
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
      )}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={data?.total_pages || 1}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#ff9800",
              fontWeight: "bold",
              fontFamily: "Montserrat, Arial, sans-serif",
              borderColor: "#ff9800",
            },
            "& .Mui-selected": {
              backgroundColor: "#ff9800 !important",
              color: "#fff !important",
              borderRadius: "8px",
              boxShadow: "0 2px 8px 0 rgba(255,152,0,0.15)",
            },
            "& .MuiPaginationItem-ellipsis": {
              color: "#ffb74d",
            },
          }}
        />
      </Box>
      <Box mt={4}>
        <AddUserForm refetchUsers={refetch} isFetchingUsers={isFetching} />
      </Box>
    </Container>
  );
};

export default UsersList;

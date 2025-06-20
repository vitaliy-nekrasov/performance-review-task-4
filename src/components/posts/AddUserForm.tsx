import React, { useState, useEffect } from "react";
import { useCreateUserMutation } from "../../services/usersApi";
import UserForm from "./UserForm";
import { Snackbar, Alert, CircularProgress, Box } from "@mui/material";

interface AddUserFormProps {
  refetchUsers: () => void;
  isFetchingUsers: boolean;
}

const AddUserForm: React.FC<AddUserFormProps> = ({
  refetchUsers,
  isFetchingUsers,
}) => {
  const [createUser, { isSuccess, isError, isLoading }] =
    useCreateUserMutation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [formKey, setFormKey] = useState(0);

  const handleAdd = async ({ name, job }: { name: string; job: string }) => {
    await createUser({ name, job, id: "", createdAt: "" });
  };

  useEffect(() => {
    if (isSuccess) {
      setSnackbarMsg("User successfully created");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFormKey((k) => k + 1);
      refetchUsers();
    } else if (isError) {
      setSnackbarMsg("Error creating user");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }, [isSuccess, isError, refetchUsers]);

  return (
    <>
      <UserForm
        key={formKey}
        onSubmit={handleAdd}
        submitLabel={isLoading ? "Addition..." : "Add User"}
      />
      {isFetchingUsers && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddUserForm;

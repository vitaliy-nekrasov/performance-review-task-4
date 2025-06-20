import React, { useState } from "react";
import { Box, TextField, Button, Stack } from "@mui/material";

interface UserFormProps {
  onSubmit: (values: { name: string; job: string }) => void;
  submitLabel: string;
  initialValues?: { name: string; job: string };
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  submitLabel,
  initialValues = { name: "", job: "" },
}) => {
  const [name, setName] = useState(initialValues.name);
  const [job, setJob] = useState(initialValues.job);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, job });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 2,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 2,
        width: "100%",
      }}
    >
      <Stack spacing={2}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Job"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" fullWidth>
          {submitLabel}
        </Button>
      </Stack>
    </Box>
  );
};

export default UserForm;

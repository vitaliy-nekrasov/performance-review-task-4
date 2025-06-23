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
        backgroundColor: "#fff8e1",
        borderRadius: 2,
        boxShadow: 2,
        width: "100%",
        border: "1.5px solid #ff9800",
      }}
    >
      <Stack spacing={2}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          sx={{
            "& label.Mui-focused": { color: "#ff9800" },
            "& .MuiInput-underline:after": { borderBottomColor: "#ff9800" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ffb74d" },
              "&:hover fieldset": { borderColor: "#ff9800" },
              "&.Mui-focused fieldset": { borderColor: "#ff9800" },
            },
            fontFamily: "Montserrat, Arial, sans-serif",
          }}
        />
        <TextField
          label="Job"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
          fullWidth
          sx={{
            "& label.Mui-focused": { color: "#ff9800" },
            "& .MuiInput-underline:after": { borderBottomColor: "#ff9800" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ffb74d" },
              "&:hover fieldset": { borderColor: "#ff9800" },
              "&.Mui-focused fieldset": { borderColor: "#ff9800" },
            },
            fontFamily: "Montserrat, Arial, sans-serif",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            background: "linear-gradient(90deg, #ff9800 0%, #ffa726 100%)",
            color: "#fff",
            fontWeight: "bold",
            fontFamily: "Montserrat, Arial, sans-serif",
            "&:hover": {
              background: "linear-gradient(90deg, #ffa726 0%, #ff9800 100%)",
            },
            boxShadow: "0 2px 8px 0 rgba(255,152,0,0.15)",
          }}
        >
          {submitLabel}
        </Button>
      </Stack>
    </Box>
  );
};

export default UserForm;

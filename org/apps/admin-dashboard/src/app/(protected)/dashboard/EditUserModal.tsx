import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import axios from "../../../lib/axios";
import { User, useAuthStore } from "../../../lib/hooks/useAuthStore";

interface EditUserModalProps {
  selectedUser: User | null;
  open: boolean;
  onClose: () => void;
}

type FormData = {
  name: string;
  email: string;
  role: "user" | "admin";
};

function EditUserModal({ selectedUser, open, onClose }: EditUserModalProps) {
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      role: "user",
    },
  });
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (selectedUser) {
      reset({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
      });
    }
  }, [selectedUser, reset]);

  const updateMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.put(`/users/${user?._id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`/users/${user?._id}`);
    },
    onSuccess: async () => {
      onClose();

      if (user?._id === selectedUser?._id) {
        logout();
      } else {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
  });

  const onSubmit = (data: FormData) => {
    updateMutation.mutate(data);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: (theme) => theme.shadows[3],
          backgroundColor: "#111827",
          border: "1px solid #374151",
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          sx={{
            backgroundColor: "#1F2937",
            fontWeight: "bold",
            fontSize: "1.25rem",
          }}
        >
          Edit User
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            backgroundColor: "#111827",
            "& .MuiDivider-root": {
              borderColor: "#374151",
            },
          }}
        >
          <Stack spacing={3} sx={{ mt: 1, mb: 1 }}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  variant="outlined"
                  size="medium"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                      backgroundColor: "#1F2937",
                    },
                  }}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  variant="outlined"
                  size="medium"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                      backgroundColor: "#1F2937",
                    },
                  }}
                />
              )}
            />
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth error={!!error} variant="outlined" size="medium">
                  <InputLabel>Role</InputLabel>
                  <Select
                    {...field}
                    label="Role"
                    sx={{
                      borderRadius: 1,
                      backgroundColor: "#1F2937",
                    }}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                  {error && (
                    <Typography color="error" variant="caption" sx={{ mt: 0.5, ml: 2 }}>
                      {error.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            py: 2,
            gap: 1,
            backgroundColor: "#1F2937",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Button
              onClick={handleDelete}
              color="error"
              variant="outlined"
              disabled={selectedUser?._id === user?._id}
              sx={{
                borderRadius: 1,
                textTransform: "none",
              }}
            >
              Delete User
            </Button>
          </Box>
          <Button
            onClick={onClose}
            sx={{
              borderRadius: 1,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 1,
              textTransform: "none",
              px: 3,
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditUserModal;

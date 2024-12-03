"use client";
import React, {  useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable, Column } from "@org/shared-ui";
import { Grid2 as Grid, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "../../../lib/axios";
import EditUserModal from "./EditUserModal";
import { User } from "../../../lib/hooks/useAuthStore";

function UserTable() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get<User[]>("/users");
      return data;
    },
  });

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const columns: Column<User>[] = [
    {
      id: "name",
      label: "Name",
      accessor: (row: User) => row.name,
    },
    {
      id: "email",
      label: "Email",
      accessor: (row: User) => row.email,
    },
    {
      id: "role",
      label: "Role",
      accessor: (row: User) => row.role,
    },
    {
      id: "createdAt",
      label: "Created At",
      accessor: (row: User) => row.createdAt,
      format: (value) => {
        if (typeof value !== "string") return "";
        return new Date(value).toLocaleDateString();
      },
    },
    {
      id: "actions",
      label: "Actions",
      align: "right",
      accessor: (row: User) => row,
      format: (value) => {
        if (typeof value !== "object" || !value) return null;
        const user = value as User;
        return (
          <Tooltip title="Edit user">
            <IconButton size="small" onClick={() => handleEditClick(user)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <Grid size={12}>
      <DataTable columns={columns} rows={users} loading={isLoading} title="Users" pagination defaultRowsPerPage={10} />
      <EditUserModal selectedUser={selectedUser} open={isModalOpen} onClose={handleCloseModal} />
    </Grid>
  );
}

export default UserTable;

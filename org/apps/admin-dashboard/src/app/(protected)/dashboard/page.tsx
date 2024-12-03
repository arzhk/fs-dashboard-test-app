"use client";
import React from "react";
import { Card } from "@org/shared-ui";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps } from "recharts";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TimelineIcon from "@mui/icons-material/Timeline";
import { Grid2 as Grid, Typography, Box, IconButton, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import api from "../../../lib/axios";
import UserTable from "./UserTable";

interface DashboardData {
  stats: {
    totalUsers: number;
    revenue: number;
    orders: number;
    activeSessions: number;
  };
  revenueChart: Array<{ name: string; value: number }>;
  recentActivities: Array<{ id: number; description: string }>;
  quickStats: {
    conversionRate: number;
    avgOrderValue: number;
  };
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          p: 1,
          px: 2,
          minWidth: 100,
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Typography variant="body2">{label}</Typography>
        <Typography variant="body2" color="primary">
          ${payload[0].value?.toLocaleString()}
        </Typography>
      </Box>
    );
  }
  return null;
};

function DashboardPage() {
  const { data, isLoading, isError } = useQuery<DashboardData>({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const { data } = await api.get("/dashboard/stats", { withCredentials: true });
      return data.data;
    },
  });

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box className="p-6">
        <Typography color="error">Failed to load dashboard data</Typography>
      </Box>
    );
  }

  return (
    <Box className="p-6">
      <Typography variant="h4" className="mb-6">
        Dashboard Overview
      </Typography>

      <Grid container spacing={2} className="mb-4">
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card
            sx={{
              backgroundColor: "primary.main",
              bgcolor: "rgba(25, 118, 210, 0.15)",
              border: "1px solid transparent",
            }}
          >
            <Box className="p-4 flex items-center space-x-4">
              <IconButton
                sx={{
                  backgroundColor: "primary.main",
                  "&:hover": { backgroundColor: "primary.dark" },
                }}
              >
                <PeopleIcon sx={{ color: "common.white" }} />
              </IconButton>
              <Box>
                <Typography variant="body2" sx={{ color: "primary.main", fontWeight: 500 }}>
                  Total Users
                </Typography>
                <Typography variant="h5" sx={{ color: "primary.main" }}>
                  {data?.stats.totalUsers.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card
            sx={{
              backgroundColor: "success.main",
              bgcolor: "rgba(46, 125, 50, 0.15)",
              border: "1px solid transparent",
            }}
          >
            <Box className="p-4 flex items-center space-x-4">
              <IconButton
                sx={{
                  backgroundColor: "success.main",
                  "&:hover": { backgroundColor: "success.dark" },
                }}
              >
                <AttachMoneyIcon sx={{ color: "common.white" }} />
              </IconButton>
              <Box>
                <Typography variant="body2" sx={{ color: "success.main", fontWeight: 500 }}>
                  Revenue
                </Typography>
                <Typography variant="h5" sx={{ color: "success.main" }}>
                  ${data?.stats.revenue.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card sx={{ bgcolor: "rgba(129, 140, 248, 0.15)", border: "1px solid transparent" }}>
            <Box className="p-4 flex items-center space-x-4">
              <IconButton
                sx={{
                  backgroundColor: "primary.main",
                  "&:hover": { backgroundColor: "primary.dark" },
                }}
              >
                <ShoppingCartIcon sx={{ color: "common.white" }} />
              </IconButton>
              <Box>
                <Typography variant="body2" sx={{ color: "primary.main", fontWeight: 500 }}>
                  Orders
                </Typography>
                <Typography variant="h5" sx={{ color: "primary.main" }}>
                  {data?.stats.orders.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card
            sx={{
              backgroundColor: "warning.main",
              bgcolor: "rgba(237, 108, 2, 0.15)",
              border: "1px solid transparent",
            }}
          >
            <Box className="p-4 flex items-center space-x-4">
              <IconButton
                sx={{
                  backgroundColor: "warning.main",
                  "&:hover": { backgroundColor: "warning.dark" },
                }}
              >
                <TimelineIcon sx={{ color: "common.white" }} />
              </IconButton>
              <Box>
                <Typography variant="body2" sx={{ color: "warning.main", fontWeight: 500 }}>
                  Active Sessions
                </Typography>
                <Typography variant="h5" sx={{ color: "warning.main" }}>
                  {data?.stats.activeSessions.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <Box className="p-4">
              <Typography variant="h6" className="mb-4">
                Revenue Overview
              </Typography>
              <LineChart width={600} height={200} data={data?.revenueChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.15)" tick={{ fill: "#fff" }} />
                <YAxis stroke="rgba(255,255,255,0.15)" tick={{ fill: "#fff" }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="#1976d2" dot={{ fill: "#1976d2" }} />
              </LineChart>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card className="h-full">
            <Box className="p-4">
              <Typography variant="h6" className="mb-4">
                Recent Activities
              </Typography>
              <Box className="space-y-4">
                {data?.recentActivities.map((activity) => (
                  <Box key={activity.id} className="flex items-center space-x-3">
                    <Box className="w-2 h-2 rounded-full" sx={{ backgroundColor: "primary.main" }} />
                    <Typography variant="body2">{activity.description}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <Box className="p-4">
              <Typography variant="h6" className="mb-4">
                Quick Stats
              </Typography>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <Typography variant="body2" color="text.secondary">
                    Conversion Rate
                  </Typography>
                  <Typography variant="h6">{data?.quickStats.conversionRate}%</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="body2" color="text.secondary">
                    Avg. Order Value
                  </Typography>
                  <Typography variant="h6">${data?.quickStats.avgOrderValue}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
        <UserTable />
      </Grid>
    </Box>
  );
}

export default DashboardPage;

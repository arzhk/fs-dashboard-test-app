"use client";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Link from "next/link";

export interface NavLink {
  label: string;
  path: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface NavBarProps {
  logo?: React.ReactNode;
  links: NavLink[];
  actions?: React.ReactNode;
}

export const NavBar = ({ logo, links, actions }: NavBarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderNavLinks = (mobile: boolean) =>
    mobile ? (
      <List>
        {links.map((link) => (
          link.onClick ? (
            <ListItem
              key={link.path}
              onClick={() => {
                link.onClick?.();
                handleDrawerToggle();
              }}
              sx={{
                color: theme.palette.text.primary,
                cursor: 'pointer',
                "&:hover": {
                  backgroundColor: theme.palette.background.alternate,
                },
              }}
            >
              {link.icon && <ListItemIcon className="min-w-[40px]">{link.icon}</ListItemIcon>}
              <ListItemText primary={link.label} />
            </ListItem>
          ) : (
            <Link key={link.path} href={link.path} className="no-underline">
              <ListItem
                onClick={handleDrawerToggle}
                sx={{
                  color: theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: theme.palette.background.alternate,
                  },
                }}
              >
                {link.icon && <ListItemIcon className="min-w-[40px]">{link.icon}</ListItemIcon>}
                <ListItemText primary={link.label} />
              </ListItem>
            </Link>
          )
        ))}
      </List>
    ) : (
      <div className="flex items-center gap-2">
        {links.map((link) => (
          link.onClick ? (
            <Button
              key={link.path}
              color="inherit"
              startIcon={link.icon}
              onClick={link.onClick}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {link.label}
            </Button>
          ) : (
            <Link key={link.path} href={link.path} className="no-underline">
              <Button
                color="inherit"
                startIcon={link.icon}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {link.label}
              </Button>
            </Link>
          )
        ))}
      </div>
    );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar className="flex justify-between items-center">
          <div className="flex-shrink-0">
            {logo}
          </div>

          <div className="flex items-center gap-4">
            {!isMobile && renderNavLinks(false)}
            {actions}
            {isMobile && (
              <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        className="block md:hidden"
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <Box
          className="flex items-center justify-end p-1"
          sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
        >
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        {renderNavLinks(true)}
      </Drawer>
    </>
  );
};

export default NavBar;

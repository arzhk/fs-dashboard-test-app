"use client";
import { Button as MuiButton, ButtonProps as MuiButtonProps, styled } from "@mui/material";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "small" | "medium" | "large";

interface CustomButtonProps extends MuiButtonProps {
  customVariant?: ButtonVariant;
  size?: ButtonSize;
}

interface StyledButtonProps extends CustomButtonProps {
  customVariant?: ButtonVariant;
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== "customVariant" && prop !== "size",
})<StyledButtonProps>(({ theme, customVariant = "primary", size = "medium" }) => ({
  fontWeight: 500,
  borderRadius: "8px",
  textTransform: "none",
  transition: "all 0.2s ease-in-out",
  boxShadow: "none",

  ...(size === "small" && {
    padding: "6px 12px",
    fontSize: "0.875rem",
  }),

  ...(size === "medium" && {
    padding: "8px 16px",
    fontSize: "0.9375rem",
  }),

  ...(size === "large" && {
    padding: "10px 20px",
    fontSize: "1rem",
  }),

  ...(customVariant === "primary" && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      transform: "translateY(-1px)",
      boxShadow: "none",
    },
  }),

  ...(customVariant === "secondary" && {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      transform: "translateY(-1px)",
      boxShadow: "none",
    },
  }),

  "&.Mui-disabled": {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));

export const Button = ({ children, customVariant = "primary", size = "medium", ...props }: CustomButtonProps) => {
  return (
    <StyledButton customVariant={customVariant} size={size} {...props}>
      {children}
    </StyledButton>
  );
};

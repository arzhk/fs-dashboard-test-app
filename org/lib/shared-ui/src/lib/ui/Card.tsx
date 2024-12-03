"use client";
import { Card as MuiCard, CardProps as MuiCardProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export interface CardProps extends MuiCardProps {
  noPadding?: boolean;
}

const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) => prop !== "noPadding",
})<{ noPadding?: boolean }>(({ theme, noPadding }) => ({
  padding: noPadding ? 0 : theme.spacing(3),
  "&:hover": {
    transform: "translateY(0px)",
  },
}));

export const Card = ({ children, noPadding = false, ...props }: CardProps) => {
  return (
    <StyledCard noPadding={noPadding} {...props}>
      {children}
    </StyledCard>
  );
};

export default Card;

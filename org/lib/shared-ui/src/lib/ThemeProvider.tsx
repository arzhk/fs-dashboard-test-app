"use client";
import { ThemeProvider as ThemeRegister } from "@mui/system";
import theme from "../theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeRegister theme={theme}>{children}</ThemeRegister>;
}

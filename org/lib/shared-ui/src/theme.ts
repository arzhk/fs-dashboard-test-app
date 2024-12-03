import { createTheme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }

  interface TypeBackground {
    alternate: string;
  }

  interface PaletteOptions {
    neutral?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#818CF8",
      light: "#A5B4FC",
      dark: "#4F46E5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#34D399",
      light: "#6EE7B7",
      dark: "#10B981",
      contrastText: "#ffffff",
    },
    neutral: {
      main: "#9CA3AF",
      light: "#D1D5DB",
      dark: "#6B7280",
      contrastText: "#ffffff",
    },
    background: {
      default: "#111827",
      paper: "#1F2937",
      alternate: "#374151",
    },
    text: {
      primary: "#F9FAFB",
      secondary: "#D1D5DB",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
      color: "#F9FAFB",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
      color: "#F9FAFB",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.3,
      color: "#F9FAFB",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
      color: "#F9FAFB",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "8px 16px",
          transition: "all 0.2s ease-in-out",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
            transform: "translateY(-1px)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          border: "1px solid #374151", // Darker border
          boxShadow: "none",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid #374151", // Darker border
          boxShadow: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: "#1F2937", // Darker input background
            "&:hover fieldset": {
              borderColor: "#4B5563",
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #374151", // Darker border
          padding: "12px 16px",
        },
        head: {
          backgroundColor: "#1F2937", // Darker header
          fontWeight: 600,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#374151", // Darker divider
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;

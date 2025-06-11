import { createTheme } from "@mui/material/styles";
import { faIR } from "@mui/material/locale";
import { red, blueGrey, deepPurple, indigo } from "@mui/material/colors";
import { create } from "jss";
import rtl from "jss-rtl";
import { jssPreset, StylesProvider } from "@mui/styles";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createTheme(
  {
    direction: "rtl",
    palette: {
      mode: "light",
      primary: {
        main: deepPurple[500],
      },
      secondary: {
        main: indigo[400],
      },
      error: {
        main: red.A400,
      },
      background: {
        default: "#f5f5f5",
        paper: "#ffffff",
      },
      text: {
        primary: "#222",
        secondary: blueGrey[700],
      },
    },
    typography: {
      fontFamily: `"Vazirmatn", "IranYekan", "Tahoma", "sans-serif"`,
      fontSize: 14,
      h1: {
        fontWeight: 700,
        fontSize: "2rem",
      },
      h2: {
        fontWeight: 600,
        fontSize: "1.75rem",
      },
      body1: {
        fontSize: "1rem",
      },
      button: {
        fontWeight: 500,
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 30,
            padding: "8px 20px",
            fontWeight: 600,
            fontSize: "0.95rem",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            marginBottom: "1rem",
          },
        },
      },
    },
  },
  faIR
);

export { theme, jss, StylesProvider };

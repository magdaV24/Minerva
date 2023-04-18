import { ThemeOptions } from "@mui/material/styles";

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#e64a19',
    },
    secondary: {
      main: '#558b2f',
    },
    background: {
      default: 'rgba(12,28,12,0.71)',
      paper: '#060e06',
    },
  },
};

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#7e57c2',
    },
    secondary: {
      main: '#e91e63',
      contrastText: 'rgba(0,0,0,0.85)',
    },
    background: {
      default: '#d1c4e9',
      paper: '#ada7b9',
    },
  },
};

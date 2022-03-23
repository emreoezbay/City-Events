import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
let theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

theme = createTheme(theme, {
  typography: {
    h1: {
      fontSize: 40,
      fontWeight: 600,
      backgroundImage: `linear-gradient(90deg,${theme.palette.primary.main},${theme.palette.secondary.main})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'initial',
    },
    h2: {
      fontSize: 15,
      fontWeight: 600,
    },
  },
});
export default theme;

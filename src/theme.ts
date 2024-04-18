import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: [
      'pixel',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
          border: 'none',
          background: 'none',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
          border: 'none',
          background: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: '10px',
          borderRadius: '0px',
          border: '3px solid #743f39',
          color: 'white',
          backgroundColor: '#b86f50',
          boxShadow: '0px 2px #3f2832',
          transition: 'none',
          ':hover': {
            backgroundColor: '#b86f50',
          },
          ':active': {
            backgroundColor: '#9a5d43',
            boxShadow: '0px 0px #3f2832',
            transform: 'translateY(2px);'
          }
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: 'none',
          borderRadius: '0px',
          background: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: "black",
        }
      }
    },
  },
});
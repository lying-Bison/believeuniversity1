import '@mui/material/styles';
import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme extends MuiTheme {}
  interface ThemeOptions extends MuiTheme {}
}

declare module '@mui/material/Grid' {
  interface GridProps {
    item?: boolean;
    container?: boolean;
  }
}

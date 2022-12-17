import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';

const theme = createTheme();

const MiuThemeContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {/* Put the basic layout here to share between pages */}
      {children}
    </ThemeProvider>
  );
};

export { MiuThemeContextProvider }
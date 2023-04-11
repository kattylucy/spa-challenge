import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { Header } from "./pages/Header";
import { SpaTable } from "./pages/SpaTable";
import theme from "./app/theme/theme";

const AppWrapper = styled.div({
  fontFamily: "roboto",
  padding: 0,
  margin: 0,
});

const Toast = styled(ToastContainer)({
  svg: {
    fill: theme.colors.secondary,
  },
  ".Toastify__progress-bar--success": {
    background: theme.colors.secondary,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppWrapper>
        <Toast />
        <Header />
        <SpaTable />
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;

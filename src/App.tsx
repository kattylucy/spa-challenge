import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@material-ui/core";
import { Header } from "./pages/Header";
import { SpaTable } from "./pages/SpaTable";
import { Toast } from "./components/Toast";
import theme from "./app/theme/theme";

const AppWrapper = styled.div({
  fontFamily: "roboto",
  padding: 0,
  margin: 0,
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

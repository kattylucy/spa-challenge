import styled from "@emotion/styled";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoImg from "src/static/static.jpg";

const LogoWrapper = styled.div({
  alignItems: "center",
  display: "flex",
  "& > img": {
    height: 30,
    marginRight: 6,
    width: 30,
  },
});

const PageHeader = styled.div(({ theme: { colors } }) => ({
  borderBottom: `1px solid ${colors.border}`,
  display: "center",
  justifyContent: "space-between",
  padding: "0px 20px",
}));

const RightSide = styled.div({
  alignItems: "center",
  display: "flex",
  "& > svg": {
    marginRight: 8,
  },
});

export const Header = () => {
  return (
    <PageHeader>
      <LogoWrapper>
        <img alt="Red technologies logo" src={LogoImg} />
        <p>Home</p>
      </LogoWrapper>
      <RightSide>
        <SettingsIcon />
        <AccountCircleIcon />
      </RightSide>
    </PageHeader>
  );
};

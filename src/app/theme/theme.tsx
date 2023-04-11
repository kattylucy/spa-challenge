import { Theme } from "@emotion/react";

const size = {
  mobile: "500px",
  tablet: "900px",
  laptop: "1024px",
  desktop: "2560px",
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`,
};

const theme: Theme = {
  colors: {
    border: "rgba(229, 226, 226, 0.89)",
    disabled: "rgba(151, 157, 160, 0.71)",
    primary: "rgba(234, 41, 49, 0.89)",
    secondary: "rgb(25, 118, 210)",
  },
  device,
};

export default theme;

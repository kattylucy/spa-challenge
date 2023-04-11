import '@emotion/react';

interface device {
  mobile: string, laptop: string, tablet: string, desktop: strin
}

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      border: string;
      disabled: string;
      primary: string;
      secondary: string;
    };
    device: device
  }
}

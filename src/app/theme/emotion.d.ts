import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      border: string;
      disabled: string;
      primary: string;
      secondary: string;
    };
  }
}

import 'react';

declare module 'react' {
  export interface CSSProperties {
    [variable: `--${string}`]: string | number | undefined;
  }
}

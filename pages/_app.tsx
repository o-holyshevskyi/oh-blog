import { AppProps } from 'next/app';
import '../styles/global.css';
import '../styles/variables.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

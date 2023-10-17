import { AppProps } from 'next/app';
import '../styles/global.css';
import '../styles/variables.css';
import '../styles/syntax-highlighting.css';
import { ThemeProvider } from '../components/theme-util/theme-context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

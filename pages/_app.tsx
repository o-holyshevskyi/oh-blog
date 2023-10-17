import { AppProps } from 'next/app';
import '../styles/global.css';
import '../styles/variables.css';
import '../styles/syntax-highlighting.css';
import { ThemeProvider } from '../components/theme-util/theme-context';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <meta name="description" content="Oleksandr Holyshevskyi | Test Automation Engineer" />
        <meta property="og:title" content="Oleksandr Holyshevskyi" />
        <meta property="og:description" content="Oleksandr Holyshevskyi | Test Automation Engineer" />
        <meta property="og:image" content="/images/profile.jpg" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

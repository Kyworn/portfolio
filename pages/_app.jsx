import '../globals.css';
import { IBM_Plex_Mono, Inter } from 'next/font/google';
import Head from 'next/head';

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${ibmPlexMono.variable} ${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;

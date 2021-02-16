import { AppProps } from 'next/app';

import '../styles/globals.css';
import '../styles/fonts.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen min-w-full bg-white">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

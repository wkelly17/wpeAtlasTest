import 'faust.config';
import { FaustProvider } from '@faustjs/next';
import 'normalize.css/normalize.css';
import 'styles/main.scss';
import React, { useState, useEffect } from 'react';
import { client } from 'client';
import ThemeStyles from 'components/ThemeStyles/ThemeStyles';
import { useRouter } from 'next/router';
import PageTransitions from '../animations/pageTransitions';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [routingPageOffset, setRoutingPageOffset] = useState(0);
  const [inProp, setInProp] = useState(true);
  useEffect(() => {
    const pageChange = () => {
      setRoutingPageOffset(window.scrollY);
    };
    router.events.on('routeChangeStart', pageChange);
    router.events.on('routeChangeStart', () => {
      console.log('changing in prop');
      setInProp(false);
    });
    router.events.on('routeChangeComplete', () => {
      console.log('changing in prop');
      setInProp(true);
    });
  }, [router.events]);

  return (
    <>
      <ThemeStyles />
      <FaustProvider client={client} pageProps={pageProps}>
        <PageTransitions
          route={router.asPath}
          routingPageOffset={routingPageOffset}
          inProp={inProp}
        >
          <Component
            {...pageProps}
            route={router.asPath}
            routingPageOffset={routingPageOffset}
          />
        </PageTransitions>
      </FaustProvider>
    </>
  );
}

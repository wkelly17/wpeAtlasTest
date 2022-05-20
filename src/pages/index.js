import { getNextStaticProps } from '@faustjs/next';
import React, { useRef, useEffect, useState } from 'react';
import { client } from 'client';
import { FaArrowRight } from 'react-icons/fa';
import { useIsomorphicLayoutEffect } from 'react-use';
import {
  Box,
  Posts,
  Header,
  Footer,
  EntryHeader,
  Main,
  Button,
  Heading,
  CTA,
  SEO,
} from 'components';
import styles from 'styles/pages/_Home.module.scss';
import { pageTitle } from 'utils';
import PageTransitions from '../animations/pageTransitions';
import { gsap } from 'gsap';

const postsPerPage = 3;

export default function Page({ route, routingPageOffset, ...restProps }) {
  // todo see about wrapping each page at this level with the Page Transition component;
  const { useQuery, usePosts } = client;
  const [inProp, setIn] = useState(false);
  const generalSettings = useQuery().generalSettings;
  const posts = usePosts({
    first: postsPerPage,
    where: {
      categoryName: 'uncategorized',
    },
  });
  const mainBanner = {
    sourceUrl: '/static/banner.jpeg',
    mediaDetails: { width: 1200, height: 600 },
    altText: 'Blog Banner',
  };
  const topRef = useRef();

  setTimeout(() => {
    setIn(true);
  }, 1000);
  return (
    <>
      <SEO
        title={pageTitle(generalSettings)}
        imageUrl={mainBanner?.sourceUrl}
      />

      <Header />
      <Box ref={topRef}>
        <Main className={styles.home}>
          <EntryHeader image={mainBanner} />
          <div className="container">
            <section className="text-center hero">
              <Heading className={styles.heading} level="h1">
                Welcome to your Blueprint
              </Heading>
              <p className={styles.description}>
                Achieve unprecedented performance with modern frameworks and the
                world&apos;s #1 open source CMS in one powerful headless
                platform.{' '}
              </p>
              <div className={styles.actions}>
                <Button styleType="secondary" href="/contact-us">
                  GET STARTED
                </Button>
                <Button styleType="primary" href="/about">
                  LEARN MORE
                </Button>
              </div>
            </section>
            <section className="cta">
              <CTA
                Button={() => (
                  <Button href="/posts">
                    Get Started <FaArrowRight style={{ marginLeft: `1rem` }} />
                  </Button>
                )}
              >
                <span>
                  Learn about Core Web Vitals and how Atlas can help you reach
                  your most demanding speed and user experience requirements.
                </span>
              </CTA>
            </section>
            <section className={styles.posts}>
              <Heading className={styles.heading} level="h2">
                Latest Posts
              </Heading>
              <Posts posts={posts?.nodes} id="posts-list" />
            </section>
            <section className="cta">
              <CTA
                Button={() => (
                  <Button href="/posts">
                    Get Started <FaArrowRight style={{ marginLeft: `1rem` }} />
                  </Button>
                )}
              >
                <span>
                  Learn about Core Web Vitals and how Atlas can help you reach
                  your most demanding speed and user experience requirements.
                </span>
              </CTA>
            </section>
          </div>
        </Main>
      </Box>
      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}

import { getNextStaticProps, is404 } from '@faustjs/next';
import { client } from 'client';
import {
  Header,
  EntryHeader,
  ContentWrapper,
  Footer,
  Main,
  SEO,
} from 'components';
import { pageTitle } from 'utils';
import PageTransitions from '../animations/pageTransitions';

export function PageComponent({ page, route, routingPageOffset }) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <SEO
        title={pageTitle(
          generalSettings,
          page?.title(),
          generalSettings?.title
        )}
        imageUrl={page?.featuredImage?.node?.sourceUrl?.()}
      />

      <Header />
      <PageTransitions
        route={route}
        routingPageOffset={routingPageOffset}
        key={route}
        in={route}
      >
        <Main>
          <EntryHeader
            title={page?.title()}
            image={page?.featuredImage?.node}
          />
          <div className="container">
            <ContentWrapper content={page?.content()} />
          </div>
        </Main>
      </PageTransitions>

      <Footer />
    </>
  );
}

export default function Page() {
  const { usePage } = client;
  const page = usePage();
  return <PageComponent page={page} />;
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

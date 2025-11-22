import Head from 'next/head';
import BentoGrid from '../components/layout/BentoGrid';
import { RESUME_DATA } from '../utils/data';

export default function Home() {
  return (
    <>
      <Head>
        <title>{`${RESUME_DATA.name} | ${RESUME_DATA.about}`}</title>
        <meta name="description" content={RESUME_DATA.summary} />
      </Head>

      <main className="bg-background min-h-screen selection:bg-accent selection:text-white">
        <div className="bg-noise"></div>
        <BentoGrid />
      </main>
    </>
  );
}

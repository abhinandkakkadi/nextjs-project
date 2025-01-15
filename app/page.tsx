import LoadingCards from '@/components/card/LoadingCards';
import CategoriesList from '@/components/home/CategoriesList';
import PropertiesContainer from '@/components/home/PropertiesContainer';
import { Suspense } from 'react';

import React from 'react';

async function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const params = await searchParams;
  console.log('searchParams: ', params);
  return (
    <section>
      <CategoriesList category={params.category} search={params.search} />
      {/* for the sespense to work the fetching should happen inside the Properties Container, if is fetched from home
      page and passed down as props, it wont work. */}
      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer
          category={params.category}
          search={params.search}
        />
      </Suspense>
    </section>
  );
}

export default HomePage;

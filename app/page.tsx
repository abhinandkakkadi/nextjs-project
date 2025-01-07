import CategoriesList from '@/components/home/CategoriesList';
import PropertiesContainer from '@/components/home/PropertiesContainer';

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
      <PropertiesContainer category={params.category} search={params.search} />
    </section>
  );
}

export default HomePage;

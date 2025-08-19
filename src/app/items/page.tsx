import React from 'react';
import CardProduct from '../components/CardProduct/CardProduct';
import Link from 'next/link';
import Pagination from '../components/Pagination/Pagination';
import type { Metadata } from 'next';

export const revalidate = 300;

export async function generateMetadata(
  { searchParams }: { searchParams: Promise<SearchParams> }
): Promise<Metadata> {
  const searchParam = await searchParams;
  const searchParma  = typeof searchParam?.search === 'string' ? searchParam.search.trim() : '';
  const offset = Math.max(1, Number(searchParam?.offset) || 1);

  const title = searchParma ? `${searchParma} | Resultados` : 'Resultados de búsqueda de Mercado Libre';
  const description = searchParma
    ? `Resultados para “${searchParma}”. Encuentra productos, precios y características.`
    : 'Busca productos y explora resultados.';

 
  const domain = searchParma ? `/items?search=${encodeURIComponent(searchParma)}` : '/items';
  const canonical = offset <= 1 ? domain : domain; 

  const shouldNoIndex = offset > 10;
  const robots = shouldNoIndex
    ? { index: false, follow: true }
    : { index: true,  follow: true };

  return {
    title,
    description,
    alternates: { canonical },
    robots,
    openGraph: { title, description },
    twitter:   { card: 'summary', title, description }
  };
}

type SearchParams = { search?: string; offset?: string };

export default async function Search({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const searchParam = await searchParams;
  const query = typeof searchParam?.search === 'string' ? searchParam.search.trim() : '';
  const offset = Math.max(1, Number(searchParam?.offset) || 1);
  const limit = 10;

  try {
    const domain = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5173';
    const params = new URLSearchParams();
    if (query) {
      params.set('search', query);
    }
    params.set('offset', String(offset));
    
    const apiUrl = `${domain}/api/items?${params.toString()}`;
    const response = await fetch(apiUrl, { next: { revalidate: 300 } });
    if (!response.ok) throw new Error('Error al obtener los productos');

    const dataResponse = await response.json();
    const items: any[] = dataResponse.items ?? [];
    const total: number = Number(dataResponse.total ?? 0);
    const serverOffset: number = Number(dataResponse.offset ?? offset);
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return (
      <section className="container-full">
            <div className="container-items ">
              {items.length > 0 ? (
                items.map((item: any, index: number) => (
                  <Link
                    key={item.id}
                    href={{
                      pathname: `/items/${item.id}`,
                    }}
                    prefetch={false}
                  >
                    <CardProduct item={item} index={index} variant="small" />
                  </Link>
                ))
              ) : (
                <p className="mt-4 text-center">Sin resultados</p>
              )}
            </div>

            {totalPages > 1 && (
                <div className='container-items__pagination'>
                  <Pagination 
                    query={query}
                    currentPage={serverOffset}
                    totalPages={totalPages}
                    pagesToShow={5}
                  />
                </div>
            )}
      </section>
    );
  } catch {
    return (
      <section className="container-full ">
        <div className="container-items h-screen">
          <p className="mt-4 text-center">Error al obtener los productos</p>
        </div>
      </section>
    );
  }
}

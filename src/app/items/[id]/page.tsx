// src/app/items/[id]/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CardProduct from '@/app/components/CardProduct/CardProduct';
import Breadcrumb from '@/app/components/Breadcrumb/Breadcrumb';

async function fetchItem(id: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5173';
  const url = `${base}/api/items/${encodeURIComponent(id)}`;
  const res = await fetch(url, {
    next: { revalidate: 600},
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json?.item ?? null;
}

function buildCanonical(id: string) {
  return `/items/${encodeURIComponent(id)}`;
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;

  const item = await fetchItem(id).catch(() => null);

  if (!item) {
    const title = 'Producto no encontrado';
    const description = 'El producto solicitado no está disponible o fue removido.';
    return {
      title,
      description,
      alternates: { canonical: buildCanonical(id) },
      robots: { index: false, follow: true },
      openGraph: { title, description },
      twitter: { card: 'summary', title, description },
    };
  }

  const title = `${item.title} | Detalle`;
  const description = (item.description ?? '').slice(0, 160);
  const image: string | undefined = item?.pictures?.[0] ?? item?.picture ?? undefined;

  return {
    title,
    description,
    alternates: { canonical: buildCanonical(item.id) },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

type PageProps = { params: Promise<{ id: string }> };

export default async function Id({ params }: PageProps) {
  const { id } = await params;

  const item = await fetchItem(id);
  if (!item) {
    notFound();
  }

  return (
    <section className="w-screen h-screen flex justify-center">
      <div className="container-items-detail">
        <div className="breadcrumb">
          <Breadcrumb item={item} />
          <label className="breadcrumb__id">Registro: {item.id}</label>
        </div>

        <div className="container-items-detail__content">
          <div className="container-items-detail__space">
            <CardProduct item={item} index={0} variant="large" />
          </div>

          <hr />

          <div className="container-items-detail__description">
            <h2 className="container-items-detail__title">Descripción</h2>
            <p className="container-items-detail__text">{item.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

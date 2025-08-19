'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './error.module.scss';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error('[GlobalError]', error);
  }, [error]);

  return (
      <section className={styles['error']}>
        <div className={styles['error__card']}>
          <h1 className={styles['error__title']}>Ups, algo salió mal</h1>
          <p className={styles['error__text']}>Inténtalo de nuevo. Si persiste, vuelve más tarde.</p>
          <div className={styles['error__actions']}>
            <button
              onClick={() => {
                reset();
                router.refresh();
              }}
              className={styles['error__btn-primary']}
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
  );
}

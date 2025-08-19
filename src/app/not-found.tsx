import Link from 'next/link'
import styles from './not-found.module.scss'

export default function NotFound() {
  return (
    <section className={styles['not-found']}>
      <div className={styles['not-found__card']}>
        <h1 className={styles['not-found__title']}>Página no encontrada (404)</h1>
        <p className={styles['not-found__text']}>Lo que buscas no existe o fue movido.</p>
        <div className={styles['not-found__actions']}>
          <Link href="/" className={styles['not-found__btn-primary']}>Ir al inicio</Link>
          <Link href="/items" className={styles['not-found__btn-secondary']}>Explorar productos</Link>
        </div>
      </div>
    </section>
  );
}

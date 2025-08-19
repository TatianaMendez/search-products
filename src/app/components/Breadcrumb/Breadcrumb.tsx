import Link from 'next/link';
import styles from './Breadcrumb.module.scss';

const Breadcrumb = ({ item, backHref = '/items' }: { item: any; backHref?: string }) => {
  return (
    <div className={styles['breadcrumb-item']}>
      <Link href={backHref} className={styles['breadcrumb-item__link']}>Volver al listado</Link>
      <span> | </span>
      <span> {item.category}  / </span>
      <span>{item.title}</span>
    </div>
  );
};

export default Breadcrumb;
  
  
  
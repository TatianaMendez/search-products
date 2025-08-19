import Link from "next/link";
import styles from './Pagination.module.scss';
type PaginationProps = {
  query: string;
  currentPage: number;
  totalPages: number;
  pagesToShow?: number;
};

export default function Pagination({
  query,
  currentPage,
  totalPages,
  pagesToShow = 5,
}: PaginationProps) {
  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  if (endPage - startPage + 1 < pagesToShow) {
    startPage = Math.max(1, endPage - pagesToShow + 1);
  }

  return (
    <nav
      className={styles['pagination-container']} >
      {currentPage > 1 && (
        <Link
        className={styles['pagination-container__link']}
          href={`/items?${new URLSearchParams({
            ...(query ? { search: query } : {}),
            offset: String(currentPage - 1),
          }).toString()}`}
          prefetch
        >
          {'<'} Anterior
        </Link>
      )}

      <ul className="flex items-center gap-2">
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
          (pageNum) => (
            <li key={pageNum}>
              {pageNum === currentPage ? (
                  <div className={`${styles['pagination-container__page']} ${styles['pagination-container__page-active']}`}>
                    {pageNum}
                  </div>
              ) : (
                <Link
                  href={`/items?${new URLSearchParams({
                    ...(query ? { search: query } : {}),
                    offset: String(pageNum),
                  }).toString()}`}
                  prefetch
                >
                <div className={styles['pagination-container__page']}>
                  {pageNum}
                </div>
                </Link>
              )}
            </li>
          )
        )}
      </ul>

      {currentPage < totalPages && (
        <Link
        className={styles['pagination-container__link']}
          href={`/items?${new URLSearchParams({
            ...(query ? { search: query } : {}),
            offset: String(currentPage + 1),
          }).toString()}`}
          prefetch
        >
          Siguiente {'>'}
        </Link>
      )}
    </nav>
  );
}

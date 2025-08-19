"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './SearchBox.module.scss';
import Link from 'next/link';

const SearchBox = () => {
  const [query, setQuery] = useState('');

  return (
    <header className={styles['search-box']}>
      <div className={styles['search-box__container']}>
        <Link href="/">
          <Image
            src="/logo_mercadolibre.png"
            alt="search"
            className={styles['search-box__logo']}
            width={150}
            height={34}
            priority
          />
        </Link>
        <form
          className={`${styles['search-box__form']}`}
          role="search"
          method="get"
          action="/items"
        >
          <input
            type="text"
            name="search"
            placeholder="Buscar productos, marcas y más..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            className={`${styles['search-box__input']} flex-1 max-w-xs p-2 rounded-md border border-gray-300 text-sm bg-white`}
          />
          <button
            type="submit"
            id="search-button"
            className={styles['search-box__icon']}  
            aria-label="Buscar"
          >
            <Image
              src="/lens.png"
              alt="Buscar"
              width={24}
              height={24}
            />
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBox;
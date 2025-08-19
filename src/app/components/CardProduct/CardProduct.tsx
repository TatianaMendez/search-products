import React from 'react'
import Image from 'next/image'
import styles from './CardProduct.module.css'

type CardProductProps = {
  item: any
  index: number
  variant?: 'small' | 'large'
}

const CardProduct = ({ item, index, variant = 'small' }: CardProductProps) => {

let shouldPrioritize = false;

if (variant === 'large') {
  shouldPrioritize = true;
} else if (variant === 'small' && index < 2) {
  shouldPrioritize = true;
} else {
  shouldPrioritize = false;
}

const installments = (item.price.amount / item.installments).toFixed(2);
  return (
    
    <div className={`${styles['card-detail']} ${styles[`card-detail--${variant}`]}`}> 
      <div className={`${styles['card-detail__main']} ${styles[`card-detail__main--${variant}`]}`}>
        <div className={`${styles['card-detail__visual']} ${styles[`card-detail__visual--${variant}`]}`}>
          {variant === 'large' && (
            <div className={styles['card-detail__thumbs']}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`${styles['card-detail__thumb']} ${i === 0 ? styles['card-detail__thumb--active'] : ''}`}
                >
                  <Image
                    src={item?.picture}
                    alt={`${item.title} miniatura ${i + 1}`}
                    fill
                    sizes="64px"
                    className={styles['card-detail__img']}
                  />
                </div>
              ))}
            </div>
          )}
          <div className={`${styles['card-detail__container-img']} ${styles[`card-detail__container-img--${variant}`]}`}>
            <Image
              className={styles['card-detail__img']}
              src={item?.picture}
              alt={item.title}
              priority={shouldPrioritize}
              loading={shouldPrioritize ? 'eager' : 'lazy'}
              fetchPriority={shouldPrioritize ? 'high' : 'auto'}
              fill
              sizes={
                variant === 'large'
                  ? '(max-width: 468px) 85vw, (max-width: 1024px) 100vw, 900px'
                  : '(max-width: 468px) 120px, 259px'
              }
            />
          </div>
        </div>
        <div className={styles['card-detail__info']}>
          {variant === 'large' && item.condition && (
            <span className={styles['card-detail__condition']}>
              {item.condition}
              {item.condition !== 'Usado' && ` | ${item.sold} vendidos`}
            </span>
          )}

          <h4 className={`${styles['card-detail__title']} ${styles[`card-detail__title--${variant}`]}`}>
            {item.title}
          </h4>

          <span className={`${styles['card-detail__caption']} ${styles[`card-detail__caption--${variant}`]}`}>
            Por {item.seller}
          </span>

          <div className={`${styles['card-detail__price-container']} ${styles[`card-detail__price-container--${variant}`]}`}>
            <span className={`${styles['card-detail__price']} ${styles[`card-detail__price--${variant}`]}`}>
              ${item.price.amount}
            </span>
            <span className={`${styles['card-detail__installments']} ${styles[`card-detail__installments--${variant}`]}`}>
              Mismo precio en {item.installments} cuotas de ${installments}
            </span>
          </div>

          {item.free_shipping && (
            <small className={`${styles['card-detail__free-shipping']} ${styles[`card-detail__free-shipping--${variant}`]}`}>
              Envío gratis
            </small>
          )}
        </div> 
      </div>
    </div>
  )
}

export default CardProduct

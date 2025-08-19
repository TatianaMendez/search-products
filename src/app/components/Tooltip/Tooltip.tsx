'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Tooltip.module.scss';

const countView = 'msgWelcomeSearch';

const Tooltip: React.FC = () => {
  const [visible, setVisible] = useState(false);
  type TooltipCoords = { top: number; left: number };
  const [position, setPosition] = useState<TooltipCoords | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const viewTrue = localStorage.getItem(countView);
      if (!viewTrue) {
        setVisible(true);
        localStorage.setItem(countView, '1');
      }
    } catch {
      console.log('Error al obtener el localStorage'); 
    }
  }, []);

  useEffect(() => {
    if (!visible) { 
      return; 
    }
    const button = document.getElementById('search-button');
    if (!button) { 
      return; 
    }

    const updateTooltipPosition = () => {
      const rect = button.getBoundingClientRect();
      const tooltipWidth = tooltipRef.current?.offsetWidth ?? 300;
      const top = rect.top + window.scrollY + rect.height + 12;
      const centerX = rect.left + window.scrollX + rect.width / 2;
      const left = centerX - tooltipWidth * 0.88;
      setPosition({ top, left });
    };

    updateTooltipPosition();
    window.addEventListener('resize', updateTooltipPosition);
    window.addEventListener('scroll', updateTooltipPosition, { passive: true });
    return () => {
      window.removeEventListener('resize', updateTooltipPosition);
      window.removeEventListener('scroll', updateTooltipPosition);
    };
  }, [visible]);

  if (!visible || !position) { return null; }

  return (
    <div
      ref={tooltipRef}
      className={styles.tooltip}
      style={{ top: position.top, left: position.left }}
    >
      <div className={styles.tooltip__header}>
        <div className={styles.tooltip__title}>Hola</div>
        <button
          type="button"
          className={styles.tooltip__close}
          onClick={() => setVisible(false)}
        >
          ×
        </button>
      </div>
      <div className={styles.tooltip__text}>
        Para realizar búsquedas, solo debes ingresar el nombre de lo que necesites. Pueden ser productos, marcas y más...
      </div>
    </div>
  );
};

export default Tooltip;
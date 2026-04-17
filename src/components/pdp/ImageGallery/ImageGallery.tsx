import { useState } from 'react';
import styles from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      {/* Main image */}
      <div className={styles.mainWrapper}>
        <img
          src={images[activeIndex]}
          alt={`${productName} — image ${activeIndex + 1}`}
          className={styles.mainImage}
          key={images[activeIndex]} // re-trigger fade on change
        />
        {images.length > 1 && (
          <>
            <button
              className={[styles.navBtn, styles.navPrev].join(' ')}
              onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
              aria-label="Previous image"
              id="gallery-prev-btn"
            >
              ‹
            </button>
            <button
              className={[styles.navBtn, styles.navNext].join(' ')}
              onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
              aria-label="Next image"
              id="gallery-next-btn"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className={styles.thumbs} role="list" aria-label="Product image thumbnails">
          {images.map((src, i) => (
            <button
              key={src}
              className={[styles.thumb, i === activeIndex ? styles.thumbActive : ''].join(' ')}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === activeIndex}
              role="listitem"
              id={`gallery-thumb-${i}`}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

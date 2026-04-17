import { Link } from 'react-router-dom';
import type { Product } from '@/data/types';
import { useCart } from '@/context/CartContext';
import type { CartItem } from '@/data/types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addItem } = useCart();

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const item: CartItem = {
      id: `${product.id}-default`,
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      imageUrl: product.images[0],
      price: product.price,
      quantity: 1,
      selectedVariants: {},
    };
    addItem(item);
    onAddToCart?.(product);
  }

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  return (
    <article className={styles.card}>
      <Link
        to={`/products/${product.slug}`}
        className={styles.imageLink}
        id={`product-card-${product.slug}`}
        aria-label={`Ver ${product.name}`}
      >
        <div className={styles.imageWrapper}>
          <img
            src={product.images[0]}
            alt={product.name}
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.badges}>
            {discount && <span className={styles.saleBadge}>−{discount}%</span>}
            {product.tags.includes('new') && !discount && (
              <span className={styles.newBadge}>Nuevo</span>
            )}
            {!product.inStock && <span className={styles.outBadge}>Agotado</span>}
          </div>
          <div className={styles.quickView} aria-hidden="true">Vista rápida →</div>
        </div>
      </Link>

      <div className={styles.info}>
        <Link to={`/products/${product.slug}`} className={styles.name}>
          {product.name}
        </Link>
        <div className={styles.priceRow}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          {product.compareAtPrice && (
            <span className={styles.comparePrice}>${product.compareAtPrice.toFixed(2)}</span>
          )}
        </div>
        <button
          className={[styles.addBtn, !product.inStock ? styles.disabled : ''].join(' ')}
          onClick={handleAddToCart}
          disabled={!product.inStock}
          id={`catalog-add-to-cart-${product.slug}`}
          aria-label={product.inStock ? `Agregar ${product.name} al carrito` : `${product.name} está agotado`}
        >
          {product.inStock ? 'Agregar al carrito' : 'Agotado'}
        </button>
      </div>
    </article>
  );
}

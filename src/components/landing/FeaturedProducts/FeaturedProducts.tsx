import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast, ToastContainer } from '@/components/ui/Toast/Toast';
import type { CartItem } from '@/data/types';
import styles from './FeaturedProducts.module.css';

export function FeaturedProducts() {
  const { addItem } = useCart();
  const { toasts, addToast, removeToast } = useToast();
  const featured = getFeaturedProducts().slice(0, 8);

  function handleAddToCart(product: ReturnType<typeof getFeaturedProducts>[number]) {
    const cartItem: CartItem = {
      id: `${product.id}-default`,
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      imageUrl: product.images[0],
      price: product.price,
      quantity: 1,
      selectedVariants: {},
    };
    addItem(cartItem);
    addToast(`${product.name} agregado al carrito`, 'success');
  }

  return (
    <>
      <section className={styles.section} aria-labelledby="featured-heading">
        <div className="container">
          <div className={styles.header}>
            <div>
              <h2 className={styles.title} id="featured-heading">Productos destacados</h2>
              <p className={styles.subtitle}>Selección de nuestros editores para esta temporada</p>
            </div>
            <Link to="/products" className={styles.viewAll} id="featured-view-all-link">
              Ver todos →
            </Link>
          </div>

          <div className={styles.grid}>
            {featured.map((product) => (
              <article key={product.id} className={styles.card}>
                <Link
                  to={`/products/${product.slug}`}
                  className={styles.imageLink}
                  id={`featured-product-${product.slug}`}
                  aria-label={`Ver ${product.name}`}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className={styles.image}
                      loading="lazy"
                    />
                    {product.compareAtPrice && (
                      <span className={styles.saleBadge}>Oferta</span>
                    )}
                    {product.tags.includes('new') && (
                      <span className={styles.newBadge}>Nuevo</span>
                    )}
                  </div>
                </Link>

                <div className={styles.info}>
                  <div className={styles.nameRow}>
                    <Link to={`/products/${product.slug}`} className={styles.name}>
                      {product.name}
                    </Link>
                  </div>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                    {product.compareAtPrice && (
                      <span className={styles.comparePrice}>${product.compareAtPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <button
                    className={[styles.addToCart, !product.inStock ? styles.outOfStock : ''].join(' ')}
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    id={`add-to-cart-${product.slug}`}
                    aria-label={product.inStock ? `Agregar ${product.name} al carrito` : `${product.name} está agotado`}
                  >
                    {product.inStock ? 'Agregar al carrito' : 'Agotado'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}

import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '@/data/products';
import { getCategoryBySlug } from '@/data/categories';
import { useCart } from '@/context/CartContext';
import { ImageGallery } from '@/components/pdp/ImageGallery/ImageGallery';
import { VariantSelector } from '@/components/pdp/VariantSelector/VariantSelector';
import { AddToCartButton } from '@/components/pdp/AddToCartButton/AddToCartButton';
import { useToast, ToastContainer } from '@/components/ui/Toast/Toast';
import type { CartItem } from '@/data/types';
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const category = product ? getCategoryBySlug(product.categorySlug) : undefined;
  const { addItem } = useCart();
  const { toasts, addToast, removeToast } = useToast();

  // Track selected variants
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [variantErrors, setVariantErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} — ShopCo`;
    } else {
      document.title = 'Producto no encontrado — ShopCo';
    }
  }, [product]);

  // Compute unique variant types
  const variantTypes = useMemo(() => {
    if (!product) return [];
    return [...new Set(product.variants.map((v) => v.type))];
  }, [product]);

  // Are all variant types selected?
  const allVariantsSelected = variantTypes.length === 0
    || variantTypes.every((type) => !!selected[type]);

  function handleSelect(type: string, value: string) {
    setSelected((prev) => ({ ...prev, [type]: value }));
    if (variantErrors[type]) {
      setVariantErrors((prev) => { const n = { ...prev }; delete n[type]; return n; });
    }
  }

  function handleAddToCart() {
    // Validate all variant types are chosen
    if (!allVariantsSelected) {
      const errors: Record<string, string> = {};
      for (const type of variantTypes) {
        if (!selected[type]) errors[type] = `Por favor selecciona un ${type}`;
      }
      setVariantErrors(errors);
      return;
    }

    setLoading(true);
    const variantKey = Object.entries(selected)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, v]) => v)
      .join('-');
    const cartItem: CartItem = {
      id: `${product!.id}-${variantKey || 'default'}`,
      productId: product!.id,
      productName: product!.name,
      productSlug: product!.slug,
      imageUrl: product!.images[0],
      price: product!.price,
      quantity: 1,
      selectedVariants: { ...selected },
    };
    addItem(cartItem);
    addToast(`${product!.name} agregado al carrito`, 'success');
    setTimeout(() => setLoading(false), 400);
  }

  // 404 state
  if (!product) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <span className={styles.notFoundIcon} aria-hidden="true">🔍</span>
          <h1 className={styles.notFoundTitle}>Producto no encontrado</h1>
          <p className={styles.notFoundDesc}>
            El producto que buscas no existe o ha sido eliminado.
          </p>
          <Link to="/products" className={styles.notFoundLink} id="pdp-back-to-catalog-btn">
            ← Volver a todos los productos
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  return (
    <>
      <div className={styles.page}>
        <div className="container">
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Migas de pan">
            <Link to="/" className={styles.breadcrumbLink}>Inicio</Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
            <Link to="/products" className={styles.breadcrumbLink}>Productos</Link>
            {category && (
              <>
                <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
                <Link
                  to={`/products?category=${category.slug}`}
                  className={styles.breadcrumbLink}
                >
                  {category.name}
                </Link>
              </>
            )}
            <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
            <span className={styles.breadcrumbCurrent} aria-current="page">{product.name}</span>
          </nav>

          {/* Main layout */}
          <div className={styles.layout}>
            {/* Left: Image gallery */}
            <div className={styles.galleryCol}>
              <ImageGallery images={product.images} productName={product.name} />
            </div>

            {/* Right: Product info */}
            <div className={styles.infoCol}>
              {/* Tags */}
              <div className={styles.tags}>
                {discount && (
                  <span className={styles.saleBadge}>−{discount}% desc.</span>
                )}
                {product.tags.includes('new') && (
                  <span className={styles.newBadge}>Nuevos ingresos</span>
                )}
                {product.tags.includes('bestseller') && (
                  <span className={styles.bestsellerBadge}>Más vendido</span>
                )}
              </div>

              <h1 className={styles.title}>{product.name}</h1>

              {/* Price */}
              <div className={styles.priceRow}>
                <span className={styles.price}>${product.price.toFixed(2)}</span>
                {product.compareAtPrice && (
                  <span className={styles.comparePrice}>${product.compareAtPrice.toFixed(2)}</span>
                )}
              </div>

              {/* Stock status */}
              <div className={styles.stockRow}>
                {product.inStock ? (
                  <span className={styles.inStock}>
                    <span className={styles.stockDot} aria-hidden="true" />
                    En stock
                  </span>
                ) : (
                  <span className={styles.outOfStock}>Agotado</span>
                )}
              </div>

              {/* Description */}
              <p className={styles.description}>{product.description}</p>

              {/* Variants */}
              {product.variants.length > 0 && (
                <VariantSelector
                  variants={product.variants}
                  selected={selected}
                  onSelect={handleSelect}
                  errors={variantErrors}
                />
              )}

              {/* Add to Cart */}
              <AddToCartButton
                inStock={product.inStock}
                allVariantsSelected={allVariantsSelected}
                onAdd={handleAddToCart}
                loading={loading}
              />

              {/* Trust badges */}
              <div className={styles.trust}>
                <div className={styles.trustItem}>
                  <span aria-hidden="true">🚚</span>
                  <span>Envío gratis en compras mayores a $75</span>
                </div>
                <div className={styles.trustItem}>
                  <span aria-hidden="true">↩</span>
                  <span>Devoluciones gratuitas por 30 días</span>
                </div>
                <div className={styles.trustItem}>
                  <span aria-hidden="true">🔒</span>
                  <span>Pago seguro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}

import styles from './AddToCartButton.module.css';

interface AddToCartButtonProps {
  inStock: boolean;
  allVariantsSelected: boolean;
  onAdd: () => void;
  loading?: boolean;
}

export function AddToCartButton({ inStock, allVariantsSelected, onAdd, loading = false }: AddToCartButtonProps) {
  const isDisabled = !inStock || !allVariantsSelected || loading;

  return (
    <div className={styles.wrapper}>
      <button
        className={[
          styles.btn,
          !inStock ? styles.outOfStock : '',
          !allVariantsSelected && inStock ? styles.variantPending : '',
        ].join(' ')}
        onClick={onAdd}
        disabled={isDisabled}
        id="pdp-add-to-cart-btn"
        aria-label={
          !inStock
            ? 'Agotado'
            : !allVariantsSelected
            ? 'Selecciona las opciones para agregar al carrito'
            : 'Agregar al carrito'
        }
      >
        {loading ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : !inStock ? (
          'Agotado'
        ) : !allVariantsSelected ? (
          'Seleccionar opciones'
        ) : (
          <>
            <span aria-hidden="true">🛍</span> Agregar al carrito
          </>
        )}
      </button>
      {!allVariantsSelected && inStock && (
        <p className={styles.hint}>Selecciona todas las opciones anteriores para continuar</p>
      )}
    </div>
  );
}

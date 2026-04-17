import styles from './VariantSelector.module.css';
import type { ProductVariant } from '@/data/types';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selected: Record<string, string>;
  onSelect: (type: string, value: string) => void;
  errors?: Record<string, string>;
}

export function VariantSelector({ variants, selected, onSelect, errors = {} }: VariantSelectorProps) {
  // Group by type — explicit lookup, no dynamic detection
  const groups: Record<string, ProductVariant[]> = {};
  for (const v of variants) {
    if (!groups[v.type]) groups[v.type] = [];
    groups[v.type].push(v);
  }

  return (
    <div className={styles.wrapper}>
      {Object.entries(groups).map(([type, options]) => (
        <div key={type} className={styles.group}>
          <div className={styles.groupHeader}>
            <span className={styles.groupLabel}>
              {options[0].label}
            </span>
            {selected[type] && (
              <span className={styles.selectedValue}>{selected[type]}</span>
            )}
          </div>
          {errors[type] && (
            <p className={styles.error} role="alert" id={`variant-error-${type}`}>
              {errors[type]}
            </p>
          )}

          <div className={styles.options}>
            {type === 'color'
              ? options.map((v) => (
                  <button
                    key={v.id}
                    className={[
                      styles.colorSwatch,
                      selected[type] === v.value ? styles.swatchActive : '',
                    ].join(' ')}
                    style={{ background: v.colorHex ?? '#ccc' }}
                    onClick={() => onSelect(type, v.value)}
                    title={v.value}
                    aria-label={`${v.label}: ${v.value}`}
                    aria-pressed={selected[type] === v.value}
                    id={`variant-${type}-${v.value.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                ))
              : options.map((v) => (
                  <button
                    key={v.id}
                    className={[
                      styles.sizeChip,
                      selected[type] === v.value ? styles.chipActive : '',
                    ].join(' ')}
                    onClick={() => onSelect(type, v.value)}
                    aria-label={`${v.label}: ${v.value}`}
                    aria-pressed={selected[type] === v.value}
                    id={`variant-${type}-${v.value.toLowerCase()}`}
                  >
                    {v.value}
                  </button>
                ))}
          </div>
        </div>
      ))}
    </div>
  );
}

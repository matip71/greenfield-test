import { useEffect } from 'react';
import { HeroSection } from '@/components/landing/HeroSection/HeroSection';
import { CategoryGrid } from '@/components/landing/CategoryGrid/CategoryGrid';
import { FeaturedProducts } from '@/components/landing/FeaturedProducts/FeaturedProducts';
import { PromoBanner } from '@/components/landing/PromoBanner/PromoBanner';
import { NewsletterSection } from '@/components/landing/NewsletterSection/NewsletterSection';

export default function LandingPage() {
  useEffect(() => {
    document.title = 'ShopCo — Productos premium para la vida moderna';
  }, []);

  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoBanner
        tag="Tiempo limitado"
        headline="Hasta 40% de descuento en calzado premium esta temporada"
        description="Entra a nuestra venta más grande del año. Zapatillas de cuero premium, botas y más — hechas para durar, a precios increíbles."
        ctaLabel="Ver ofertas"
        ctaHref="/products?category=footwear"
        imageUrl="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&auto=format&fit=crop&q=80"
      />
      <NewsletterSection />
    </>
  );
}

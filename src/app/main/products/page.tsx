import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/types';
import ProductSection from '@/components/ProductSection';

export const revalidate = 60;

export default async function ProductsPage() {
  const [
    { data: featuredProducts },
    { data: newProducts },
    { data: supplies },
  ] = await Promise.all([
    supabase.from('products').select('*').eq('is_active', true).eq('product_type', 'featured').order('sort_order'),
    supabase.from('products').select('*').eq('is_active', true).eq('product_type', 'new').order('sort_order'),
    supabase.from('products').select('*').eq('is_active', true).eq('product_type', 'supply').order('sort_order'),
  ]);

  return (
    <ProductSection
      featuredProducts={(featuredProducts as Product[]) || []}
      newProducts={(newProducts as Product[]) || []}
      supplies={(supplies as Product[]) || []}
    />
  );
}

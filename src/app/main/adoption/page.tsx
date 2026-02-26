import { supabase } from '@/lib/supabase';
import type { Adoption } from '@/lib/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreedingGallery from '@/components/BreedingGallery';

export const revalidate = 60;

export default async function AdoptionPage() {
  const [{ data: activeAnimals }, { data: inactiveAnimals }] = await Promise.all([
    supabase
      .from('adoptions')
      .select('*')
      .eq('is_active', true)
      .eq('status', 'Active')
      .order('sort_order'),
    supabase
      .from('adoptions')
      .select('*')
      .eq('is_active', true)
      .eq('status', 'Inactive')
      .order('sort_order'),
  ]);

  return (
    <>
      <Header />
      <BreedingGallery
        activeAnimals={(activeAnimals as Adoption[]) || []}
        inactiveAnimals={(inactiveAnimals as Adoption[]) || []}
      />
      <Footer />
    </>
  );
}

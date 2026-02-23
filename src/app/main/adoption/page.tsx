import { supabase } from '@/lib/supabase';
import type { Adoption } from '@/lib/types';
import AdoptionSection from '@/components/AdoptionSection';

export const revalidate = 60;

export default async function AdoptionPage() {
  const { data: adoptions } = await supabase
    .from('adoptions')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  return (
    <AdoptionSection adoptions={(adoptions as Adoption[]) || []} />
  );
}

import { supabase } from '@/lib/supabase';
import type { TeguSpecies } from '@/lib/types';
import AssetsPageClient from './AssetsPageClient';

export const revalidate = 60;

export default async function AssetsPage() {
  const { data } = await supabase
    .from('tegu_species')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  const species = (data as TeguSpecies[]) || [];

  return <AssetsPageClient species={species} />;
}

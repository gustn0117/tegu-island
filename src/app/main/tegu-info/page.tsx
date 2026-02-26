import { supabase } from '@/lib/supabase';
import type { TeguInfo } from '@/lib/types';
import TeguInfoPageClient from './TeguInfoPageClient';

export const revalidate = 60;

export default async function TeguInfoPage() {
  const { data: articles } = await supabase
    .from('tegu_info')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  return <TeguInfoPageClient articles={(articles as TeguInfo[]) || []} />;
}

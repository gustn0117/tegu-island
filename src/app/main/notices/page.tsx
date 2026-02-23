import { supabase } from '@/lib/supabase';
import type { Notice } from '@/lib/types';
import NoticesPageClient from './NoticesPageClient';

export const revalidate = 60;

export default async function NoticesPage() {
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return <NoticesPageClient notices={(notices as Notice[]) || []} />;
}

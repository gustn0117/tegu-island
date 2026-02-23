import { supabase } from '@/lib/supabase';
import type { DailyPost } from '@/lib/types';
import DailySection from '@/components/DailySection';

export const revalidate = 60;

export default async function DailyPage() {
  const { data: dailyPosts } = await supabase
    .from('daily_posts')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return (
    <DailySection posts={(dailyPosts as DailyPost[]) || []} />
  );
}

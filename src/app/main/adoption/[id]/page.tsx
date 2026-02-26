import { supabase } from '@/lib/supabase';
import type { Adoption } from '@/lib/types';
import AdoptionDetailClient from './AdoptionDetailClient';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
  const { data } = await supabase
    .from('adoptions')
    .select('id')
    .eq('is_active', true);
  return (data || []).map((a) => ({ id: String(a.id) }));
}

interface RouteProps {
  params: Promise<{ id: string }>;
}

export default async function AdoptionDetailPage({ params }: RouteProps) {
  const { id } = await params;
  const { data: adoption } = await supabase
    .from('adoptions')
    .select('*')
    .eq('id', parseInt(id))
    .eq('is_active', true)
    .single();

  if (!adoption) notFound();

  return <AdoptionDetailClient adoption={adoption as Adoption} />;
}

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const ALLOWED_TABLES = [
  'banner_slides',
  'notices',
  'care_sheets',
  'daily_posts',
  'products',
  'reviews',
  'tegu_species',
  'adoptions',
];

function authenticate(req: NextRequest): boolean {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD;
}

interface RouteContext {
  params: Promise<{ table: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  if (!authenticate(req)) {
    return NextResponse.json({ error: '인증 실패' }, { status: 401 });
  }

  const { table } = await context.params;
  if (!ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ error: '허용되지 않은 테이블' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('id', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest, context: RouteContext) {
  if (!authenticate(req)) {
    return NextResponse.json({ error: '인증 실패' }, { status: 401 });
  }

  const { table } = await context.params;
  if (!ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ error: '허용되지 않은 테이블' }, { status: 400 });
  }

  const body = await req.json();
  const { data, error } = await supabase.from(table).insert(body).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest, context: RouteContext) {
  if (!authenticate(req)) {
    return NextResponse.json({ error: '인증 실패' }, { status: 401 });
  }

  const { table } = await context.params;
  if (!ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ error: '허용되지 않은 테이블' }, { status: 400 });
  }

  const body = await req.json();
  const { id, ...updateData } = body;

  const { data, error } = await supabase
    .from(table)
    .update({ ...updateData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  if (!authenticate(req)) {
    return NextResponse.json({ error: '인증 실패' }, { status: 401 });
  }

  const { table } = await context.params;
  if (!ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ error: '허용되지 않은 테이블' }, { status: 400 });
  }

  const { id } = await req.json();
  const { error } = await supabase.from(table).delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

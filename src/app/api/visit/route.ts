import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, visitors, date, time, message } = body;

    if (!name || !phone || !date || !time) {
      return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('visit_reservations')
      .insert({
        name,
        phone,
        visitors: visitors ? Number(visitors) : 1,
        visit_date: date,
        visit_time: time,
        message: message || null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

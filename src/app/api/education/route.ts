import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { org_name, org_type, contact_name, phone } = body;
    if (!org_name || !org_type || !contact_name || !phone) {
      return NextResponse.json({ error: '필수 항목을 모두 입력해주세요' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('edu_applications')
      .insert({
        org_name: body.org_name,
        org_type: body.org_type,
        contact_name: body.contact_name,
        phone: body.phone,
        email: body.email || null,
        participants: body.participants ? parseInt(body.participants) : null,
        preferred_date: body.preferred_date || null,
        message: body.message || null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

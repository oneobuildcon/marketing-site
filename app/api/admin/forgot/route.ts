import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateOtp, saveOtp } from '@/lib/adminOtp';

const ADMIN_EMAIL = 'oneobuildcon@gmail.com';

export async function POST() {
  try {
    const key = process.env.RESEND_API_KEY;
    if (!key) return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    const code = generateOtp();
    saveOtp(code);
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: 'One O Buildcon <onboarding@resend.dev>',
      to: [ADMIN_EMAIL],
      subject: `Admin password reset code: ${code}`,
      text:
        `Your One O Buildcon admin password reset code is:\n\n` +
        `${code}\n\n` +
        `This code expires in 10 minutes.\n\n` +
        `If you did not request this, you can ignore this email.`,
    });
    if (error) {
      console.error('forgot: resend error', error);
      return NextResponse.json({ error: 'Could not send email. Try again.' }, { status: 500 });
    }
    return NextResponse.json({ ok: true, sentTo: ADMIN_EMAIL.replace(/(.{2}).+(@.+)/, '$1***$2') });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}

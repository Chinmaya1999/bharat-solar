import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'saiadityabehera@bharatsolarsolution.com',
        pass: process.env.GMAIL_APP_PASSWORD || 'gwvv gtks mulq puuq',
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'saiadityabehera@bharatsolarsolution.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure the transporter
    // Requires SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // Use your own email to avoid spam blocks
      to: process.env.SMTP_USER, // Send it to yourself
      replyTo: email,
      subject: `Portfolio Contact Form: ${subject || 'New Message from ' + name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
          </style>
        </head>
        <body style="background-color: #f8fafc; padding: 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <h2 style="margin-top: 0; color: #1e293b; border-bottom: 2px solid #6366f1; padding-bottom: 12px; display: inline-block;">
              New Contact Message
            </h2>
            
            <div style="margin: 24px 0;">
              <p style="margin: 8px 0; color: #475569; font-size: 15px;">
                <strong style="color: #1e293b; display: inline-block; width: 70px;">Name:</strong> ${name}
              </p>
              <p style="margin: 8px 0; color: #475569; font-size: 15px;">
                <strong style="color: #1e293b; display: inline-block; width: 70px;">Email:</strong> 
                <a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a>
              </p>
              <p style="margin: 8px 0; color: #475569; font-size: 15px;">
                <strong style="color: #1e293b; display: inline-block; width: 70px;">Subject:</strong> ${subject || 'N/A'}
              </p>
            </div>
            
            <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-top: 24px; border: 1px solid #e2e8f0;">
              <h3 style="margin-top: 0; margin-bottom: 12px; color: #1e293b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Message</h3>
              <p style="margin: 0; white-space: pre-wrap; color: #334155; line-height: 1.6; font-size: 15px;">${message}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message.' },
      { status: 500 }
    );
  }
}

// src/lib/email.ts
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail({ to, subject, html, from }: EmailOptions) {
  const mailOptions = {
    from: from || process.env.EMAIL_FROM || 'CEJEC <noreply@cejec.edu.ht>',
    to,
    subject,
    html: wrapEmailHTML(html),
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:', info.messageId)
    return info
  } catch (error) {
    console.error('Email error:', error)
    // Don't throw — email failure shouldn't break the API response
  }
}

function wrapEmailHTML(content: string): string {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>CEJEC</title>
    </head>
    <body style="margin:0;padding:0;background:#f8f9ff;font-family:'DM Sans',Arial,sans-serif;">
      <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(26,41,128,0.08);">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#1a2980,#0f1354);padding:32px 40px;text-align:center;">
          <h1 style="color:#fff;font-size:28px;margin:0;font-weight:700;">CEJEC</h1>
          <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px;">Centre d'Excellence pour la Jeunesse et l'Éducation</p>
        </div>
        <!-- Content -->
        <div style="padding:40px;color:#0f1354;line-height:1.6;">
          ${content}
        </div>
        <!-- Footer -->
        <div style="background:#f8f9ff;padding:24px 40px;text-align:center;border-top:1px solid #e2e6ff;">
          <p style="color:#5a6494;font-size:12px;margin:0;">
            © ${new Date().getFullYear()} CEJEC · Port-au-Prince, Haïti<br/>
            <a href="https://cejec.edu.ht" style="color:#1a2980;">cejec.edu.ht</a> ·
            <a href="mailto:info@cejec.edu.ht" style="color:#1a2980;">info@cejec.edu.ht</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

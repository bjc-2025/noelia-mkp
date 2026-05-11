import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, phone, service, date, message } = await request.json()

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const htmlBody = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header with branding -->
        <div style="background-color: #1a1a1a; padding: 32px 40px; text-align: center;">
          <h1 style="margin: 0; font-size: 20px; font-weight: 300; color: #ffffff; letter-spacing: 6px; text-transform: uppercase;">
            NOELIA MAKEUP
          </h1>
        </div>

        <!-- Blush accent bar -->
        <div style="height: 4px; background-color: #FEE6E7;"></div>

        <!-- Content -->
        <div style="padding: 40px;">
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #737373; margin: 0 0 24px 0;">
            New Inquiry Received
          </p>

          <!-- Client details -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
            <tr>
              <td style="padding: 12px 0; color: #a3a3a3; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 140px; vertical-align: top; border-bottom: 1px solid #f5f5f5;">Name</td>
              <td style="padding: 12px 0; color: #1a1a1a; font-size: 14px; border-bottom: 1px solid #f5f5f5;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #a3a3a3; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top; border-bottom: 1px solid #f5f5f5;">Email</td>
              <td style="padding: 12px 0; color: #1a1a1a; font-size: 14px; border-bottom: 1px solid #f5f5f5;">
                <a href="mailto:${email}" style="color: #1a1a1a; text-decoration: none;">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 12px 0; color: #a3a3a3; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top; border-bottom: 1px solid #f5f5f5;">Phone</td>
              <td style="padding: 12px 0; color: #1a1a1a; font-size: 14px; border-bottom: 1px solid #f5f5f5;">${phone}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0; color: #a3a3a3; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top; border-bottom: 1px solid #f5f5f5;">Service</td>
              <td style="padding: 12px 0; color: #1a1a1a; font-size: 14px; border-bottom: 1px solid #f5f5f5;">
                <span style="display: inline-block; background-color: #FEE6E7; padding: 4px 12px; border-radius: 4px; font-size: 13px;">${service}</span>
              </td>
            </tr>
            ${date ? `
            <tr>
              <td style="padding: 12px 0; color: #a3a3a3; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top; border-bottom: 1px solid #f5f5f5;">Date</td>
              <td style="padding: 12px 0; color: #1a1a1a; font-size: 14px; border-bottom: 1px solid #f5f5f5;">${date}</td>
            </tr>
            ` : ''}
          </table>

          <!-- Message -->
          <div style="background-color: #fafafa; border-left: 3px solid #FEE6E7; padding: 20px 24px; margin-bottom: 32px;">
            <p style="color: #a3a3a3; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 12px 0;">Message</p>
            <p style="color: #1a1a1a; font-size: 14px; line-height: 1.7; white-space: pre-wrap; margin: 0;">${message}</p>
          </div>

          <!-- Reply button -->
          <div style="text-align: center; margin-bottom: 16px;">
            <a href="mailto:${email}" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; padding: 12px 32px; text-decoration: none; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">
              Reply to ${name.split(' ')[0]}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #fafafa; padding: 24px 40px; text-align: center; border-top: 1px solid #f0f0f0;">
          <p style="color: #a3a3a3; font-size: 11px; letter-spacing: 1px; margin: 0;">
            NOELIA MAKEUP &middot; noeliamkp.com
          </p>
        </div>
      </div>
    `

    const { error } = await resend.emails.send({
      from: 'Noelia MKP <onboarding@resend.dev>',
      to: 'noeliamakeupp@gmail.com',
      subject: `New Inquiry – ${service}`,
      replyTo: email,
      html: htmlBody,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        Importance: 'high',
      },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

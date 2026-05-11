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
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 400; color: #1a1a1a; border-bottom: 1px solid #e5e5e5; padding-bottom: 16px; margin-bottom: 24px;">
          New Inquiry
        </h1>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
          <tr>
            <td style="padding: 10px 0; color: #737373; font-size: 14px; width: 140px; vertical-align: top;">Name</td>
            <td style="padding: 10px 0; color: #1a1a1a; font-size: 14px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #737373; font-size: 14px; vertical-align: top;">Email</td>
            <td style="padding: 10px 0; color: #1a1a1a; font-size: 14px;">
              <a href="mailto:${email}" style="color: #1a1a1a;">${email}</a>
            </td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding: 10px 0; color: #737373; font-size: 14px; vertical-align: top;">Phone</td>
            <td style="padding: 10px 0; color: #1a1a1a; font-size: 14px;">${phone}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 10px 0; color: #737373; font-size: 14px; vertical-align: top;">Service</td>
            <td style="padding: 10px 0; color: #1a1a1a; font-size: 14px;">${service}</td>
          </tr>
          ${date ? `
          <tr>
            <td style="padding: 10px 0; color: #737373; font-size: 14px; vertical-align: top;">Preferred Date</td>
            <td style="padding: 10px 0; color: #1a1a1a; font-size: 14px;">${date}</td>
          </tr>
          ` : ''}
        </table>

        <div style="border-top: 1px solid #e5e5e5; padding-top: 20px;">
          <p style="color: #737373; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Message</p>
          <p style="color: #1a1a1a; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="margin-top: 40px; padding-top: 16px; border-top: 1px solid #e5e5e5;">
          <p style="color: #a3a3a3; font-size: 12px;">Sent from noeliamkp.com</p>
        </div>
      </div>
    `

    const { error } = await resend.emails.send({
      from: 'Noelia MKP <onboarding@resend.dev>',
      to: 'noeliamakeupp@gmail.com',
      subject: `New Inquiry – ${service}`,
      replyTo: email,
      html: htmlBody,
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

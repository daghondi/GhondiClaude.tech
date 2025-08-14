import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { Resend } from 'resend'
import { Database } from '@/lib/database.types'

// Initialize Supabase client
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Validation schema
const unsubscribeSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  token: z.string().optional()
}).refine(data => data.email || data.token, {
  message: "Either email or token is required"
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = unsubscribeSchema.parse(body)
    
    let subscriber
    
    if (validatedData.token) {
      // Unsubscribe by token (one-click unsubscribe)
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('id, email, is_active')
        .eq('unsubscribe_token', validatedData.token)
        .single()
      
      if (error || !data) {
        return NextResponse.json(
          { success: false, error: 'Invalid unsubscribe token' },
          { status: 400 }
        )
      }
      
      subscriber = data
    } else if (validatedData.email) {
      // Unsubscribe by email
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('id, email, is_active')
        .eq('email', validatedData.email)
        .single()
      
      if (error || !data) {
        return NextResponse.json(
          { success: false, error: 'Email not found in our newsletter list' },
          { status: 404 }
        )
      }
      
      subscriber = data
    }
    
    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: 'Subscriber not found' },
        { status: 404 }
      )
    }
    
    // Check if already unsubscribed
    if (!subscriber.is_active) {
      return NextResponse.json(
        { success: true, message: 'You are already unsubscribed', alreadyUnsubscribed: true },
        { status: 200 }
      )
    }
    
    // Deactivate subscription
    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriber.id)
    
    if (updateError) {
      console.error('Failed to unsubscribe:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to unsubscribe' },
        { status: 500 }
      )
    }
    
    // Send farewell email
    try {
      await sendFarewellEmail(subscriber.email)
    } catch (emailError) {
      console.error('Failed to send farewell email:', emailError)
      // Don't fail the unsubscription if email fails
    }
    
    return NextResponse.json(
      { success: true, message: 'Successfully unsubscribed from newsletter' },
      { status: 200 }
    )
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Newsletter unsubscribe error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const token = searchParams.get('token')
    
    if (!email && !token) {
      // Return unsubscribe page
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/unsubscribe`)
    }
    
    // Handle one-click unsubscribe
    let subscriber
    
    if (token) {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('id, email, is_active')
        .eq('unsubscribe_token', token)
        .single()
      
      if (error || !data) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/unsubscribe?error=invalid_token`)
      }
      
      subscriber = data
    } else if (email) {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('id, email, is_active')
        .eq('email', email)
        .single()
      
      if (error || !data) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/unsubscribe?error=not_found`)
      }
      
      subscriber = data
    }
    
    if (!subscriber) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/unsubscribe?error=not_found`)
    }
    
    if (!subscriber.is_active) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/unsubscribe?already_unsubscribed=true`)
    }
    
    // Deactivate subscription
    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriber.id)
    
    if (updateError) {
      console.error('Failed to unsubscribe:', updateError)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/unsubscribe?error=failed`)
    }
    
    // Send farewell email
    try {
      await sendFarewellEmail(subscriber.email)
    } catch (emailError) {
      console.error('Failed to send farewell email:', emailError)
    }
    
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/unsubscribe?success=true`)
    
  } catch (error) {
    console.error('Newsletter unsubscribe GET error:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/unsubscribe?error=server_error`)
  }
}

async function sendFarewellEmail(email: string) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Sorry to see you go</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 40px 0; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 8px 8px 0 0; }
        .content { padding: 40px; background: #fff; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Sorry to see you go!</h1>
          <p>You've been unsubscribed</p>
        </div>
        
        <div class="content">
          <h2>We'll miss you!</h2>
          
          <p>You have successfully unsubscribed from my newsletter. While I'm sad to see you go, I respect your decision.</p>
          
          <p>If you change your mind, you can always subscribe again at <a href="${process.env.NEXT_PUBLIC_SITE_URL}">ghondiclaude.me</a>.</p>
          
          <p>If you unsubscribed by mistake or have any feedback about why you left, I'd love to hear from you. Just reply to this email!</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}" class="button">Visit My Website</a>
          </div>
          
          <p>Thank you for being part of my journey, even if it was just for a while.</p>
          
          <p>Best wishes,<br>
          <strong>GhondiClaude</strong></p>
        </div>
        
        <div class="footer">
          <p>GhondiClaude.me | Art • Technology • Urban Planning</p>
        </div>
      </div>
    </body>
    </html>
  `
  
  await resend.emails.send({
    from: 'noreply@ghondiclaude.me',
    to: [email],
    subject: 'Sorry to see you go - Unsubscribed',
    html: emailHtml,
    replyTo: process.env.CONTACT_EMAIL || 'hello@ghondiclaude.me'
  })
}

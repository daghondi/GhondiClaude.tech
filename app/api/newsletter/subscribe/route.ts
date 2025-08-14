import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { Resend } from 'resend'
import { Database } from '@/lib/database.types'

// Validation schema
const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
  source: z.enum(['footer', 'blog', 'shop', 'contact']).default('footer')
})

// Generate verification token
function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15)
}

export async function POST(request: NextRequest) {
  try {
    // Initialize clients inside the function to avoid build-time issues
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    const body = await request.json()
    
    // Validate input
    const validatedData = subscribeSchema.parse(body)
    
    // Check if email already exists
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('id, is_active, verified_at')
      .eq('email', validatedData.email)
      .single()
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Database check error:', checkError)
      return NextResponse.json(
        { success: false, error: 'Database error' },
        { status: 500 }
      )
    }
    
    // If subscriber exists and is active
    if (existingSubscriber) {
      if (existingSubscriber.is_active) {
        return NextResponse.json(
          { 
            success: true, 
            message: 'You are already subscribed to our newsletter!',
            alreadySubscribed: true
          },
          { status: 200 }
        )
      } else {
        // Reactivate inactive subscriber
        const verificationToken = generateToken()
        
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({
            is_active: true,
            verification_token: verificationToken,
            subscription_source: validatedData.source,
            name: validatedData.name || null,
            updated_at: new Date().toISOString()
          })
          .eq('email', validatedData.email)
        
        if (updateError) {
          console.error('Failed to reactivate subscriber:', updateError)
          return NextResponse.json(
            { success: false, error: 'Failed to reactivate subscription' },
            { status: 500 }
          )
        }
        
        // Send welcome email
        await sendWelcomeEmail(validatedData.email, resend, validatedData.name, verificationToken)
        
        return NextResponse.json(
          { 
            success: true, 
            message: 'Welcome back! Please check your email to confirm your subscription.',
            reactivated: true
          },
          { status: 200 }
        )
      }
    }
    
    // Create new subscriber
    const verificationToken = generateToken()
    
    const { data: newSubscriber, error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: validatedData.email,
        name: validatedData.name || null,
        subscription_source: validatedData.source,
        verification_token: verificationToken,
        is_active: true // We'll set to false after email verification is implemented
      })
      .select()
      .single()
    
    if (insertError) {
      console.error('Failed to create subscriber:', insertError)
      return NextResponse.json(
        { success: false, error: 'Failed to subscribe' },
        { status: 500 }
      )
    }
    
    // Send welcome email
    try {
      await sendWelcomeEmail(validatedData.email, resend, validatedData.name, verificationToken)
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Don't fail the subscription if email fails
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed! Please check your email to confirm.',
        subscriber: {
          id: newSubscriber.id,
          email: newSubscriber.email
        }
      },
      { status: 201 }
    )
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid input data',
          details: error.errors 
        },
        { status: 400 }
      )
    }
    
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function sendWelcomeEmail(email: string, resend: Resend, name?: string, verificationToken?: string) {
  const displayName = name || 'Friend'
  const verificationUrl = verificationToken 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/verify?token=${verificationToken}`
    : undefined
  
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Welcome to GhondiClaude's Newsletter</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 40px 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px 8px 0 0; }
        .content { padding: 40px; background: #fff; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to My Newsletter!</h1>
          <p>Thank you for subscribing</p>
        </div>
        
        <div class="content">
          <h2>Hello ${displayName}!</h2>
          
          <p>Welcome to my newsletter! I'm excited to share my journey with you through:</p>
          
          <ul>
            <li>🎨 <strong>Fine Art</strong> - Original artworks and creative insights</li>
            <li>💻 <strong>Technology</strong> - Innovative projects and experiments</li>
            <li>🏙️ <strong>Urban Planning</strong> - Sustainable city design and development</li>
          </ul>
          
          ${verificationUrl ? `
          <p>To complete your subscription, please verify your email address:</p>
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </div>
          ` : ''}
          
          <p>You'll receive updates about new projects, behind-the-scenes content, and insights into my creative process. I promise to keep it interesting and never spam you!</p>
          
          <p>Thanks for being part of this journey!</p>
          
          <p>Best regards,<br>
          <strong>GhondiClaude</strong></p>
        </div>
        
        <div class="footer">
          <p>GhondiClaude.me | Art • Technology • Urban Planning</p>
          <p>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/unsubscribe?email=${encodeURIComponent(email)}" 
               style="color: #666; text-decoration: none;">Unsubscribe</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `
  
  await resend.emails.send({
    from: 'noreply@ghondiclaude.me',
    to: [email],
    subject: 'Welcome to GhondiClaude\'s Newsletter! 🎨',
    html: emailHtml,
    replyTo: process.env.CONTACT_EMAIL || 'hello@ghondiclaude.me'
  })
}

// GET endpoint for subscription stats (admin only)
export async function GET(request: NextRequest) {
  try {
    // Initialize Supabase client inside function
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    
    if (action === 'stats') {
      // Get subscription statistics
      const { data: stats, error } = await supabase
        .from('newsletter_subscribers')
        .select('subscription_source, is_active')
      
      if (error) {
        console.error('Failed to get stats:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to get statistics' },
          { status: 500 }
        )
      }
      
      const totalSubscribers = stats.length
      const activeSubscribers = stats.filter(s => s.is_active).length
      const bySource = stats.reduce((acc, sub) => {
        const source = sub.subscription_source || 'unknown'
        acc[source] = (acc[source] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      return NextResponse.json({
        success: true,
        stats: {
          total: totalSubscribers,
          active: activeSubscribers,
          inactive: totalSubscribers - activeSubscribers,
          bySource
        }
      })
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
    
  } catch (error) {
    console.error('Newsletter GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

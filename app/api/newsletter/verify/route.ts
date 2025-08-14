import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'

// Initialize Supabase client
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Verification token is required' },
        { status: 400 }
      )
    }
    
    // Find subscriber by verification token
    const { data: subscriber, error: findError } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, verified_at')
      .eq('verification_token', token)
      .single()
    
    if (findError || !subscriber) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }
    
    // Check if already verified
    if (subscriber.verified_at) {
      return NextResponse.json(
        { success: true, message: 'Email already verified!', alreadyVerified: true },
        { status: 200 }
      )
    }
    
    // Mark as verified
    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({
        verified_at: new Date().toISOString(),
        verification_token: null, // Clear the token after verification
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriber.id)
    
    if (updateError) {
      console.error('Failed to verify subscriber:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to verify email' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { success: true, message: 'Email verified successfully!', verified: true },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Newsletter verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

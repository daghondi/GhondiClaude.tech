import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'
import { NewsletterSubscriber, NewsletterStats } from '@/types'

// Initialize Supabase client
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/**
 * Get all active newsletter subscribers
 */
export async function getActiveSubscribers(): Promise<NewsletterSubscriber[]> {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .eq('is_active', true)
    .order('subscription_date', { ascending: false })
  
  if (error) {
    console.error('Error fetching subscribers:', error)
    return []
  }
  
  return data || []
}

/**
 * Get newsletter subscription statistics
 */
export async function getNewsletterStats(): Promise<NewsletterStats> {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('subscription_source, is_active')
  
  if (error) {
    console.error('Error fetching newsletter stats:', error)
    return { total: 0, active: 0, inactive: 0, bySource: {} }
  }
  
  const stats = data || []
  const total = stats.length
  const active = stats.filter(s => s.is_active).length
  const inactive = total - active
  
  const bySource = stats.reduce((acc, sub) => {
    const source = sub.subscription_source || 'unknown'
    acc[source] = (acc[source] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return {
    total,
    active,
    inactive,
    bySource
  }
}

/**
 * Check if an email is already subscribed
 */
export async function isEmailSubscribed(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('is_active')
    .eq('email', email)
    .single()
  
  if (error) {
    return false
  }
  
  return data?.is_active || false
}

/**
 * Subscribe an email to the newsletter
 */
export async function subscribeEmail(
  email: string, 
  name?: string, 
  source: string = 'website'
): Promise<{ success: boolean; message: string; subscriber?: NewsletterSubscriber }> {
  try {
    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', email)
      .single()
    
    if (existing && existing.is_active) {
      return {
        success: true,
        message: 'You are already subscribed to our newsletter!',
      }
    }
    
    // Generate verification and unsubscribe tokens
    const verificationToken = Math.random().toString(36).substring(2, 15) + 
                             Math.random().toString(36).substring(2, 15)
    
    let result
    
    if (existing && !existing.is_active) {
      // Reactivate existing subscriber
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .update({
          is_active: true,
          verification_token: verificationToken,
          subscription_source: source,
          name: name || existing.name,
          updated_at: new Date().toISOString()
        })
        .eq('email', email)
        .select()
        .single()
      
      if (error) throw error
      result = data
    } else {
      // Create new subscriber
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email,
          name,
          subscription_source: source,
          verification_token: verificationToken,
          is_active: true
        })
        .select()
        .single()
      
      if (error) throw error
      result = data
    }
    
    return {
      success: true,
      message: 'Successfully subscribed! Please check your email to confirm.',
      subscriber: result as NewsletterSubscriber
    }
    
  } catch (error) {
    console.error('Subscribe error:', error)
    return {
      success: false,
      message: 'Failed to subscribe. Please try again.'
    }
  }
}

/**
 * Unsubscribe an email from the newsletter
 */
export async function unsubscribeEmail(
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('email', email)
      .select()
    
    if (error) throw error
    
    if (!data || data.length === 0) {
      return {
        success: false,
        message: 'Email address not found in our newsletter list.'
      }
    }
    
    return {
      success: true,
      message: 'Successfully unsubscribed from newsletter.'
    }
    
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return {
      success: false,
      message: 'Failed to unsubscribe. Please try again.'
    }
  }
}

/**
 * Verify a subscriber's email using verification token
 */
export async function verifySubscriber(
  token: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({
        verified_at: new Date().toISOString(),
        verification_token: null,
        updated_at: new Date().toISOString()
      })
      .eq('verification_token', token)
      .select()
    
    if (error) throw error
    
    if (!data || data.length === 0) {
      return {
        success: false,
        message: 'Invalid or expired verification token.'
      }
    }
    
    return {
      success: true,
      message: 'Email verified successfully!'
    }
    
  } catch (error) {
    console.error('Verify error:', error)
    return {
      success: false,
      message: 'Failed to verify email. Please try again.'
    }
  }
}

/**
 * Get subscriber by unsubscribe token
 */
export async function getSubscriberByUnsubscribeToken(
  token: string
): Promise<NewsletterSubscriber | null> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('unsubscribe_token', token)
      .single()
    
    if (error || !data) {
      return null
    }
    
    return data as NewsletterSubscriber
    
  } catch (error) {
    console.error('Get subscriber by token error:', error)
    return null
  }
}

/**
 * Clean up old unverified subscribers (optional maintenance function)
 */
export async function cleanupUnverifiedSubscribers(daysOld: number = 30): Promise<number> {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - daysOld)
  
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .is('verified_at', null)
      .lt('subscription_date', cutoffDate.toISOString())
      .select()
    
    if (error) throw error
    
    return data?.length || 0
    
  } catch (error) {
    console.error('Cleanup error:', error)
    return 0
  }
}

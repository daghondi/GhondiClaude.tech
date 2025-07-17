import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  phone: z.string().optional(),
  company: z.string().optional(),
  project_type: z.string().optional(),
  budget_range: z.string().optional(),
  timeline: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request data
    const validatedData = contactSchema.parse(body)
    
    // TODO: Replace with actual database insertion
    // For now, we'll simulate saving to Supabase
    const contactSubmission = {
      id: Math.random().toString(36).substr(2, 9),
      ...validatedData,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    
    // TODO: Send email notification
    // This would typically use a service like SendGrid, Resend, or similar
    console.log('Contact form submission:', contactSubmission)
    
    // TODO: Save to Supabase database
    // const { data, error } = await supabase
    //   .from('contacts')
    //   .insert([contactSubmission])
    
    // Simulate a delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! I\'ll get back to you within 24 hours.',
        id: contactSubmission.id
      },
      { status: 200 }
    )
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed',
          errors: error.errors
        },
        { status: 400 }
      )
    }
    
    console.error('Contact form error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Something went wrong. Please try again later.'
      },
      { status: 500 }
    )
  }
}

// Handle GET requests (maybe for fetching contact statistics)
export async function GET(request: NextRequest) {
  // This could return contact form statistics, recent submissions, etc.
  // For now, just return basic info
  return NextResponse.json({
    success: true,
    endpoints: {
      POST: 'Submit contact form',
      GET: 'Get contact information'
    },
    contact_info: {
      email: 'contact@ghondiclaude.me',
      response_time: '24 hours',
      availability: 'Global, Remote',
    }
  })
}

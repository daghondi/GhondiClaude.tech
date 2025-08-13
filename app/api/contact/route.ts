import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

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
    
    // Create email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ''}
          ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">Project Details</h3>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          ${validatedData.project_type ? `<p><strong>Project Type:</strong> ${validatedData.project_type}</p>` : ''}
          ${validatedData.budget_range ? `<p><strong>Budget Range:</strong> ${validatedData.budget_range}</p>` : ''}
          ${validatedData.timeline ? `<p><strong>Timeline:</strong> ${validatedData.timeline}</p>` : ''}
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${validatedData.message}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 14px;">
            Sent from your portfolio contact form at ghondiclaude.me
          </p>
        </div>
      </div>
    `

    // Send email notification using Resend
    try {
      const emailResult = await resend.emails.send({
        from: 'GhondiClaude Portfolio <noreply@ghondiclaude.me>',
        to: [process.env.CONTACT_EMAIL || 'your-email@example.com'],
        subject: `New Contact: ${validatedData.subject}`,
        html: emailHtml,
        replyTo: validatedData.email,
      })

      console.log('Email sent successfully:', emailResult)
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Don't fail the entire request if email fails - log it instead
    }

    // Optional: Store in database for backup
    const contactSubmission = {
      id: Math.random().toString(36).substr(2, 9),
      ...validatedData,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log('Contact form submission processed:', contactSubmission)
    
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

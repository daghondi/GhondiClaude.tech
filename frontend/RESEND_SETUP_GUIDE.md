# Resend Email Setup Guide

## Step 1: Create Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Your Domain (Optional but Recommended)

1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter `ghondiclaude.me`
4. Follow the DNS setup instructions to verify your domain
5. This allows you to send emails from `noreply@ghondiclaude.me`

## Step 3: Create API Key

1. In Resend dashboard, go to "API Keys"
2. Click "Create API Key"
3. Name it something like "Portfolio Contact Form"
4. Copy the API key (starts with `re_`)

## Step 4: Update Environment Variables

### Local Development (.env.local)
```bash
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_EMAIL=your-actual-email@example.com
```

### Production (Vercel)
Run these commands to add environment variables to Vercel:

```bash
# Add Resend API Key
vercel env add RESEND_API_KEY

# Add your contact email
vercel env add CONTACT_EMAIL
```

When prompted:
- Select "Production, Preview, and Development" for both variables
- Paste your actual API key and email address

## Step 5: Deploy

After adding the environment variables, redeploy:

```bash
vercel --prod
```

## How It Works

1. When someone submits the contact form, you'll receive an email at the address specified in `CONTACT_EMAIL`
2. The email will contain all form details in a nicely formatted HTML layout
3. You can reply directly to the email, and it will go to the person who submitted the form
4. The "Reply-To" header is set to the submitter's email for easy responses

## Troubleshooting

- **Domain verification issues**: If you skip domain setup, emails will be sent from Resend's domain
- **Rate limits**: Free tier allows 3,000 emails/month and 100 emails/day
- **Delivery issues**: Check your spam folder initially

## Features Included

- ✅ Professional HTML email template
- ✅ All form fields included in email
- ✅ Reply-To header set for easy responses
- ✅ Error handling and logging
- ✅ Form validation before sending
- ✅ Success/error feedback to users

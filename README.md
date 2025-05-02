
# AI Workshop Lite - Intake Form

A sleek, single-page intake form for the free "AI Workshop Lite" community. This form collects essential onboarding data, stops bots with Google reCAPTCHA v3, and after successful submission, presents a friendly upsell page.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

2. Copy the `.env.example` to `.env.local` and update with your reCAPTCHA keys:
   ```bash
   cp .env.example .env.local
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. Open [http://localhost:8080](http://localhost:8080) to see the form.

## Configuration

### reCAPTCHA v3 Setup

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin) and register a new site
2. Choose reCAPTCHA v3
3. Add your domain(s) to the list
4. Get your Site Key and Secret Key
5. Add them to your `.env.local` file:
   ```
   RECAPTCHA_SITE_KEY=your_site_key_here
   RECAPTCHA_SECRET_KEY=your_secret_key_here
   ```

### Webhook Configuration

The form submits data to an n8n webhook. The default webhook URL and authentication credentials are already set up, but you can modify them in the `.env.local` file if needed:

```
WEBHOOK_URL=your_webhook_url
WEBHOOK_USERNAME=your_username
WEBHOOK_PASSWORD=your_password
```

## File Structure

```
src/
├── components/
│   ├── ConfettiEmoji.tsx   # Confetti animation component
│   ├── Hero.tsx            # Hero section component
│   └── IntakeForm.tsx      # Main form component with validation
├── pages/
│   ├── Index.tsx           # Landing page with form
│   └── Thanks.tsx          # Thank you page with upsell
└── App.tsx                 # App component with routes
```

## Tech Stack

- React
- TypeScript
- React Hook Form for form validation
- React Router for navigation
- Tailwind CSS for styling
- reCAPTCHA v3 for bot prevention

## Form Fields

All fields are required and include validation:
- First Name (≥ 2 letters, alpha)
- Last Name (≥ 2 letters, alpha)
- Email (RFC-5322 valid, lowercase)
- Referral Source (select dropdown)
- Technical Experience Level (radio buttons)
- Weekly Learning Time (select dropdown)
- Hidden Timestamp (auto-filled on submit)


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

2. Copy the `.env.example` to `.env` and update with your reCAPTCHA keys and webhook credentials:
   ```bash
   cp .env.example .env
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

## Docker Deployment

The application can be easily deployed using Docker:

1. Create a `.env` file with your environment variables:
   ```
   VITE_RECAPTCHA_SITE_KEY=your_site_key_here
   VITE_WEBHOOK_URL=your_webhook_url
   VITE_WEBHOOK_USERNAME=your_webhook_username
   VITE_WEBHOOK_PASSWORD=your_webhook_password
   ```

2. Build and run using Docker Compose:
   ```bash
   # Make the deployment script executable
   chmod +x deploy.sh
   
   # Run the deployment script
   ./deploy.sh
   
   # Alternatively, you can run Docker Compose directly
   docker-compose up --build -d
   ```

3. The application will be accessible at [http://localhost:8080](http://localhost:8080)

### Using with Nginx Proxy Manager

If you're using Nginx Proxy Manager:

1. Deploy the Docker container as described above
2. In Nginx Proxy Manager, create a new proxy host:
   - Domain Names: Your domain(s)
   - Scheme: http
   - Forward Hostname/IP: Your server's IP or `app` if using Docker networks
   - Forward Port: 80 (the container's exposed port)
   - Enable SSL if needed

3. Make sure your reCAPTCHA domain configuration includes the domain you're using

## Configuration

### reCAPTCHA v3 Setup

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin) and register a new site
2. Choose reCAPTCHA v3
3. Add your domain(s) to the list
4. Get your Site Key and Secret Key
5. Add the Site Key to your `.env` file:
   ```
   VITE_RECAPTCHA_SITE_KEY=your_site_key_here
   ```

### Webhook Configuration

The form submits data to an n8n webhook. Configure the webhook details in your `.env` file:

```
VITE_WEBHOOK_URL=your_webhook_url
VITE_WEBHOOK_USERNAME=your_username
VITE_WEBHOOK_PASSWORD=your_password
```

## File Structure

```
src/
├── components/    # UI components
├── constants/     # Form options and constants
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
├── services/      # API and service functions
├── types/         # TypeScript type definitions
└── App.tsx        # App component with routes
```

## Tech Stack

- React
- TypeScript
- React Hook Form for form validation
- React Router for navigation
- Tailwind CSS for styling
- reCAPTCHA v3 for bot prevention
- Docker for containerization

## Form Fields

All fields are required and include validation:
- First Name (≥ 2 letters, alpha)
- Last Name (≥ 2 letters, alpha)
- Email (RFC-5322 valid, lowercase)
- Referral Source (select dropdown)
- Technical Experience Level (radio buttons)
- Weekly Learning Time (select dropdown)
- Hidden Timestamp (auto-filled on submit)

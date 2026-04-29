# DataViz - Analytics SaaS Platform

A modern analytics and reporting platform built with Next.js 16, Supabase, and Stripe.

## Features

### Core Analytics
- **Data Import**: Upload CSV and JSON files with automatic parsing
- **Visualization**: Interactive charts (Line, Area, Bar, Pie) with Recharts
- **Dashboards**: Create custom dashboards to monitor metrics
- **Real-time Updates**: Live data sync with Supabase Realtime

### Reporting & Alerts
- **Report Generation**: Create PDF and CSV reports with custom filters
- **Alert System**: Set threshold-based alerts with email notifications
- **Report Management**: Download and manage generated reports
- **Alert History**: Track when alerts are triggered

### Team Collaboration
- **Team Management**: Invite team members and manage permissions
- **Role-based Access**: Control who can view and edit datasets
- **Audit Logs**: Track all changes to dashboards and alerts

### Billing
- **Stripe Integration**: Secure payment processing
- **Tiered Pricing**: Free, Pro ($29), and Team ($79/user) plans
- **Subscription Management**: Easy upgrade/downgrade options
- **Invoice History**: View and download invoices

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Backend**: Supabase PostgreSQL, Edge Functions
- **Authentication**: Supabase Auth (Email/Password)
- **Payments**: Stripe
- **Charts**: Recharts
- **Storage**: Supabase Storage (for data files)

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (package manager)
- Supabase project
- Stripe account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ockie17/ev-sdm1.git
cd ev-sdm1
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Fill in your environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your service role key
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret

4. **Set up the database**
```bash
# Run the schema migration
psql -U postgres -d your_db < scripts/01-create-schema.sql

# Run the RLS policies migration
psql -U postgres -d your_db < scripts/02-create-rls-policies.sql
```

5. **Start the development server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── auth/                    # Authentication pages
│   ├── login/page.tsx
│   ├── sign-up/page.tsx
│   ├── error/page.tsx
│   └── callback/route.ts
├── dashboard/page.tsx       # Main dashboard
├── datasets/page.tsx        # Data management
├── dashboards/page.tsx      # Dashboard creation
├── reports/page.tsx         # Report generation
├── alerts/page.tsx          # Alert management
├── settings/
│   ├── page.tsx            # General settings
│   └── billing/page.tsx    # Billing management
├── api/
│   ├── webhooks/stripe/route.ts  # Stripe webhooks
│   └── checkout/route.ts         # Checkout sessions
├── layout.tsx              # Root layout
├── page.tsx               # Landing page
└── globals.css            # Global styles

components/
├── app-header.tsx         # Navigation header
├── file-upload-area.tsx   # File upload component
├── charts.tsx             # Chart components
└── alert-manager.tsx      # Alert management UI

lib/
├── supabase/
│   ├── client.ts          # Client-side Supabase
│   ├── server.ts          # Server-side Supabase
│   └── proxy.ts           # Auth proxy
└── stripe.ts              # Stripe utilities

scripts/
├── 01-create-schema.sql   # Database schema
└── 02-create-rls-policies.sql  # RLS policies
```

## Database Schema

### Core Tables
- `teams` - Team organizations
- `team_members` - Team membership with roles
- `datasets` - Uploaded data files
- `data_points` - Raw data from datasets
- `dashboards` - Dashboard configurations
- `dashboard_widgets` - Charts on dashboards
- `reports` - Generated reports
- `alerts` - Alert configurations
- `alert_triggers` - Alert history

All tables are protected with Row Level Security (RLS) policies.

## API Endpoints

### Webhooks
- `POST /api/webhooks/stripe` - Stripe subscription webhooks

### Checkout
- `POST /api/checkout` - Create Stripe checkout session

## Deployment

### Deploy to Vercel

The project is configured for Vercel deployment with:
- Automatic git deployments
- Environment variables from Vercel dashboard
- Serverless functions support

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel project settings
3. Push to main branch to deploy

### Post-Deployment Setup

1. Update Supabase auth redirect URL:
   - Go to Supabase dashboard → Authentication → URL Configuration
   - Add your Vercel domain to allowed redirect URLs

2. Update Stripe webhook endpoint:
   - Go to Stripe dashboard → Webhooks
   - Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
   - Subscribe to: `customer.subscription.updated`, `customer.subscription.deleted`

3. Configure Supabase storage bucket:
   - Create public bucket named "datasets"
   - Enable RLS policies

## Usage

### For Users
1. Sign up with email and password
2. Upload your first dataset (CSV or JSON)
3. Create a dashboard and add charts
4. Set up alerts for important metrics
5. Generate reports for stakeholders
6. Choose a subscription plan for advanced features

### For Admins
1. Manage team members and roles
2. View audit logs
3. Configure billing and invoicing
4. Monitor system usage

## Security Features

- **Row Level Security**: All data protected with RLS policies
- **Email Verification**: Users must verify email before full access
- **Secure Auth Tokens**: HTTP-only cookies, refresh token rotation
- **CSRF Protection**: Middleware prevents CSRF attacks
- **SQL Injection Prevention**: Parameterized queries throughout
- **Rate Limiting**: Coming soon

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Code review and merge

## Support

For support, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with details
4. Contact support@dataviz.local

## License

MIT License - See LICENSE file for details

## Roadmap

- [ ] Advanced filtering and search
- [ ] Custom chart types
- [ ] Data connectors (Google Sheets, Salesforce, etc.)
- [ ] API access for external integrations
- [ ] White-label options
- [ ] Advanced user management
- [ ] Single sign-on (SSO)
- [ ] Data export and backup

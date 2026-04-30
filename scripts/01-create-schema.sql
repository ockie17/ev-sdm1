-- Create teams table
CREATE TABLE IF NOT EXISTS public.teams (
  team_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL,
  subscription_status TEXT DEFAULT 'free',
  stripe_customer_id TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
  member_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(team_id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'analyst',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(team_id, user_id)
);

-- Create datasets table
CREATE TABLE IF NOT EXISTS public.datasets (
  dataset_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(team_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  file_path TEXT,
  data_type TEXT,
  row_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL
);

-- Create data_points table
CREATE TABLE IF NOT EXISTS public.data_points (
  point_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dataset_id UUID NOT NULL REFERENCES public.datasets(dataset_id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  value NUMERIC,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  tags JSONB DEFAULT '{}'::jsonb
);

-- Create dashboards table
CREATE TABLE IF NOT EXISTS public.dashboards (
  dashboard_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(team_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_by UUID NOT NULL,
  config JSONB DEFAULT '{}'::jsonb,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create reports table
CREATE TABLE IF NOT EXISTS public.reports (
  report_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_id UUID NOT NULL REFERENCES public.dashboards(dashboard_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  generated_by UUID NOT NULL,
  filters JSONB DEFAULT '{}'::jsonb,
  content JSONB,
  file_path TEXT
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS public.alerts (
  alert_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(team_id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  threshold NUMERIC NOT NULL,
  condition TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  notification_emails TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create alert_triggers table
CREATE TABLE IF NOT EXISTS public.alert_triggers (
  trigger_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_id UUID NOT NULL REFERENCES public.alerts(alert_id) ON DELETE CASCADE,
  triggered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  value NUMERIC,
  notified_to TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_teams_created_by ON public.teams(created_by);
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON public.team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON public.team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_datasets_team_id ON public.datasets(team_id);
CREATE INDEX IF NOT EXISTS idx_data_points_dataset_id ON public.data_points(dataset_id);
CREATE INDEX IF NOT EXISTS idx_data_points_timestamp ON public.data_points(timestamp);
CREATE INDEX IF NOT EXISTS idx_dashboards_team_id ON public.dashboards(team_id);
CREATE INDEX IF NOT EXISTS idx_reports_dashboard_id ON public.reports(dashboard_id);
CREATE INDEX IF NOT EXISTS idx_alerts_team_id ON public.alerts(team_id);
CREATE INDEX IF NOT EXISTS idx_alert_triggers_alert_id ON public.alert_triggers(alert_id);

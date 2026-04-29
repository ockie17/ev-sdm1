-- Enable RLS on all tables
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE alert_triggers ENABLE ROW LEVEL SECURITY;

-- Teams RLS Policies
CREATE POLICY "Users can view teams they are members of" ON teams
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = teams.team_id
      AND team_members.user_id = auth.uid()
    )
    OR created_by = auth.uid()
  );

CREATE POLICY "Users can create teams" ON teams
  FOR INSERT WITH CHECK (created_by = auth.uid());

CREATE POLICY "Team admins can update teams" ON teams
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = teams.team_id
      AND team_members.user_id = auth.uid()
      AND team_members.role = 'admin'
    )
  );

-- Team Members RLS Policies
CREATE POLICY "Users can view team members of their teams" ON team_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.team_id = team_members.team_id
      AND tm.user_id = auth.uid()
    )
  );

CREATE POLICY "Team admins can manage members" ON team_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.team_id = team_members.team_id
      AND tm.user_id = auth.uid()
      AND tm.role = 'admin'
    )
  );

-- Datasets RLS Policies
CREATE POLICY "Users can view datasets in their teams" ON datasets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = datasets.team_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create datasets in their teams" ON datasets
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = datasets.team_id
      AND team_members.user_id = auth.uid()
      AND team_members.role IN ('admin', 'analyst')
    )
  );

CREATE POLICY "Analysts can update datasets" ON datasets
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = datasets.team_id
      AND team_members.user_id = auth.uid()
      AND team_members.role IN ('admin', 'analyst')
    )
  );

-- Data Points RLS Policies
CREATE POLICY "Users can view data points in their datasets" ON data_points
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM datasets
      JOIN team_members ON datasets.team_id = team_members.team_id
      WHERE datasets.dataset_id = data_points.dataset_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Analysts can insert data points" ON data_points
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM datasets
      JOIN team_members ON datasets.team_id = team_members.team_id
      WHERE datasets.dataset_id = data_points.dataset_id
      AND team_members.user_id = auth.uid()
      AND team_members.role IN ('admin', 'analyst')
    )
  );

-- Dashboards RLS Policies
CREATE POLICY "Users can view dashboards in their teams" ON dashboards
  FOR SELECT USING (
    is_public = TRUE OR
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = dashboards.team_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create dashboards in their teams" ON dashboards
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = dashboards.team_id
      AND team_members.user_id = auth.uid()
      AND team_members.role IN ('admin', 'analyst')
    )
  );

CREATE POLICY "Analysts can update dashboards" ON dashboards
  FOR UPDATE USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = dashboards.team_id
      AND team_members.user_id = auth.uid()
      AND team_members.role = 'admin'
    )
  );

-- Reports RLS Policies
CREATE POLICY "Users can view reports in their dashboards" ON reports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM dashboards
      JOIN team_members ON dashboards.team_id = team_members.team_id
      WHERE dashboards.dashboard_id = reports.dashboard_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Analysts can create reports" ON reports
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM dashboards
      JOIN team_members ON dashboards.team_id = team_members.team_id
      WHERE dashboards.dashboard_id = reports.dashboard_id
      AND team_members.user_id = auth.uid()
      AND team_members.role IN ('admin', 'analyst')
    )
  );

-- Alerts RLS Policies
CREATE POLICY "Users can view alerts in their teams" ON alerts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = alerts.team_id
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Analysts can manage alerts" ON alerts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = alerts.team_id
      AND team_members.user_id = auth.uid()
      AND team_members.role IN ('admin', 'analyst')
    )
  );

-- Alert Triggers RLS Policies
CREATE POLICY "Users can view alert triggers" ON alert_triggers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM alerts
      JOIN team_members ON alerts.team_id = team_members.team_id
      WHERE alerts.alert_id = alert_triggers.alert_id
      AND team_members.user_id = auth.uid()
    )
  );

-- Newsletter Subscribers Migration
-- Adds newsletter subscription functionality to the GhondiClaude.me platform

-- Newsletter subscribers table
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  subscription_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  subscription_source VARCHAR(50), -- 'footer', 'blog', 'shop', 'contact'
  verification_token VARCHAR(255),
  verified_at TIMESTAMP WITH TIME ZONE,
  unsubscribe_token VARCHAR(255) UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_active ON newsletter_subscribers(is_active);
CREATE INDEX idx_newsletter_subscribers_source ON newsletter_subscribers(subscription_source);
CREATE INDEX idx_newsletter_subscribers_verification ON newsletter_subscribers(verification_token);
CREATE INDEX idx_newsletter_subscribers_unsubscribe ON newsletter_subscribers(unsubscribe_token);

-- Newsletter campaigns table (for future newsletter sending)
CREATE TABLE newsletter_campaigns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  html_content TEXT,
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'scheduled', 'sending', 'sent', 'cancelled'
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  recipient_count INTEGER DEFAULT 0,
  delivered_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter campaign sends (tracking individual sends)
CREATE TABLE newsletter_campaign_sends (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  campaign_id UUID REFERENCES newsletter_campaigns(id) ON DELETE CASCADE,
  subscriber_id UUID REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivered_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  bounced_at TIMESTAMP WITH TIME ZONE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT
);

-- Indexes for campaign tracking
CREATE INDEX idx_campaign_sends_campaign ON newsletter_campaign_sends(campaign_id);
CREATE INDEX idx_campaign_sends_subscriber ON newsletter_campaign_sends(subscriber_id);
CREATE INDEX idx_campaign_sends_sent ON newsletter_campaign_sends(sent_at);

-- Update trigger for newsletter_subscribers
CREATE OR REPLACE FUNCTION update_newsletter_subscribers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_newsletter_subscribers_updated_at
  BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_newsletter_subscribers_updated_at();

-- Update trigger for newsletter_campaigns
CREATE OR REPLACE FUNCTION update_newsletter_campaigns_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_newsletter_campaigns_updated_at
  BEFORE UPDATE ON newsletter_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_newsletter_campaigns_updated_at();

-- RLS (Row Level Security) policies
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_campaign_sends ENABLE ROW LEVEL SECURITY;

-- Newsletter subscribers policies
CREATE POLICY "Newsletter subscribers are viewable by authenticated users" ON newsletter_subscribers
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Newsletter subscribers can be inserted by anyone" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Newsletter subscribers can be updated by authenticated users" ON newsletter_subscribers
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Newsletter campaigns policies (admin only)
CREATE POLICY "Newsletter campaigns are viewable by authenticated users" ON newsletter_campaigns
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Newsletter campaigns can be managed by authenticated users" ON newsletter_campaigns
  FOR ALL USING (auth.role() = 'authenticated');

-- Campaign sends policies
CREATE POLICY "Campaign sends are viewable by authenticated users" ON newsletter_campaign_sends
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Campaign sends can be managed by authenticated users" ON newsletter_campaign_sends
  FOR ALL USING (auth.role() = 'authenticated');

-- Comments
COMMENT ON TABLE newsletter_subscribers IS 'Stores newsletter subscription information';
COMMENT ON TABLE newsletter_campaigns IS 'Stores newsletter campaign information for sending bulk emails';
COMMENT ON TABLE newsletter_campaign_sends IS 'Tracks individual newsletter sends and engagement metrics';

COMMENT ON COLUMN newsletter_subscribers.subscription_source IS 'Where the user subscribed from (footer, blog, shop, contact)';
COMMENT ON COLUMN newsletter_subscribers.verification_token IS 'Token for email verification';
COMMENT ON COLUMN newsletter_subscribers.unsubscribe_token IS 'Unique token for one-click unsubscribe';
COMMENT ON COLUMN newsletter_campaigns.status IS 'Campaign status: draft, scheduled, sending, sent, cancelled';

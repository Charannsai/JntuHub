/*
  # JNTUH Knowledge Base Schema

  1. New Tables
    - `jntuh_data`
      - `id` (uuid, primary key)
      - `source` (text): Source URL of the data
      - `content` (text): Scraped content
      - `category` (text): Type of content (e.g., 'academic', 'news', 'general')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `chat_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid): Reference to auth.users
      - `message` (text): User's message
      - `response` (text): AI response
      - `created_at` (timestamp)
      - `feedback` (boolean, nullable): User feedback on response quality

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create jntuh_data table
CREATE TABLE IF NOT EXISTS jntuh_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chat_history table
CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  message text NOT NULL,
  response text NOT NULL,
  created_at timestamptz DEFAULT now(),
  feedback boolean,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE jntuh_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Policies for jntuh_data
CREATE POLICY "Allow read access to all authenticated users"
  ON jntuh_data
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for chat_history
CREATE POLICY "Users can view their own chat history"
  ON chat_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat messages"
  ON chat_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chat feedback"
  ON chat_history
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
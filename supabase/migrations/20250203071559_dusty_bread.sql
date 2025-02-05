/*
  # Subject Notes Management Schema

  1. New Tables
    - `regulations`: Stores different JNTUH regulations (R16, R18, R22)
    - `branches`: Stores different engineering branches
    - `subjects`: Stores subject information
    - `subject_resources`: Stores links to notes and materials
    - `years`: Academic years (1st Year, 2nd Year, etc.)
    - `semesters`: Semesters (1st Sem, 2nd Sem)

  2. Relationships
    - Each subject belongs to a regulation, branch, year, and semester
    - Each subject can have multiple resources

  3. Security
    - Enable RLS on all tables
    - Public read access for authenticated users
    - Write access restricted to admin users
*/

-- Create regulations table
CREATE TABLE IF NOT EXISTS regulations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create branches table
CREATE TABLE IF NOT EXISTS branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create years table
CREATE TABLE IF NOT EXISTS years (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  display_order int NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create semesters table
CREATE TABLE IF NOT EXISTS semesters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  display_order int NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
  name text NOT NULL,
  regulation_id uuid REFERENCES regulations(id),
  branch_id uuid REFERENCES branches(id),
  year_id uuid REFERENCES years(id),
  semester_id uuid REFERENCES semesters(id),
  description text,
  credits int,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(code, regulation_id)
);

-- Create subject_resources table
CREATE TABLE IF NOT EXISTS subject_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES subjects(id),
  title text NOT NULL,
  resource_type text NOT NULL, -- 'notes', 'syllabus', 'question_papers', etc.
  drive_link text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE regulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE years ENABLE ROW LEVEL SECURITY;
ALTER TABLE semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject_resources ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for regulations"
  ON regulations FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public read access for branches"
  ON branches FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public read access for years"
  ON years FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public read access for semesters"
  ON semesters FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public read access for subjects"
  ON subjects FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public read access for subject_resources"
  ON subject_resources FOR SELECT TO authenticated USING (true);

-- Insert initial data
INSERT INTO regulations (code, name) VALUES
  ('R22', 'R22 Regulation'),
  ('R18', 'R18 Regulation'),
  ('R16', 'R16 Regulation')
ON CONFLICT DO NOTHING;

INSERT INTO branches (code, name) VALUES
  ('CSE', 'Computer Science and Engineering'),
  ('ECE', 'Electronics and Communication Engineering'),
  ('EEE', 'Electrical and Electronics Engineering'),
  ('ME', 'Mechanical Engineering'),
  ('CE', 'Civil Engineering'),
  ('CSBS', 'Computer Science and Business Systems'),
  ('AIML', 'Artificial Intelligence and Machine Learning'),
  ('DS', 'Data Science')
ON CONFLICT DO NOTHING;

INSERT INTO years (name, display_order) VALUES
  ('1st Year', 1),
  ('2nd Year', 2),
  ('3rd Year', 3),
  ('4th Year', 4)
ON CONFLICT DO NOTHING;

INSERT INTO semesters (name, display_order) VALUES
  ('1st Semester', 1),
  ('2nd Semester', 2)
ON CONFLICT DO NOTHING;

-- Create search index for subjects
CREATE INDEX IF NOT EXISTS subjects_search_idx ON subjects 
  USING GIN (to_tsvector('english', name || ' ' || code || ' ' || COALESCE(description, '')));

-- Create function to search subjects
CREATE OR REPLACE FUNCTION search_subjects(search_query text)
RETURNS TABLE (
  id uuid,
  code text,
  name text,
  regulation_code text,
  branch_code text,
  year_name text,
  semester_name text,
  resources json
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.code,
    s.name,
    r.code as regulation_code,
    b.code as branch_code,
    y.name as year_name,
    sem.name as semester_name,
    COALESCE(
      json_agg(
        json_build_object(
          'id', sr.id,
          'title', sr.title,
          'type', sr.resource_type,
          'link', sr.drive_link
        )
      ) FILTER (WHERE sr.id IS NOT NULL),
      '[]'::json
    ) as resources
  FROM subjects s
  JOIN regulations r ON s.regulation_id = r.id
  JOIN branches b ON s.branch_id = b.id
  JOIN years y ON s.year_id = y.id
  JOIN semesters sem ON s.semester_id = sem.id
  LEFT JOIN subject_resources sr ON s.id = sr.subject_id
  WHERE 
    to_tsvector('english', s.name || ' ' || s.code || ' ' || COALESCE(s.description, '')) @@ 
    plainto_tsquery('english', search_query)
  GROUP BY s.id, s.code, s.name, r.code, b.code, y.name, sem.name;
END;
$$ LANGUAGE plpgsql;
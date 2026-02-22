# 🚀 Supabase Setup Guide for BD News Archive

## Your Supabase Credentials
```
Project URL: https://qcwqoaancvymvuutifyq.supabase.co
Project ID: qcwqoaancvymvuutifyq
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjd3FvYWFuY3Z5bXZ1dXRpZnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MTIxOTcsImV4cCI6MjA4NzA4ODE5N30.4P95Jf78P1s1y35T9ErP7l0r9R2TL1s-BKV4h5gdia0
```

---

## 📋 Step 1: Create Database Tables

Go to your Supabase Dashboard → SQL Editor and run this SQL:

```sql
-- ============================================
-- TABLE: news (Main news articles table)
-- ============================================
CREATE TABLE IF NOT EXISTS news (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  district TEXT NOT NULL,
  newspaper TEXT NOT NULL,
  date DATE NOT NULL,
  summary TEXT NOT NULL,
  original_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: submissions (User submitted news)
-- ============================================
CREATE TABLE IF NOT EXISTS submissions (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  district TEXT NOT NULL,
  newspaper TEXT,
  date DATE,
  description TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_phone TEXT,
  contact_email TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: categories (Crime categories)
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT,
  color TEXT,
  count INTEGER DEFAULT 0
);

-- ============================================
-- Insert Sample Categories
-- ============================================
INSERT INTO categories (name, icon, color, count) VALUES
('খুন', '🔪', 'red', 231),
('ধর্ষণ', '🔥', 'orange', 64),
('চাঁদাবাজি', '💰', 'green', 120),
('হামলা / সংঘর্ষ', '👊', 'red', 89),
('লুটপাট', '🧳', 'amber', 45),
('দখল', '🏚️', 'purple', 67),
('ইসলামবিদ্বেষ', '☪️', 'emerald', 23),
('মাদক', '💊', 'yellow', 156),
('অস্ত্র', '🔫', 'slate', 34),
('চুরি / ডাকাতি', '🦹', 'zinc', 78),
('শিক্ষাঙ্গনে সন্ত্রাস', '🏫', 'blue', 12),
('লীগ পুনর্বাসন', '🏛️', 'sky', 89),
('মামলা বাণিজ্য', '⚖️', 'indigo', 34),
('টেন্ডারবাজি', '📋', 'violet', 28),
('নারী নির্যাতন', '👩', 'rose', 145),
('দুর্নীতি', '💼', 'gray', 178),
('গুজব ও মিথ্যাচার', '📢', 'slate', 56),
('হুমকি', '☠️', 'stone', 34),
('গণতন্ত্রে বাধা', '🗳️', 'neutral', 23),
('বিবিধ', '📌', 'slate', 234);

-- ============================================
-- Insert Sample News
-- ============================================
INSERT INTO news (title, category, district, newspaper, date, summary, original_url) VALUES
('ঢাকায় চাঞ্চল্যকর খুনের ঘটনা', 'খুন', 'ঢাকা', 'প্রথম আলো', '2025-01-17', 'ঢাকার একটি এলাকায় সন্ধ্যায় দুর্বৃত্তদের ছুরিকাঘাতে এক ব্যক্তি নিহত হয়েছেন।', 'https://prothomalo.com'),
('নারী নির্যাতনের অভিযোগে গ্রেফতার', 'নারী নির্যাতন', 'চট্টগ্রাম', 'কালের কণ্ঠ', '2025-01-17', 'চট্টগ্রামে এক নারী তার স্বামীর বিরুদ্ধে নির্যাতনের অভিযোগ করেছেন।', 'https://kalerkantho.com'),
('মাদক চোরাচালানে বড় ধরনের সাফল্য', 'মাদক', 'সীমান্ত', 'সমকাল', '2025-01-16', 'বিজিবি সদস্যরা সীমান্ত এলাকায় অভিযান চালিয়ে বিপুল পরিমাণ মাদক জব্দ করেছেন।', 'https://samakal.com'),
('দুর্নীতি মামলায় গ্রেফতার', 'দুর্নীতি', 'রাজশাহী', 'যুগান্তর', '2025-01-16', 'রাজশাহীতে দুর্নীতি দমন কমিশনের মামলায় এক সরকারি কর্মকর্তাকে গ্রেফতার করা হয়েছে।', 'https://jugantar.com'),
('শিক্ষাঙ্গনে সন্ত্রাস বন্ধে জরুরি পদক্ষেপ', 'শিক্ষাঙ্গনে সন্ত্রাস', 'ঢাকা', 'ইনকিলাব', '2025-01-15', 'রাজধানীর একটি কলেজে ছাত্রদের মধ্যে সংঘর্ষের ঘটনা ঘটেছে।', 'https://inqilab.com'),
('চাঁদাবাজির অভিযোগে গ্রেফতার ৫', 'চাঁদাবাজি', 'নারায়ণগঞ্জ', 'প্রথম আলো', '2025-01-15', 'নারায়ণগঞ্জে একটি বাজারের দোকান মালিকদের কাছ থেকে চাঁদা আদায়ের অভিযোগে পাঁচজনকে গ্রেফতার করেছে পুলিশ।', 'https://prothomalo.com'),
('হামলার শিকার সাংবাদিক', 'হামলা / সংঘর্ষ', 'খুলনা', 'ডেইলি স্টার', '2025-01-14', 'খুলনায় এক সাংবাদিককে পেট্রোল বোমা হামলায় আহত করেছে দুর্বৃত্তরা।', 'https://thedailystar.net'),
('জমি দখলের অভিযোগ', 'দখল', 'মুন্সিগঞ্জ', 'মানবজমিন', '2025-01-14', 'মুন্সিগঞ্জে একটি পরিবারের জমি জোরপূর্বক দখল করে নেওয়ার অভিযোগ উঠেছে।', 'https://manabzamin.com');
```

---

## 📋 Step 2: Enable API Access

1. Go to **Settings** → **API**
2. Copy your project URL and anon key
3. They are already configured in `src/lib/supabase.ts`

---

## 📋 Step 3: Set Row Level Security (RLS)

Run this SQL to allow public read access:

```sql
-- Enable RLS on tables
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to news" ON news
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to categories" ON categories
  FOR SELECT USING (true);

-- Allow public insert for submissions
CREATE POLICY "Allow public insert for submissions" ON submissions
  FOR INSERT WITH CHECK (true);
```

---

## 📋 Step 4: Test Your Setup

1. Go to **Table Editor** → **news**
2. Click **Insert Row** to add sample news
3. Check **Supabase API** → **REST API** to see your data

---

## 📊 How to Add News Daily

### Option 1: Using Supabase Dashboard (Easiest)
1. Login to Supabase
2. Go to **Table Editor** → **news**
3. Click **Insert Row**
4. Fill in the form:
   - `title`: News title in Bengali
   - `category`: Crime category
   - `district`: District name
   - `newspaper`: Source newspaper
   - `date`: Date of incident
   - `summary`: Brief description
   - `original_url`: Link to original article
5. Click **Save**

### Option 2: Using the Website Form
1. Go to your website
2. Click **তথ্য দিন** (Submit Information)
3. Fill out the form
4. Submit - data goes to Supabase automatically!

### Option 3: Bulk Import via SQL
```sql
INSERT INTO news (title, category, district, newspaper, date, summary, original_url) VALUES
('Your news title', 'খুন', 'ঢাকা', 'প্রথম আলো', '2025-01-18', 'News summary...', 'https://original-link.com');
```

---

## 🔧 Configuration File

Your Supabase config is already set up in:

**File**: `src/lib/supabase.ts`
```typescript
const supabaseUrl = 'https://qcwqoaancvymvuutifyq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

---

## 🎯 What's Connected

| Feature | Status | Backend |
|---------|--------|---------|
| News Display | ✅ Connected | Supabase |
| Statistics | ✅ Static | Local |
| Submit Form | ✅ Connected | Supabase + LocalStorage fallback |
| Categories | ✅ Static | Local |
| Search/Filter | ✅ Dynamic | JavaScript |

---

## 📱 View Submitted Data

1. Go to Supabase Dashboard
2. **Table Editor** → **submissions**
3. View all user submissions
4. Change status to 'approved' to publish

---

## 🚀 Deploy Your Website

```bash
# Build the project
npm run build

# Deploy dist/ folder to:
# - Vercel (recommended)
# - Netlify
# - GitHub Pages
```

---

## ✅ Quick Checklist

- [ ] Created `news` table
- [ ] Created `submissions` table  
- [ ] Created `categories` table
- [ ] Inserted sample categories
- [ ] Inserted sample news
- [ ] Enabled RLS policies
- [ ] Tested API access
- [ ] Deployed website

---

## 📞 Support

- **Supabase Docs**: https://supabase.com/docs
- **Dashboard**: https://qcwqoaancvymvuutifyq.supabase.co

Your Bengali News Archive is now connected to Supabase! 🎉

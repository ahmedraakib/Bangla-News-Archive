# 🔄 Supabase Real-time Setup Guide

## What's New?

Your website now supports **real-time updates** from Supabase! When you:
- ✅ Add new news in Supabase Dashboard
- ✅ Update statistics counts
- ✅ Delete old news

**The website updates automatically without refreshing!** 🚀

---

## 📋 Enable Realtime in Supabase

### Step 1: Go to Supabase Dashboard
```
https://qcwqoaancvymvuutifyq.supabase.co
```

### Step 2: Enable Realtime for Tables

1. Click **Database** in left sidebar
2. Click **Replication** tab
3. Enable realtime for these tables:
   - ✅ `news`
   - ✅ `statistics`
   - ✅ `submissions`

**OR run this SQL:**

```sql
-- Enable realtime for news table
ALTER PUBLICATION supabase_realtime ADD TABLE news;

-- Enable realtime for statistics table
ALTER PUBLICATION supabase_realtime ADD TABLE statistics;

-- Enable realtime for submissions table
ALTER PUBLICATION supabase_realtime ADD TABLE submissions;
```

### Step 3: Run in SQL Editor

Copy and run this SQL:

```sql
-- ============================================
-- SUPABASE REALTIME SETUP
-- ============================================

-- 1. Enable realtime for news table
ALTER PUBLICATION supabase_realtime ADD TABLE news;

-- 2. Enable realtime for statistics table
ALTER PUBLICATION supabase_realtime ADD TABLE statistics;

-- 3. Enable realtime for submissions table
ALTER PUBLICATION supabase_realtime ADD TABLE submissions;

-- 4. Verify realtime is enabled
SELECT 
    schemaname,
    tablename,
    replident
FROM pg_tables
WHERE tablename IN ('news', 'statistics', 'submissions');
```

---

## 🎯 How Real-time Works

```
┌─────────────────┐                    ┌─────────────────┐
│   SUPABASE      │    🔄 Real-time   │   YOUR WEBSITE  │
│   DASHBOARD     │ ────────────────► │   (Auto Update) │
│                 │    Changes sync   │                 │
│  📰 Add News    │    instantly      │  📱 Live View   │
│  📊 Update      │                   │                 │
│  ❌ Delete      │                   │                 │
└─────────────────┘                   └─────────────────┘
```

---

## 📝 Daily Workflow

### **To Add New News:**

1. **Go to Supabase Dashboard**
   ```
   https://qcwqoaancvymvuutifyq.supabase.co
   ```

2. **Click "Table Editor"** (left sidebar)

3. **Click "news" table**

4. **Click "Insert Row"**

5. **Fill in the form:**
   ```
   title:         "ঢাকায় নতুন খুনের ঘটনা"
   category:      "খুন"
   district:      "ঢাকা"
   newspaper:     "প্রথম আলো"
   date:          "2025-01-20"
   summary:       "ঘটনার বিবরণ..."
   original_url:  "https://prothomalo.com/article-123"
   ```

6. **Click "Save"**

7. **Open your website** - News appears instantly! ✅

---

### **To Update Statistics:**

1. **Go to Supabase Dashboard**
2. **Click "Table Editor"**
3. **Click "statistics" table**
4. **Edit any row** (change count number)
5. **Click "Save"**
6. **Website graph updates instantly!** ✅

---

## 🔧 Troubleshooting

### **Problem: Real-time not working**

**Solution 1:** Enable realtime in Supabase
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE news;
```

**Solution 2:** Refresh the website (F5)

**Solution 3:** Check browser console for errors

---

### **Problem: Website shows "Offline"**

**Cause:** Not connected to Supabase

**Solution:**
1. Check if Supabase URL is correct in `src/lib/supabase.ts`
2. Check if tables exist
3. Refresh page

---

### **Problem: Changes don't appear**

**Solution:**
1. Hard refresh: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Check if realtime is enabled

---

## 📊 Connection Status

Your website now shows connection status:

| Icon | Meaning |
|------|---------|
| 🟢 **Live** | Connected to Supabase, real-time enabled |
| 🔴 **Offline** | Using local fallback data |

---

## 🚀 Deploy Changes

After updating code:

```bash
# 1. Build the project
npm run build

# 2. Deploy to Vercel/Netlify
# Just push to GitHub and it auto-deploys!
```

---

## ✅ Checklist

- [ ] Realtime enabled for `news` table
- [ ] Realtime enabled for `statistics` table
- [ ] Realtime enabled for `submissions` table
- [ ] Website shows "Live" status
- [ ] Adding news updates website instantly
- [ ] Updating statistics updates graph instantly

---

## 📞 Support

If real-time doesn't work:

1. **Check Supabase Dashboard** → Replication tab
2. **Run SQL** to enable realtime
3. **Refresh website**
4. **Contact if still not working**

---

## 🎉 You're Done!

Your Bengali News Archive now supports **real-time updates**!

- Add news in Supabase → Website updates instantly
- Update statistics → Graph updates instantly
- Delete news → Removed from website instantly

No refresh needed! 🚀

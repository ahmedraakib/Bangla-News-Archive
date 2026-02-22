// TypeScript type definitions for news-data.js

export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  district: string;
  newspaper: string;
  date: string;
  summary: string;
  originalUrl: string;
}

export interface Newspaper {
  name: string;
  url: string;
}

export interface MonthlyCrime {
  name: string;
  murder: number;
  rape: number;
  extortion: number;
}

export interface CrimeByCategory {
  name: string;
  value: number;
}

export interface DistrictStat {
  name: string;
  crimes: number;
}

export interface StatisticsData {
  monthlyCrimes: MonthlyCrime[];
  crimesByCategory: CrimeByCategory[];
  districtStats: DistrictStat[];
}

export const CATEGORIES: Category[] = [
  { id: 1, name: "খুন", icon: "🔪", color: "red", count: 231 },
  { id: 2, name: "ধর্ষণ", icon: "🔥", color: "orange", count: 64 },
  { id: 3, name: "চাঁদাবাজি", icon: "💰", color: "green", count: 120 },
  { id: 4, name: "হামলা / সংঘর্ষ", icon: "👊", color: "purple", count: 89 },
  { id: 5, name: "লুটপাট", icon: "🧳", color: "blue", count: 45 },
  { id: 6, name: "দখল", icon: "🏚️", color: "brown", count: 67 },
  { id: 7, name: "ইসলামবিদ্বেষ", icon: "☪️", color: "teal", count: 23 },
  { id: 8, name: "মাদক", icon: "💊", color: "pink", count: 156 },
  { id: 9, name: "অস্ত্র", icon: "🔫", color: "gray", count: 34 },
  { id: 10, name: "চুরি / ডাকাতি", icon: "🦹", color: "slate", count: 78 },
  { id: 11, name: "শিক্ষাঙ্গনে সন্ত্রাস", icon: "🏫", color: "indigo", count: 12 },
  { id: 12, name: "লীগ পুনর্বাসন", icon: "🏛️", color: "cyan", count: 34 },
  { id: 13, name: "মামলা বাণিজ্য", icon: "⚖️", color: "amber", count: 56 },
  { id: 14, name: "টেন্ডারবাজি", icon: "📋", color: "lime", count: 28 },
  { id: 15, name: "নারী নির্যাতন", icon: "👩", color: "rose", count: 89 },
  { id: 16, name: "দুর্নীতি", icon: "💸", color: "emerald", count: 45 },
  { id: 17, name: "গুজব ও মিথ্যাচার", icon: "📢", color: "violet", count: 67 },
  { id: 18, name: "হুমকি", icon: "☠️", color: "zinc", count: 34 },
  { id: 19, name: "গণতন্ত্রে বাধা", icon: "🗳️", color: "stone", count: 23 },
  { id: 20, name: "বিবিধ", icon: "📌", color: "neutral", count: 156 },
];

export const DISTRICTS: string[] = [
  "ঢাকা", "চট্টগ্রাম", "কিশোরগঞ্জ", "টাঙ্গাইল", "মানিকগঞ্জ", "নারায়ণগঞ্জ", 
  "নরসিংদী", "গাজীপুর", "শরীয়তপুর", "মুন্সিগঞ্জ", "রাজবাড়ী", "মাদারীপুর",
  "খুলনা", "সাতক্ষীরা", "বাগেরহাট", "যশোর", "ঝিনাইদহ", "নড়াইল",
  "বরিশাল", "পটুয়াখালী", "ভোলা", "পিরোজপুর", "বরগুনা",
  "রাজশাহী", "নওগাঁ", "নাটোর", "জয়পুরহাট", "বগুড়া", "সিরাজগঞ্জ",
  "সিলেট", "মৌলভীবাজার", "হবিগঞ্জ", "সুনামগঞ্জ",
  "রংপুর", "দিনাজপুর", "পঞ্চগড়", "ঠাকুরগাঁও", "নীলফামারী", "কুড়িগ্রাম",
  "ময়মনসিংহ", "জামালপুর", "শেরপুর", "নেত্রকোণা",
  "লক্ষ্মীপুর", "ফেনী", "কুমিল্লা", "ব্রাহ্মণবাড়িয়া",
  "চাঁদপুর", 
  "বান্দরবান", "রাঙ্গামাটি", "খাগড়াছড়ি",
  "Gazipur", "Dhaka Metro"
];

export const NEWSPAPERS: Newspaper[] = [
  { name: "প্রথম আলো", url: "https://www.prothomalo.com" },
  { name: "কালের কণ্ঠ", url: "https://www.kalerkantho.com" },
  { name: "সমকাল", url: "https://www.samakal.com" },
  { name: "যুগান্তর", url: "https://www.jugantor.com" },
  { name: "ইনকিলাব", url: "https://www.dailyinqilab.com" },
  { name: "নয়া দিগন্ত", url: "https://www.dailynayadiganta.com" },
  { name: "ডেইলি স্টার", url: "https://www.thedailystar.net" },
  { name: "মানবজমিন", url: "https://www.manabzamin.com" },
  { name: "বণিক বার্তা", url: "https://www.bonikbarta.com" },
  { name: "ঢাকা ট্রিবিউন", url: "https://www.dhakatribune.com" },
  { name: "বাংলাদেশ প্রতিদিন", url: "https://www.bd-pratidin.com" },
  { name: "সংবাদ", url: "https://www.sangbad.net.bd" },
];

export const SAMPLE_NEWS: NewsItem[] = [];

// Month names in Bangla
const BANGLA_MONTHS = [
  "জানু", "ফেব্রু", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টে", "অক্টো", "নভে", "ডিসে"
];

// Function to parse date and extract month (YYYY-MM-DD format)
const getMonthFromDate = (dateStr: string): number => {
  try {
    const parts = dateStr.split('-');
    return parseInt(parts[1]) - 1; // Convert to 0-based index
  } catch {
    return 0;
  }
};

// Function to generate statistics dynamically from news data
export const generateStatisticsData = (newsArray: NewsItem[]): StatisticsData => {
  // Initialize monthly crimes
  const monthlyCrimes: MonthlyCrime[] = BANGLA_MONTHS.map((name, idx) => ({
    name,
    murder: 0,
    rape: 0,
    extortion: 0,
  }));

  // Count crimes by month and specific categories
  newsArray.forEach((news) => {
    const monthIdx = getMonthFromDate(news.date);
    if (monthIdx >= 0 && monthIdx < 12) {
      if (news.category === "খুন") monthlyCrimes[monthIdx].murder++;
      if (news.category === "ধর্ষণ") monthlyCrimes[monthIdx].rape++;
      if (news.category === "চাঁদাবাজি") monthlyCrimes[monthIdx].extortion++;
    }
  });

  // Count crimes by category
  const categoryMap = new Map<string, number>();
  newsArray.forEach((news) => {
    categoryMap.set(news.category, (categoryMap.get(news.category) || 0) + 1);
  });
  const crimesByCategory: CrimeByCategory[] = Array.from(categoryMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Count crimes by district (top 6)
  const districtMap = new Map<string, number>();
  newsArray.forEach((news) => {
    districtMap.set(news.district, (districtMap.get(news.district) || 0) + 1);
  });
  const districtStats: DistrictStat[] = Array.from(districtMap.entries())
    .map(([name, crimes]) => ({ name, crimes }))
    .sort((a, b) => b.crimes - a.crimes)
    .slice(0, 6);

  return {
    monthlyCrimes,
    crimesByCategory,
    districtStats,
  };
};

// Default statistics data (will be overridden by dynamic calculation)
export const STATISTICS_DATA: StatisticsData = generateStatisticsData(SAMPLE_NEWS);

// Helper functions
export const getNewsByCategory = (categoryName: string): NewsItem[] => {
  return SAMPLE_NEWS.filter(news => news.category === categoryName);
};

export const getNewsByDistrict = (district: string): NewsItem[] => {
  return SAMPLE_NEWS.filter(news => news.district === district);
};

export const searchNews = (query: string): NewsItem[] => {
  const searchTerm = query.toLowerCase();
  return SAMPLE_NEWS.filter(news => 
    news.title.toLowerCase().includes(searchTerm) ||
    news.summary.toLowerCase().includes(searchTerm) ||
    news.district.toLowerCase().includes(searchTerm) ||
    news.category.toLowerCase().includes(searchTerm)
  );
};

export const getRecentNews = (count: number = 6): NewsItem[] => {
  return SAMPLE_NEWS.slice(0, count);
};

export const getTotalCounts = () => {
  const murderCount = SAMPLE_NEWS.filter(n => n.category === "খুন").length;
  const rapeCount = SAMPLE_NEWS.filter(n => n.category === "ধর্ষণ").length;
  return {
    total: SAMPLE_NEWS.length,
    murder: murderCount + 230,
    rape: rapeCount + 60,
  };
};

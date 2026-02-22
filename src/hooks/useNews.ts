// Custom hook for fetching news from Supabase with Real-time updates
import { useState, useEffect, useCallback } from 'react';
import { supabase, TABLES } from '../lib/supabase';
import { NewsItem, Category, Submission } from '../types';

// Default categories
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: 'খুন', icon: '🔪', color: 'red', count: 231 },
  { id: 2, name: 'ধর্ষণ', icon: '🔥', color: 'orange', count: 64 },
  { id: 3, name: 'চাঁদাবাজি', icon: '💰', color: 'green', count: 120 },
  { id: 4, name: 'হামলা / সংঘর্ষ', icon: '👊', color: 'red', count: 89 },
  { id: 5, name: 'লুটপাট', icon: '🧳', color: 'amber', count: 45 },
  { id: 6, name: 'দখল', icon: '🏚️', color: 'purple', count: 67 },
  { id: 7, name: 'ইসলামবিদ্বেষ', icon: '☪️', color: 'emerald', count: 23 },
  { id: 8, name: 'মাদক', icon: '💊', color: 'yellow', count: 156 },
  { id: 9, name: 'অস্ত্র', icon: '🔫', color: 'slate', count: 34 },
  { id: 10, name: 'চুরি / ডাকাতি', icon: '🦹', color: 'zinc', count: 78 },
  { id: 11, name: 'শিক্ষাঙ্গনে সন্ত্রাস', icon: '🏫', color: 'blue', count: 12 },
  { id: 12, name: 'লীগ পুনর্বাসন', icon: '🏛️', color: 'sky', count: 89 },
  { id: 13, name: 'মামলা বাণিজ্য', icon: '⚖️', color: 'indigo', count: 34 },
  { id: 14, name: 'টেন্ডারবাজি', icon: '📋', color: 'violet', count: 28 },
  { id: 15, name: 'নারী নির্যাতন', icon: '👩', color: 'rose', count: 145 },
  { id: 16, name: 'দুর্নীতি', icon: '💼', color: 'gray', count: 178 },
  { id: 17, name: 'গুজব ও মিথ্যাচার', icon: '📢', color: 'slate', count: 56 },
  { id: 18, name: 'হুমকি', icon: '☠️', color: 'stone', count: 34 },
  { id: 19, name: 'গণতন্ত্রে বাধা', icon: '🗳️', color: 'neutral', count: 23 },
  { id: 20, name: 'বিবিধ', icon: '📌', color: 'slate', count: 234 },
];

// Fallback news data (when Supabase is not available)
export const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "ঢাকায় চাঞ্চল্যকর খুনের ঘটনা",
    category: "খুন",
    district: "ঢাকা",
    newspaper: "প্রথম আলো",
    date: "২০২৫-০১-১৭",
    summary: "ঢাকার একটি এলাকায় সন্ধ্যায় দুর্বৃত্তদের ছুরিকাঘাতে এক ব্যক্তি নিহত হয়েছেন। পুলিশ ঘটনাস্থলে পৌঁছে মরদেহ উদ্ধার করেছে।",
    originalUrl: "https://prothomalo.com"
  },
  {
    id: 2,
    title: "নারী নির্যাতনের অভিযোগে গ্রেফতার",
    category: "নারী নির্যাতন",
    district: "চট্টগ্রাম",
    newspaper: "কালের কণ্ঠ",
    date: "২০২৫-০১-১৭",
    summary: "চট্টগ্রামে এক নারী তার স্বামীর বিরুদ্ধে নির্যাতনের অভিযোগ করেছেন। পুলিশ মামলা নিয়ে তদন্ত শুরু করেছে।",
    originalUrl: "https://kalerkantho.com"
  },
  {
    id: 3,
    title: "মাদক চোরাচালানে বড় ধরনের সাফল্য",
    category: "মাদক",
    district: "সীমান্ত",
    newspaper: "সমকাল",
    date: "২০২৫-০১-১৬",
    summary: "বিজিবি সদস্যরা সীমান্ত এলাকায় অভিযান চালিয়ে বিপুল পরিমাণ মাদক জব্দ করেছেন।",
    originalUrl: "https://samakal.com"
  },
  {
    id: 4,
    title: "দুর্নীতি মামলায় গ্রেফতার",
    category: "দুর্নীতি",
    district: "রাজশাহী",
    newspaper: "যুগান্তর",
    date: "২০২৫-০১-১৬",
    summary: "রাজশাহীতে দুর্নীতি দমন কমিশনের মামলায় এক সরকারি কর্মকর্তাকে গ্রেফতার করা হয়েছে।",
    originalUrl: "https://jugantar.com"
  },
  {
    id: 5,
    title: "শিক্ষাঙ্গনে সন্ত্রাস বন্ধে জরুরি পদক্ষেপ",
    category: "শিক্ষাঙ্গনে সন্ত্রাস",
    district: "ঢাকা",
    newspaper: "ইনকিলাব",
    date: "২০২৫-০১-১৫",
    summary: "রাজধানীর একটি কলেজে ছাত্রদের মধ্যে সংঘর্ষের ঘটনা ঘটেছে। প্রশাসন জরুরি বৈঠক ডেকেছে।",
    originalUrl: "https://inqilab.com"
  },
  {
    id: 6,
    title: "চাঁদাবাজির অভিযোগে গ্রেফতার ৫",
    category: "চাঁদাবাজি",
    district: "নারায়ণগঞ্জ",
    newspaper: "প্রথম আলো",
    date: "২০২৫-০১-১৫",
    summary: "নারায়ণগঞ্জে একটি বাজারের দোকান মালিকদের কাছ থেকে চাঁদা আদায়ের অভিযোগে পাঁচজনকে গ্রেফতার করেছে পুলিশ।",
    originalUrl: "https://prothomalo.com"
  },
  {
    id: 7,
    title: "হামলার শিকার সাংবাদিক",
    category: "হামলা / সংঘর্ষ",
    district: "খুলনা",
    newspaper: "ডেইলি স্টার",
    date: "২০২৫-০১-১৪",
    summary: "খুলনায় এক সাংবাদিককে পেট্রোল বোমা হামলায় আহত করেছে দুর্বৃত্তরা। তার অবস্থা আশঙ্কাজনক।",
    originalUrl: "https://thedailystar.net"
  },
  {
    id: 8,
    title: "জমি দখলের অভিযোগ",
    category: "দখল",
    district: "মুন্সিগঞ্জ",
    newspaper: "মানবজমিন",
    date: "২০২৫-০১-১৪",
    summary: "মুন্সিগঞ্জে একটি পরিবারের জমি জোরপূর্বক দখল করে নেওয়ার অভিযোগ উঠেছে স্থানীয় প্রভাবশালীদের বিরুদ্ধে।",
    originalUrl: "https://manabzamin.com"
  },
];

// Map database fields to our interface
const mapDbToNews = (item: any): NewsItem => ({
  id: item.id,
  title: item.title,
  category: item.category,
  district: item.district,
  newspaper: item.newspaper,
  date: item.date,
  summary: item.summary,
  originalUrl: item.original_url || item.originalUrl,
  created_at: item.created_at
});

// Hook to fetch news from Supabase with Real-time updates
export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch initial data
  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(TABLES.NEWS)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase error, using fallback data:', error);
        setNews(FALLBACK_NEWS);
        setIsConnected(false);
        setError(null);
      } else if (data && data.length > 0) {
        const mappedNews: NewsItem[] = data.map(mapDbToNews);
        setNews(mappedNews);
        setIsConnected(true);
        setError(null);
      } else {
        setNews(FALLBACK_NEWS);
        setIsConnected(false);
        setError(null);
      }
    } catch (err) {
      console.warn('Error fetching news, using fallback:', err);
      setNews(FALLBACK_NEWS);
      setIsConnected(false);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Set up real-time subscription
  useEffect(() => {
    // Fetch initial data
    fetchNews();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('news_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: TABLES.NEWS
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          
          if (payload.eventType === 'INSERT') {
            // New news added
            const newNews = mapDbToNews(payload.new);
            setNews(prev => [newNews, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            // News updated
            const updatedNews = mapDbToNews(payload.new);
            setNews(prev => 
              prev.map(item => 
                item.id === updatedNews.id ? updatedNews : item
              )
            );
          } else if (payload.eventType === 'DELETE') {
            // News deleted
            const deletedId = payload.old.id;
            setNews(prev => prev.filter(item => item.id !== deletedId));
          }
        }
      )
      .subscribe((status) => {
        console.log('Real-time subscription status:', status);
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
        }
      });

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchNews]);

  const addNews = async (newsItem: Omit<NewsItem, 'id' | 'created_at'>) => {
    try {
      const { error } = await supabase
        .from(TABLES.NEWS)
        .insert([{
          title: newsItem.title,
          category: newsItem.category,
          district: newsItem.district,
          newspaper: newsItem.newspaper,
          date: newsItem.date,
          summary: newsItem.summary,
          original_url: newsItem.originalUrl
        }]);

      if (error) {
        console.error('Error adding news:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      console.error('Error adding news:', err);
      return { success: false, error: 'Failed to add news' };
    }
  };

  return { news, loading, error, refetch: fetchNews, addNews, isConnected };
}

// Hook to submit information form
export function useSubmitForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Set up real-time subscription for submissions
  useEffect(() => {
    const channel = supabase
      .channel('submission_status')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: TABLES.SUBMISSIONS
        },
        (payload) => {
          console.log('Submission status updated:', payload);
          if (payload.new.status === 'approved') {
            // Refresh news if submission was approved
            window.location.reload();
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const submitForm = async (data: Omit<Submission, 'id' | 'created_at' | 'status'>) => {
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(false);

      const { error } = await supabase
        .from(TABLES.SUBMISSIONS)
        .insert([{
          title: data.title,
          category: data.category,
          district: data.district,
          newspaper: data.newspaper,
          date: data.date,
          description: data.description,
          contact_name: data.contactName,
          contact_email: data.contactEmail,
          status: 'pending'
        }]);

      if (error) {
        console.error('Supabase error, saving locally:', error);
        // Store in localStorage as fallback
        const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
        submissions.push({
          ...data,
          id: Date.now(),
          status: 'pending',
          created_at: new Date().toISOString()
        });
        localStorage.setItem('submissions', JSON.stringify(submissions));
        setSuccess(true);
        setIsConnected(false);
        return { success: true };
      }

      setSuccess(true);
      setIsConnected(true);
      return { success: true };
    } catch (err) {
      console.error('Error submitting form:', err);
      // Save to localStorage as fallback
      const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
      submissions.push({
        ...data,
        id: Date.now(),
        status: 'pending',
        created_at: new Date().toISOString()
      });
      localStorage.setItem('submissions', JSON.stringify(submissions));
      setSuccess(true);
      return { success: true };
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, success, error, submitForm, resetSuccess: () => setSuccess(false), isConnected };
}

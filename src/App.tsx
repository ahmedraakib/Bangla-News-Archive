import React, { useState, useEffect } from 'react';
import { 
  CATEGORIES, 
  DISTRICTS, 
  NEWSPAPERS, 
  SAMPLE_NEWS,
  generateStatisticsData
} from './data/news-data';
import { useNews } from './hooks/useNews';
import { supabase } from './lib/supabase';

// Icons Components
const Icons = {
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Home: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Chart: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Form: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Info: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Contact: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  News: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  ),
  Privacy: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Sitemap: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
};

// Utility function
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Type for news item
interface NewsItem {
  id: number;
  title: string;
  category: string;
  district: string;
  newspaper: string;
  date: string;
  summary: string;
  originalUrl: string;
  created_at?: string;
}

// Page Components
const Header = ({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen, isConnected }: {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isConnected: boolean;
}) => {
  const navItems = [
    { id: 'home', label: 'হোম', icon: Icons.Home },
    { id: 'news', label: 'সকল সংবাদ', icon: Icons.News },
    { id: 'graph', label: 'গ্রাফ', icon: Icons.Chart },
    { id: 'submit', label: 'তথ্য দিন', icon: Icons.Form },
    { id: 'about', label: 'আমাদের সম্পর্কে', icon: Icons.Info },
    { id: 'contact', label: 'যোগাযোগ', icon: Icons.Contact },
  ];

  return (
    <header className="bg-gradient-to-r from-black via-red-950 to-black text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-2xl">📰</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">বাংলা নিউজ আর্কাইভ</h1>
              <p className="text-xs text-blue-200 hidden sm:block">Bangla News Archive</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={cn(
                  "px-4 py-2 rounded-lg transition-all duration-200 font-medium",
                  currentPage === item.id
                    ? "bg-white text-blue-800"
                    : "hover:bg-blue-700 text-blue-100"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Connection Status */}
          <div className="hidden md:flex items-center gap-2">
            <span className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full ${isConnected ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'}`}>
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></span>
              {isConnected ? 'Live' : 'Offline'}
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-blue-700 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-blue-700">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-right",
                    currentPage === item.id
                      ? "bg-white text-blue-800"
                      : "hover:bg-blue-700 text-blue-100"
                  )}
                >
                  <item.icon />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              {/* Mobile connection status */}
              <div className={`flex items-center gap-2 px-4 py-2 ${isConnected ? 'text-green-300' : 'text-gray-300'}`}>
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></span>
                {isConnected ? 'Real-time Connected' : 'Using Local Data'}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

const Footer = ({ setCurrentPage, setFilterCategory }: { setCurrentPage: (page: string) => void; setFilterCategory: (c: string) => void }) => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">বাংলা নিউজ আর্কাইভ</h3>
            <p className="text-sm mb-4">
              বাংলাদেশের সর্ববৃহৎ অপরাধ সংবাদ আর্কাইভ। এখানে আপনি পাবেন দেশের সকল গুরুত্বপূর্ণ অপরাধ সংবাদের সংকলন।
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition"><span>📘</span></a>
              <a href="#" className="hover:text-white transition"><span>🐦</span></a>
              <a href="#" className="hover:text-white transition"><span>📸</span></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">দ্রুত লিংক</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-white transition">হোম</button>
              </li>
              <li>
                <button onClick={() => { setFilterCategory(''); setCurrentPage('news'); }} className="hover:text-white transition">সকল সংবাদ</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('graph')} className="hover:text-white transition">গ্রাফ</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('submit')} className="hover:text-white transition">তথ্য দিন</button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">ক্যাটাগরি</h3>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => { setFilterCategory(cat.name); setCurrentPage('news'); }}
                    className="hover:text-white transition"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">লিগ্যাল</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setCurrentPage('privacy')} className="hover:text-white transition flex items-center gap-2">
                  <Icons.Privacy /> গোপনীয়তা নীতি
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('sitemap')} className="hover:text-white transition flex items-center gap-2">
                  <Icons.Sitemap /> সাইটম্যাপ
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-white transition">যোগাযোগ</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© ২০২৬ বাংলা নিউজ আর্কাইভ। সকল অধিকার সংরক্ষিত।</p>
          <p className="mt-2 text-white-500">
অনুপ্রেরণাঃ <a href="https://bnpnama.info" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400 transition">বিএনপিনামা</a> <br />
একটি স্বাধীন তথ্যভাণ্ডার, যেখানে ৫ই আগস্ট ২০২৪ সালের পর সংঘটিত রাজনৈতিক সহিংসতা, অপরাধমূলক কর্মকাণ্ড এবং মানবাধিকার লঙ্ঘনের ঘটনাগুলো নিরপেক্ষভাবে নথিভুক্ত ও আর্কাইভ করা হচ্ছে।
এই প্ল্যাটফর্মের লক্ষ্য তথ্যের নিরপেক্ষ সংরক্ষণ, গবেষক ও সাংবাদিকদের জন্য একটি নির্ভরযোগ্য তথ্যসূত্র তৈরি করা এবং ভবিষ্যৎ প্রজন্মের জন্য একটি সত্যনিষ্ঠ ঐতিহাসিক দলিল গড়ে তোলা।          </p>
        </div>
      </div>
    </footer>
  );
};

const HeroSection = ({ searchQuery, setSearchQuery, setCurrentPage, newsCount }: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: string) => void;
  newsCount: number;
}) => {
  return (
    <section 
      className="text-white py-16 md:py-24 relative overflow-hidden"
      style={{
        backgroundImage: `url('bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          বাংলাদেশ অপরাধ সংবাদ আর্কাইভ
        </h1>
        <p className="text-white text-lg mb-8 max-w-2xl mx-auto [text-shadow:_1px_1px_0_black,_-1px_-1px_0_black,_1px_-1px_0_black,_-1px_1px_0_black]">
          দেশের সকল অপরাধ সংবাদের একমাত্র সম্পূর্ণ আর্কাইভ। খুন, ধর্ষণ, চাঁদাবাজি সহ সকল ধরনের অপরাধের পরিসংখ্যান এখানে।
        </p>
        
        {/* Search Box */}
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="খুঁজুন... (যেমন: খুন, ঢাকা, প্রথম আলো)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
className="w-full px-5 py-4 rounded-xl text-white bg-gradient-to-r from-black via-red-950 to-black placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icons.Search />
              </span>
            </div>
            <button
              onClick={() => setCurrentPage('news')}
className="px-8 py-4 bg-gradient-to-r from-black via-red-950 to-black hover:from-red-900 hover:via-red-700 hover:to-red-900 rounded-xl font-bold transition-all duration-300 border border-red-800 shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.7)]"            >
              খুঁজুন
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <div className="bg-white/10 backdrop-blur rounded-xl px-6 py-4">
            <p className="text-3xl font-bold">{newsCount}+</p>
            <p className="text-blue-200 text-sm">মোট আর্কাইভ</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl px-6 py-4">
            <p className="text-3xl font-bold">{CATEGORIES.length}+</p>
            <p className="text-blue-200 text-sm">ক্যাটাগরি</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl px-6 py-4">
            <p className="text-3xl font-bold">{DISTRICTS.length}+</p>
            <p className="text-blue-200 text-sm">জেলা</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatisticsSection = ({ news, isConnected }: { news: NewsItem[], isConnected: boolean }) => {
  // Generate statistics dynamically from news data
  const dynamicStats = generateStatisticsData(news);

  const dbMurders = (dynamicStats.crimesByCategory.find(c => c.name === 'খুন')?.value || 0);
  const dbRapes = (dynamicStats.crimesByCategory.find(c => c.name === 'ধর্ষণ')?.value || 0);
  const dbTotal = news.length;

  return (
    <section className="bg-gradient-to-r from-black via-red-900 to-black">
      <div className="container mx-auto px-4">
        {/* Real-time indicator */}
        <div className="flex justify-end mb-4">
          <div className={`flex items-center gap-2 text-sm ${isConnected ? 'text-green-300' : 'text-red-200'}`}>
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
            {isConnected ? '🔴 Live Data' : '📦 Static Data'}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/20 backdrop-blur rounded-2xl p-8">
            <p className="text-5xl font-bold mb-2">{dbMurders}</p>
            <p className="text-red-100 text-lg">খুনের ঘটনা</p>
            <p className="text-red-200 text-sm mt-2">গত বছরের তুলনায়</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-8">
            <p className="text-5xl font-bold mb-2">{dbRapes}</p>
            <p className="text-red-100 text-lg">ধর্ষণের ঘটনা</p>
            <p className="text-red-200 text-sm mt-2">গত বছরের তুলনায়</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-8">
            <p className="text-5xl font-bold mb-2">{dbTotal}</p>
            <p className="text-red-100 text-lg">মোট আর্কাইভ</p>
            <p className="text-red-200 text-sm mt-2">সর্বমোট সংবাদ</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CategoryGrid = ({ setCurrentPage, setFilterCategory, categoryCounts }: { setCurrentPage: (page: string) => void; setFilterCategory: (cat: string) => void; categoryCounts: { name: string; value: number }[] }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          অপরাধ ক্যাটাগরি
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts.find(c => c.name === cat.name)?.value || 0;
            return (
              <button
              key={cat.id}
              onClick={() => { setFilterCategory(cat.name); setCurrentPage('news'); }}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <span className="text-3xl block mb-2">{cat.icon}</span>
              <p className="font-semibold text-gray-800">{cat.name}</p>
                  <p className="text-sm text-gray-500">{count} টি সংবাদ</p>
            </button>
            )
          })}
        </div>
      </div>
    </section>
  );
};

const RecentNews = ({ news, setCurrentPage }: { news: NewsItem[]; setCurrentPage: (page: string) => void }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            সাম্প্রতিক সংবাদ
          </h2>
          <button
            onClick={() => setCurrentPage('news')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
          >
            সব দেখুন <Icons.ArrowRight />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.slice(0, 8).map((item) => (
            <a
              key={item.id}
              href={item.originalUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer border border-gray-100 group"
            >
              <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center relative overflow-hidden">
                <span className="text-6xl opacity-30">📰</span>
                {/* Overlay with original source indicator */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/90 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    🔗 সোর্স দেখুন
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {item.summary}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>📍 {item.district}</span>
                  <span className="flex items-center gap-1 text-blue-600">
                    📰 {item.newspaper}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const AllNewsPage = ({ news, filterCategory, filterDistrict, filterNewspaper, setFilterCategory, setFilterDistrict, setFilterNewspaper }: { news: NewsItem[]; filterCategory: string; filterDistrict: string; filterNewspaper: string; setFilterCategory: (c: string) => void; setFilterDistrict: (d: string) => void; setFilterNewspaper: (n: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = news.filter((newsItem) => {
    const matchesCategory = !filterCategory || newsItem.category === filterCategory;
    const matchesDistrict = !filterDistrict || newsItem.district === filterDistrict;
    const matchesNewspaper = !filterNewspaper || newsItem.newspaper === filterNewspaper;
    const matchesSearch = !searchTerm || 
      newsItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      newsItem.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesDistrict && matchesNewspaper && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">সকল সংবাদ আর্কাইভ</h1>
        
        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h3 className="font-bold text-gray-700 mb-4">🔍 ফিল্টার অপশন</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="সার্চ করুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
              <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">সব ক্যাটাগরি</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">সব জেলা</option>
              {DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
            <select
              value={filterNewspaper}
              onChange={(e) => setFilterNewspaper(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">সব পত্রিকা</option>
              {NEWSPAPERS.map((paper) => (
                <option key={paper.name} value={paper.name}>{paper.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <p className="text-gray-600 mb-4">{filteredNews.length} টি সংবাদ পাওয়া গেছে</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((newsItem) => (
            <a
              key={newsItem.id}
              href={newsItem.originalUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100 group"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">
                    {newsItem.category}
                  </span>
                  <span className="text-xs text-gray-500">{newsItem.date}</span>
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition">
                  {newsItem.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{newsItem.summary}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t">
                  <span>📍 {newsItem.district}</span>
                  <span className="flex items-center gap-1 text-blue-600">
                    🔗 সোর্স দেখুন
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">কোনো সংবাদ পাওয়া যায়নি।</p>
          </div>
        )}
      </div>
    </div>
  );
};

const GraphPage = ({ news }: { news: NewsItem[] }) => {
  // Generate statistics dynamically from news data
  const dynamicStats = generateStatisticsData(news);

  const stats = dynamicStats.crimesByCategory.map((stat) => {
    const maxCount = Math.max(...dynamicStats.crimesByCategory.map(s => s.value), 1);
    return {
      ...stat,
      percentage: Math.round((stat.value / maxCount) * 100)
    };
  });

  const colors = ['#e74c3c', '#9b59b6', '#f39c12', '#e67e22', '#1abc9c', '#3498db', '#27ae60', '#16a085', '#2980b9', '#8e44ad'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">অপরাধ পরিসংখ্যান গ্রাফ</h1>
        
        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-6">ক্যাটাগরি অনুযায়ী অপরাধ</h2>
          <div className="space-y-4">
            {stats.map((stat, idx) => (
              <div key={stat.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{stat.name}</span>
                  <span className="text-gray-500">{stat.value} টি</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${stat.percentage}%`,
                      backgroundColor: colors[idx % colors.length]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-6">মাসিক পরিসংখ্যান</h2>
            <div className="space-y-4">
              {dynamicStats.monthlyCrimes.map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <span className="w-20 text-sm font-medium">{item.name}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      style={{ width: `${(item.murder / 30) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-sm text-right">{item.murder}</span>
                </div>
              ))}
            </div>
          </div>

          {/* District Stats */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-6">জেলা অনুযায়ী অপরাধ</h2>
            <div className="space-y-4">
              {dynamicStats.districtStats.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-4">
                  <span className="w-24 text-sm font-medium">{item.name}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div
                      className="h-full rounded-full"
                      style={{ 
                        width: `${(item.crimes / 300) * 100}%`,
                        backgroundColor: colors[idx % colors.length]
                      }}
                    />
                  </div>
                  <span className="w-12 text-sm text-right">{item.crimes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SubmitInfoPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: '',
    district: '',
    newspaper: '',
    title: '',
    description: '',
    date: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Try to save to Supabase
      const { error: submitError } = await supabase
        .from('submissions')
        .insert([{
          title: formData.title,
          category: formData.category,
          district: formData.district,
          newspaper: formData.newspaper,
          date: formData.date,
          description: formData.description,
          contact_name: formData.name,
          contact_phone: formData.phone,
          status: 'pending'
        }]);

      if (submitError) {
        // Save to localStorage as fallback
        const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
        submissions.push({
          ...formData,
          id: Date.now(),
          status: 'pending',
          created_at: new Date().toISOString()
        });
        localStorage.setItem('submissions', JSON.stringify(submissions));
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      // Save to localStorage as fallback
      const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
      submissions.push({
        ...formData,
        id: Date.now(),
        status: 'pending',
        created_at: new Date().toISOString()
      });
      localStorage.setItem('submissions', JSON.stringify(submissions));
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">তথ্য জমা দিন</h1>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          {submitted ? (
            <div className="text-center py-12">
              <span className="text-6xl">✅</span>
              <h2 className="text-2xl font-bold text-green-600 mt-4">ধন্যবাদ!</h2>
              <p className="text-gray-600 mt-2">আপনার তথ্য গৃহীত হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।</p>
              <p className="text-sm text-gray-500 mt-4">সংবাদটি যাচাই করে ২৪ ঘণ্টার মধ্যে আর্কাইভে যোগ করা হবে।</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">আপনার নাম *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="আপনার নাম লিখুন"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ফোন নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="০১XXXXXXXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ক্যাটাগরি *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">ক্যাটাগরি নির্বাচন করুন</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">জেলা *</label>
                  <select
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">জেলা নির্বাচন করুন</option>
                    {DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">পত্রিকার নাম</label>
                <input
                  type="text"
                  value={formData.newspaper}
                  onChange={(e) => setFormData({ ...formData, newspaper: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="যেমন: প্রথম আলো"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ঘটনার শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="সংবাদের শিরোনাম লিখুন"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ঘটনার বিবরণ *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ঘটনার বিস্তারিত বিবরণ লিখুন..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ঘটনার তারিখ</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-lg disabled:opacity-50"
              >
                {loading ? 'জমা হচ্ছে...' : 'তথ্য জমা দিন'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const AboutPage = ({ newsCount }: { newsCount: number }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">আমাদের সম্পর্কে</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-md space-y-6">
          <section>
            <h2 className="text-xl font-bold text-blue-700 mb-3">আমাদের মিশন</h2>
            <p className="text-gray-600 leading-relaxed">
              বাংলা নিউজ আর্কাইভ বাংলাদেশের সর্ববৃহৎ এবং সবচেয়ে নির্ভরযোগ্য অপরাধ সংবাদ আর্কাইভ। 
              আমাদের লক্ষ্য হলো দেশের সকল অপরাধ সংবাদ সংগ্রহ করে সাজানো গুছানো আকারে পাঠকদের সামনে তুলে ধরা। 
              এই ওয়েবসাইটটি গণমাধ্যমের স্বাধীনতা এবং তথ্যের অবাধ প্রবাহের প্রতি আমাদের অঙ্গীকারের প্রমাণ।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-700 mb-3">আমরা কী করি</h2>
            <p className="text-gray-600 leading-relaxed">
              আমরা বিভিন্ন জাতীয় এবং স্থানীয় পত্রিকা, অনলাইন নিউজ পোর্টাল এবং অন্যান্য গণমাধ্যম থেকে 
              অপরাধ সংক্রান্ত সংবাদ সংগ্রহ করি এবং সেগুলোকে ক্যাটাগরি, জেলা এবং তারিখ অনুযায়ী সাজাই। 
              এখানে আপনি খুন, ধর্ষণ, চাঁদাবাজি, হামলা, লুটপাট, দখল, মাদক, অস্ত্র এবং আরো অনেক ধরনের 
              অপরাধের সংবাদ পাবেন।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-700 mb-3">আমাদের বৈশিষ্ট্য</h2>
            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>{newsCount + 1700}+ সংবাদ আর্কাইভ</li>
              <li>{CATEGORIES.length}+ অপরাধ ক্যাটাগরি</li>
              <li>{DISTRICTS.length}+ জেলা থেকে সংবাদ সংগ্রহ</li>
              <li>দ্রুত এবং সহজ অনুসন্ধান</li>
              <li>মোবাইল ফ্রেন্ডলি ডিজাইন</li>
              <li>বিনামূল্যে ব্যবহার</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-700 mb-3">যোগাযোগ</h2>
            <p className="text-gray-600">
              যেকোনো প্রশ্ন, মন্তব্য বা পরামর্শের জন্য আমাদের সাথে যোগাযোগ করুন। 
              আমরা সবসময় পাঠকদের মতামত গুরুত্বের সাথে বিবেচনা করি এবং আমাদের সেবা উন্নত করতে চেষ্টা করি।
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">যোগাযোগ</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">যোগাযোগের তথ্য</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-medium">ইমেইল</p>
                  <p className="text-gray-600">info@banglanewsarchive.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-medium">ঠিকানা</p>
                  <p className="text-gray-600">ঢাকা, বাংলাদেশ</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-medium">ফোন</p>
                  <p className="text-gray-600">+৮৮০XXXXXXXXXX</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-gray-700 mb-4">সামাজিক মাধ্যম</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                  📘
                </a>
                <a href="#" className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition">
                  🐦
                </a>
                <a href="#" className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition">
                  📸
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            {submitted ? (
              <div className="text-center py-12">
                <span className="text-6xl">✅</span>
                <h2 className="text-xl font-bold text-green-600 mt-4">মেসেজ পাঠানো হয়েছে!</h2>
                <p className="text-gray-600 mt-2">আমরা শীঘ্রই আপনাকে উত্তর দেব।</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">আপনার নাম *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="আপনার নাম"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ইমেইল *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">বিষয় *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="বিষয়"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">মেসেজ *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="আপনার মেসেজ লিখুন..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition"
                >
                  মেসেজ পাঠান
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">গোপনীয়তা নীতি</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-md space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">১. ভূমিকা</h2>
            <p>
              এই গোপনীয়তা নীতি বাংলা নিউজ আর্কাইভ ওয়েবসাইট ব্যবহারের সাথে সম্পর্কিত। 
              আমরা আপনার গোপনীয়তা রক্ষায় প্রতিশ্রুতিবদ্ধ এবং এই নীতি ব্যাখ্যা করে যে 
              আমরা কী তথ্য সংগ্রহ করি, কীভাবে ব্যবহার করি এবং কখন শেয়ার করি।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">২. তথ্য সংগ্রহ</h2>
            <p>আমরা নিম্নলিখিত তথ্য সংগ্রহ করতে পারি:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>আপনার দেওয়া নাম এবং যোগাযোগের তথ্য</li>
              <li>আপনার পাঠানো সংবাদ বা তথ্য</li>
              <li>ব্যবহারের ডেটা এবং অ্যানালিটিক্স</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">৩. তথ্য ব্যবহার</h2>
            <p>আমরা আপনার তথ্য ব্যবহার করি:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>ওয়েবসাইট পরিচালনা এবং উন্নত করতে</li>
              <li>আপনার প্রশ্নের উত্তর দিতে</li>
              <li>সেবা প্রদান এবং ব্যবহারকারীর অভিজ্ঞতা উন্নত করতে</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">৪. কুকি</h2>
            <p>
              এই ওয়েবসাইট কুকি ব্যবহার করে। আপনি ব্রাউজার সেটিংস পরিবর্তন করে কুকি ব্লক করতে পারেন, 
              তবে কিছু ফিচার কাজ নাও করতে পারে।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">৫. যোগাযোগ</h2>
            <p>
              এই গোপনীয়তা নীতি সম্পর্কে কোনো প্রশ্ন থাকলে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন।
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

const SitemapPage = ({ setCurrentPage, setFilterCategory, setFilterDistrict, setFilterNewspaper }: { setCurrentPage: (p: string) => void; setFilterCategory: (c: string) => void; setFilterDistrict: (d: string) => void; setFilterNewspaper: (n: string) => void }) => {
  const allPages = [
    { id: 'home', label: 'হোম', description: 'প্রধান পেজ - সর্বশেষ সংবাদ এবং পরিসংখ্যান' },
    { id: 'news', label: 'সকল সংবাদ', description: 'সম্পূর্ণ সংবাদ আর্কাইভ' },
    { id: 'graph', label: 'গ্রাফ', description: 'অপরাধ পরিসংখ্যান চার্ট' },
    { id: 'submit', label: 'তথ্য দিন', description: 'নতুন সংবাদ জমা দিন' },
    { id: 'about', label: 'আমাদের সম্পর্কে', description: 'ওয়েবসাইট সম্পর্কে তথ্য' },
    { id: 'contact', label: 'যোগাযোগ', description: 'যোগাযোগের ফর্ম এবং তথ্য' },
    { id: 'privacy', label: 'গোপনীয়তা নীতি', description: 'গোপনীয়তা নীতি দস্তাবেজ' },
  ];

  // Use SAMPLE_NEWS as a fallback listing for sitemap articles
  const articles = SAMPLE_NEWS || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">সাইটম্যাপ</h1>

        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold text-blue-700 mb-4">পেজ সমূহ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allPages.map((page) => (
              <button key={page.id} onClick={() => setCurrentPage(page.id)} className="text-left w-full border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <p className="font-bold text-gray-800">{page.label}</p>
                <p className="text-sm text-gray-500">{page.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold text-blue-700 mb-4">ক্যাটাগরি সমূহ</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <button key={cat.id} onClick={() => { setFilterCategory(cat.name); setCurrentPage('news'); }} className="text-left w-full border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <p className="font-bold text-gray-800">{cat.name}</p>
                <p className="text-sm text-gray-500">{cat.count} টি সংবাদ</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold text-blue-700 mb-4">অবস্থান অনুসারে</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {DISTRICTS.map((dist) => (
              <button key={dist} onClick={() => { setFilterDistrict(dist); setCurrentPage('news'); }} className="text-left w-full border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <p className="font-bold text-gray-800">{dist}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold text-blue-700 mb-4">পত্রিকা সমূহ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {NEWSPAPERS.map((paper) => (
              <div key={paper.name} onClick={() => { setFilterNewspaper(paper.name); setCurrentPage('news'); }} className="cursor-pointer border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <a href={paper.url} target="_blank" rel="noopener noreferrer" className="font-bold text-gray-800 hover:text-blue-600">{paper.name}</a>
                <p className="text-sm text-gray-500">{paper.url}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold text-blue-700 mb-4">সকল সংবাদ (আর্টিকেল লিংক)</h2>
          <div className="space-y-3 max-h-96 overflow-auto">
            {articles.map((item) => (
              <a
                key={item.id}
                href={item.originalUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.date} • {item.category} • {item.district}</p>
                  </div>
                  <div className="text-xs text-blue-600">🔗</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterNewspaper, setFilterNewspaper] = useState('');
  
  // Use Supabase for news data
  const { news, loading, isConnected } = useNews();
  const stats = generateStatisticsData(news);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <HeroSection 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              setCurrentPage={setCurrentPage}
              newsCount={news.length}
            />
            <StatisticsSection news={news} isConnected={isConnected} />
            <CategoryGrid setCurrentPage={setCurrentPage} setFilterCategory={setFilterCategory} categoryCounts={stats.crimesByCategory} />
            <RecentNews news={news} setCurrentPage={setCurrentPage} />
          </>
        );
      case 'news':
        return <AllNewsPage news={news} filterCategory={filterCategory} filterDistrict={filterDistrict} filterNewspaper={filterNewspaper} setFilterCategory={setFilterCategory} setFilterDistrict={setFilterDistrict} setFilterNewspaper={setFilterNewspaper} />;
      case 'graph':
        return <GraphPage news={news} />;
      case 'submit':
        return <SubmitInfoPage />;
      case 'about':
        return <AboutPage newsCount={news.length} />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'sitemap':
        return <SitemapPage setCurrentPage={setCurrentPage} setFilterCategory={setFilterCategory} setFilterDistrict={setFilterDistrict} setFilterNewspaper={setFilterNewspaper} />;
      default:
        return (
          <>
            <HeroSection 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              setCurrentPage={setCurrentPage}
              newsCount={news.length}
            />
            <StatisticsSection news={news} isConnected={isConnected} />
            <CategoryGrid setCurrentPage={setCurrentPage} setFilterCategory={setFilterCategory} categoryCounts={stats.crimesByCategory} />
            <RecentNews news={news} setCurrentPage={setCurrentPage} />
          </>
        );
    }
  };

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      home: 'বাংলা নিউজ আর্কাইভ - Bangla News Archive',
      news: 'সকল সংবাদ - Bangla News Archive',
      graph: 'গ্রাফ - Bangla News Archive',
      submit: 'তথ্য দিন - Bangla News Archive',
      about: 'আমাদের সম্পর্কে - Bangla News Archive',
      contact: 'যোগাযোগ - Bangla News Archive',
      privacy: 'গোপনীয়তা নীতি - Bangla News Archive',
      sitemap: 'সাইটম্যাপ - Bangla News Archive',
    };
    return titles[currentPage] || 'বাংলা নিউজ আর্কাইভ';
  };

  useEffect(() => {
    document.title = getPageTitle();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl">📰</span>
          <p className="mt-4 text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}        
        isConnected={isConnected}
      />
      <main>
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} setFilterCategory={setFilterCategory} />
    </div>
  );
}

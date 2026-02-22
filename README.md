<<<<<<< HEAD
# বাংলা নিউজ আর্কাইভ - Bangla News Archive

A modern, responsive Bengali crime news archive website built with React, Vite, and Tailwind CSS.

## 🌟 Features

- **Homepage**: Hero section with search, statistics counters, category grid, and recent news
- **All News**: Filterable archive with search by category, district, and newspaper
- **Graph Page**: Visual statistics with bar charts and data visualizations
- **Submit Information**: Form for users to submit news tips
- **About Us**: Information about the website
- **Contact**: Contact form and information
- **Privacy Policy**: Privacy documentation
- **Sitemap**: Complete site map

## 🚀 Quick Start

### Development Mode

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
```

The built files will be in the `dist/` folder.

## 📦 Tech Stack

- **React 19** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS 4** - Styling
- **TypeScript** - Type Safety
- **Hind Siliguri Font** - Bengali Typography

## 🎨 Design Features

- Fully responsive (Mobile, Tablet, Desktop)
- Bengali language support throughout
- Modern gradient designs
- Smooth animations and transitions
- Clean, professional UI

## 📁 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | / | Main landing page with hero, stats, categories |
| All News | /news | Searchable news archive |
| Graph | /graph | Statistics and charts |
| Submit | /submit | News submission form |
| About | /about | About page |
| Contact | /contact | Contact form |
| Privacy | /privacy | Privacy policy |
| Sitemap | /sitemap | Site map |

## 🛠️ Categories

1. খুন (Murder)
2. ধর্ষণ (Rape)
3. চাঁদাবাজি (Extortion)
4. হামলা/সংঘর্ষ (Assault/Clash)
5. লুটপাট (Robbery)
6. দখল (Occupation/Seizure)
7. ইসলামবিদ্বেষ (Islamophobia)
8. মাদক (Drugs)
9. অস্ত্র (Weapons)
10. চুরি/ডাকাতি (Theft/Burglary)
11. শিক্ষাঙ্গনে সন্ত্রাস (Campus Terror)
12. লীগ পুনর্বাসन (League Rehabilitation)
13. মামলা বাণিজ্য (Complaint Business)
14. টেন্ডারবাজি (Tender Scam)
15. নারী নির্যাতন (Women Abuse)
16. দুর্নীতি (Corruption)
17. গুজব ও মিথ্যাচার (Rumor & Lies)
18. হুমকি (Threats)
19. গণতন্ত্রে বাধা (Democracy Obstacles)
20. বিবিধ (Miscellaneous)

## 🌐 Deployment Options

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Deploy automatically

### Netlify
1. Push code to GitHub
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages
```bash
npm run build
npx gh-pages -d dist
```

### Any Static Hosting
Upload the `dist/` folder contents to:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 📱 Mobile Responsive

The site is fully responsive with:
- Mobile-first approach
- Hamburger menu navigation
- Touch-friendly buttons
- Flexible grid layouts

## 🔧 Customization

### Adding More Categories
Edit `CATEGORIES` array in `src/App.tsx`:

```typescript
const CATEGORIES = [
  { id: 'unique-id', name: 'ক্যাটাগরি নাম', icon: '🎯', count: 0, color: '#hex' },
  // Add more...
];
```

### Adding Districts
Edit `DISTRICTS` array:

```typescript
const DISTRICTS = ['ঢাকা', 'চট্টগ্রাম', /* Add more... */];
```

### Adding Newspapers
Edit `NEWSPAPERS` array:

```typescript
const NEWSPAPERS = ['প্রথম আলো', 'কালের কণ্ঠ', /* Add more... */];
```

### Adding News
Edit `SAMPLE_NEWS` array:

```typescript
{
  id: 1,
  title: 'সংবাদ শিরোনাম',
  category: 'ক্যাটাগরি',
  district: 'জেলা',
  newspaper: 'পত্রিকা',
  date: '২০২৪-০১-১৫',
  summary: 'সংবাদের সারসংক্ষেপ'
}
```

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is for educational purposes.

## 🙏 Credits

- Icons: Emoji characters
- Font: Google Fonts - Hind Siliguri
- Design: Inspired by Bengali news portals

---

**Note**: This website is built for educational and demonstration purposes. Content shown is sample data only.
=======
# Bangla-News-Archive
>>>>>>> 8d73fb4b89438d879ebad51369d571deb14e32f5

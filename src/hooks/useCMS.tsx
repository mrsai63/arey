import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { ref, onValue, set, get, child } from "firebase/database";
import { database } from "@/lib/firebase";

// Types for our CMS Site Data
export interface CMSHero {
  badge: string;
  title1: string;
  title2: string;
  titleGradient: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  sinceYear: string;
  sinceText: string;
  floatingCards: Array<{
    icon: string;
    label: string;
    value: string;
    x: string;
    y: string;
    delay?: number;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

export interface CMSService {
  icon: string;
  title: string;
  desc: string;
}

export interface CMSIndustry {
  icon: string;
  label: string;
}

export interface CMSWhyUs {
  eyebrow: string;
  title: string;
  sub: string;
  bullets: string[];
  counters: Array<{
    v: number;
    s: string;
    l: string;
  }>;
}

export interface CMSProject {
  title: string;
  tag: string;
  grad: string;
  span: string;
  link?: string;
}

export interface CMSStep {
  n: string;
  title: string;
  desc: string;
}

export interface CMSTestimonial {
  name: string;
  role: string;
  text: string;
}

export interface CMSFaq {
  q: string;
  a: string;
}

export interface CMSContact {
  eyebrow: string;
  title: string;
  sub: string;
  email: string;
  phone: string;
  address: string;
}

export interface CMSPageHero {
  eyebrow: string;
  title: string; // Plain text title, we can style it using custom span decorators if needed or render as is
  sub: string;
}

export interface CMSData {
  hero: CMSHero;
  clientLogos: string[];
  services: {
    eyebrow: string;
    title: string;
    sub: string;
    items: CMSService[];
  };
  industries: {
    eyebrow: string;
    title: string;
    sub: string;
    items: CMSIndustry[];
  };
  whyUs: CMSWhyUs;
  portfolio: {
    eyebrow: string;
    title: string;
    projects: CMSProject[];
  };
  process: {
    eyebrow: string;
    title: string;
    sub: string;
    steps: CMSStep[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    sub: string;
    items: CMSTestimonial[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: CMSFaq[];
  };
  contact: CMSContact;
  pageHeroes: {
    about: CMSPageHero;
    services: CMSPageHero;
    industries: CMSPageHero;
    portfolio: CMSPageHero;
    contact: CMSPageHero;
  };
}

// Hardcoded defaults matching current website contents
export const DEFAULT_CMS_DATA: CMSData = {
  hero: {
    badge: "CREATE · SHOOT · GROW 🚀",
    title1: "We Don't Just",
    title2: "Market Brands.",
    titleGradient: "We Build Them.",
    description: "From strategy to content creation, social media, branding and digital campaigns — we help businesses dominate their industry.",
    primaryBtnText: "Start Your Project",
    primaryBtnLink: "/contact",
    secondaryBtnText: "View Our Work",
    secondaryBtnLink: "/portfolio",
    sinceYear: "2024",
    sinceText: "CREATIVE STUDIO",
    floatingCards: [
      { icon: "TrendingUp", label: "Instagram Growth", value: "+248%", x: "-12%", y: "8%", delay: 0 },
      { icon: "Megaphone", label: "Ads Performance", value: "5.2x ROAS", x: "62%", y: "0%", delay: 0.1 },
      { icon: "Camera", label: "Content Created", value: "1,200+", x: "70%", y: "55%", delay: 0.2 },
      { icon: "Palette", label: "Brand Identities", value: "40+", x: "-8%", y: "62%", delay: 0.3 },
      { icon: "Sparkles", label: "Campaigns Live", value: "100%", x: "28%", y: "32%", delay: 0.4 },
    ],
    stats: [
      { value: "15+", label: "Clients" },
      { value: "100+", label: "Campaigns" },
      { value: "1000+", label: "Creative Assets" }
    ]
  },
  clientLogos: [
    "Aurelia", "Spice Route", "Sunrise", "Urban Realty", "Drive Auto", "Studio Bloom",
    "Northstar", "Marigold", "Coastline", "Vertex", "Halcyon", "Lumen"
  ],
  services: {
    eyebrow: "What We Do",
    title: "A complete studio for growth-led brands.",
    sub: "Sixteen capabilities. One integrated team. Built to take your brand from idea to industry leader.",
    items: [
      { icon: "TrendingUp", title: "Digital Marketing", desc: "Full-funnel strategies that turn attention into revenue." },
      { icon: "Target", title: "Brand Strategy", desc: "Positioning, voice & identity systems that resonate." },
      { icon: "Share2", title: "Social Media", desc: "Content calendars, engagement & community building." },
      { icon: "Camera", title: "Photography", desc: "Editorial product, lifestyle & brand photo shoots." },
      { icon: "Video", title: "Videography", desc: "Cinematic reels, ads, brand films & docu-content." },
      { icon: "Package", title: "Product Shoots", desc: "High-conversion catalogue & ecommerce imagery." },
      { icon: "Code2", title: "Web Development", desc: "Premium, fast, conversion-focused websites." },
      { icon: "Search", title: "SEO", desc: "Technical + content SEO that compounds in traffic." },
      { icon: "MousePointerClick", title: "Google Ads", desc: "Search, shopping & performance max campaigns." },
      { icon: "Megaphone", title: "Meta Ads", desc: "Creator-style ads that scale across Meta surfaces." },
      { icon: "BarChart3", title: "Performance Marketing", desc: "Data-driven scaling across every channel." },
      { icon: "PenTool", title: "Content Creation", desc: "Reels, statics, carousels & long-form story." },
      { icon: "Palette", title: "Graphic Design", desc: "Posters, decks, packaging & motion graphics." },
      { icon: "Users", title: "Influencer Marketing", desc: "Creator partnerships engineered for conversion." },
      { icon: "Mail", title: "Email Marketing", desc: "Lifecycle flows & broadcasts that retain customers." },
      { icon: "Building2", title: "Corporate Branding", desc: "Enterprise identity, comms & sales collateral." }
    ]
  },
  industries: {
    eyebrow: "Industries We Serve",
    title: "Built for every sector.",
    sub: "From neighbourhood cafés to enterprise hospitals — we've shaped brands across the spectrum.",
    items: [
      { icon: "UtensilsCrossed", label: "Restaurants" },
      { icon: "Stethoscope", label: "Hospitals" },
      { icon: "Building", label: "Real Estate" },
      { icon: "GraduationCap", label: "Education" },
      { icon: "Car", label: "Automobile" },
      { icon: "Hotel", label: "Hotels" },
      { icon: "Palmtree", label: "Resorts" },
      { icon: "Shirt", label: "Fashion" },
      { icon: "Gem", label: "Jewelry" },
      { icon: "HardHat", label: "Construction" },
      { icon: "Dumbbell", label: "Fitness" },
      { icon: "Sparkles", label: "Beauty" },
      { icon: "ShoppingBag", label: "Retail" },
      { icon: "Briefcase", label: "Corporate" },
      { icon: "Landmark", label: "Finance" },
      { icon: "Rocket", label: "Startups" },
      { icon: "Store", label: "E-commerce" },
      { icon: "User", label: "Personal Brand" }
    ]
  },
  whyUs: {
    eyebrow: "Why Brand Shoots",
    title: "Creative power, measurable growth.",
    sub: "We blend brand thinking, content craft and performance media — so every rupee compounds into market share.",
    bullets: [
      "In-house photo, video and design studio",
      "Strategy-first approach for every campaign",
      "Transparent reporting & dashboards",
      "Multi-industry expertise across India"
    ],
    counters: [
      { v: 15, s: "+", l: "Clients" },
      { v: 100, s: "+", l: "Campaigns" },
      { v: 1000, s: "+", l: "Creative Assets" },
      { v: 18, s: "", l: "Industries" }
    ]
  },
  portfolio: {
    eyebrow: "Selected Work",
    title: "Crafted, shot & scaled.",
    projects: [
      { title: "Aurelia Jewelry", tag: "Photography · Brand", grad: "from-amber-300/30 to-rose-500/20", span: "md:col-span-2 md:row-span-2" },
      { title: "Spice Route", tag: "Social · Reels", grad: "from-orange-500/30 to-red-700/20", span: "" },
      { title: "Sunrise Hospitals", tag: "Campaign · Ads", grad: "from-sky-400/30 to-blue-700/20", span: "" },
      { title: "Urban Realty", tag: "Web · Performance", grad: "from-emerald-400/30 to-teal-700/20", span: "md:col-span-2" },
      { title: "Drive Auto", tag: "Videography", grad: "from-zinc-300/30 to-zinc-700/20", span: "" },
      { title: "Studio Bloom", tag: "Brand · Identity", grad: "from-pink-400/30 to-purple-700/20", span: "" }
    ]
  },
  process: {
    eyebrow: "Our Process",
    title: "From idea to industry leader.",
    sub: "A repeatable, transparent six-step system that drives every Brand Shoots engagement.",
    steps: [
      { n: "01", title: "Discovery", desc: "We dive deep into your brand, audience, market and goals." },
      { n: "02", title: "Strategy", desc: "Positioning, channel mix, messaging and a measurable roadmap." },
      { n: "03", title: "Creative Production", desc: "Photo, video, design and copy crafted in-house at studio quality." },
      { n: "04", title: "Campaign Execution", desc: "Multi-channel launch across Meta, Google, social and on-ground." },
      { n: "05", title: "Optimization", desc: "Daily tracking, A/B testing and creative iteration." },
      { n: "06", title: "Growth", desc: "Compounded results across reach, leads, sales and brand equity." }
    ]
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Loved by founders across India.",
    sub: "Real words from real partners we've helped grow.",
    items: [
      { name: "Anand Reddy", role: "Founder, Spice Route Restaurants", text: "Brand Shoots transformed our visual identity and our delivery orders jumped 3x in two months. Exceptional craft." },
      { name: "Dr. Kavitha", role: "Director, Sunrise Hospitals", text: "From photography to performance ads — a single team handled everything. Patient enquiries doubled within a quarter." },
      { name: "Rohan Mehta", role: "CEO, Urban Realty", text: "The campaigns brought in serious leads, not noise. The creative quality matches anything coming out of Mumbai studios." },
      { name: "Priya Sharma", role: "Founder, Aurelia Jewelry", text: "Our product photography became our biggest asset. Brand Shoots understands premium positioning end-to-end." },
      { name: "Vikram S.", role: "Marketing Head, Drive Auto", text: "We've worked with three agencies — none matched their speed, taste and reporting clarity. Highly recommended." },
      { name: "Meera Iyer", role: "Owner, Studio Bloom", text: "They built our brand from scratch — logo, site, social system. Six months in we're booked out for the season." }
    ]
  },
  faq: {
    eyebrow: "FAQ",
    title: "Answers, before you ask.",
    items: [
      { q: "What services does Brand Shoots offer?", a: "We're a full-service creative and digital marketing studio — strategy, branding, social, photo, video, performance marketing and web development, all under one roof." },
      { q: "Which cities do you operate in?", a: "We're based in Rajahmundry and Vijayawada and serve clients across India remotely and on-ground." },
      { q: "Do you only work with big brands?", a: "Not at all. We work with startups, SMBs, founders and enterprises — what matters is ambition and intent to grow." },
      { q: "How long does a typical engagement take?", a: "Brand identity projects run 4-6 weeks. Ongoing marketing engagements are monthly retainers starting from 3 months." },
      { q: "Will I get reports on performance?", a: "Yes — every retainer includes a transparent live dashboard plus monthly reviews with insights and next-steps." },
      { q: "How do we start working together?", a: "Drop us a message via the contact form. We'll set up a discovery call within 24 hours." }
    ]
  },
  contact: {
    eyebrow: "Let's Talk",
    title: "Let's build a brand people remember.",
    sub: "Tell us about your business and goals. We'll get back within one working day.",
    email: "hello@brandshoots.in",
    phone: "+91 00000 00000",
    address: "Rajahmundry · Vijayawada · India"
  },
  pageHeroes: {
    about: {
      eyebrow: "About Us",
      title: "A creative studio for the <span class=\"text-gradient\">next era of brands.</span>",
      sub: "Brand Shoots is a tight-knit team of strategists, designers, photographers, filmmakers and marketers — building work we're proud to put our name on."
    },
    services: {
      eyebrow: "Services",
      title: "Everything you need to <span class=\"text-gradient\">grow.</span>",
      sub: "Sixteen capabilities. One studio. Pick a single service or hand us the entire growth engine."
    },
    industries: {
      eyebrow: "Industries",
      title: "Sector-fluent. <span class=\"text-gradient\">Brand-obsessed.</span>",
      sub: "Years of work across every major Indian business category — we already speak your audience's language."
    },
    portfolio: {
      eyebrow: "Work",
      title: "Work that <span class=\"text-gradient\">moves the needle.</span>",
      sub: "A taste of recent campaigns, brand systems and content across categories."
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's create <span class=\"text-gradient\">something iconic.</span>",
      sub: "Tell us about your business — we'll get back within 24 hours."
    }
  }
};

interface CMSContextType {
  data: CMSData;
  loading: boolean;
  isFirebaseConnected: boolean;
  saveSection: <K extends keyof CMSData>(key: K, value: CMSData[K]) => Promise<boolean>;
  isAuthenticated: boolean;
  login: (passcode: string) => Promise<boolean>;
  logout: () => void;
  updatePasscode: (newPasscode: string) => Promise<boolean>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CMSData>(DEFAULT_CMS_DATA);
  const [loading, setLoading] = useState(true);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sync with Firebase Realtime Database
  useEffect(() => {
    try {
      const siteDataRef = ref(database, "site-data");
      
      const unsubscribe = onValue(siteDataRef, (snapshot) => {
        setIsFirebaseConnected(true);
        if (snapshot.exists()) {
          const fetchedData = snapshot.val();
          
          // Perform structural merge to guarantee all keys exist (in case DB schema is partially filled)
          const mergedData = {
            ...DEFAULT_CMS_DATA,
            ...fetchedData,
            hero: { ...DEFAULT_CMS_DATA.hero, ...(fetchedData.hero || {}) },
            services: { ...DEFAULT_CMS_DATA.services, ...(fetchedData.services || {}) },
            industries: { ...DEFAULT_CMS_DATA.industries, ...(fetchedData.industries || {}) },
            whyUs: { ...DEFAULT_CMS_DATA.whyUs, ...(fetchedData.whyUs || {}) },
            portfolio: { ...DEFAULT_CMS_DATA.portfolio, ...(fetchedData.portfolio || {}) },
            process: { ...DEFAULT_CMS_DATA.process, ...(fetchedData.process || {}) },
            testimonials: { ...DEFAULT_CMS_DATA.testimonials, ...(fetchedData.testimonials || {}) },
            faq: { ...DEFAULT_CMS_DATA.faq, ...(fetchedData.faq || {}) },
            contact: { ...DEFAULT_CMS_DATA.contact, ...(fetchedData.contact || {}) },
            pageHeroes: { ...DEFAULT_CMS_DATA.pageHeroes, ...(fetchedData.pageHeroes || {}) }
          };
          
          setData(mergedData);
        } else {
          // If no data exists in RTDB, seed it with the default template
          set(siteDataRef, DEFAULT_CMS_DATA);
          setData(DEFAULT_CMS_DATA);
        }
        setLoading(false);
      }, (error) => {
        console.error("Firebase RTDB sync failed:", error);
        setIsFirebaseConnected(false);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (e) {
      console.error("Firebase database setup error:", e);
      setIsFirebaseConnected(false);
      setLoading(false);
    }
  }, []);

  // Handle local storage authentication verification on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("bs_admin_auth") === "true";
      setIsAuthenticated(isAuth);
    }
  }, []);

  // Save specific sections
  const saveSection = useCallback(async <K extends keyof CMSData>(key: K, value: CMSData[K]): Promise<boolean> => {
    try {
      const sectionRef = ref(database, `site-data/${key}`);
      await set(sectionRef, value);
      return true;
    } catch (e) {
      console.error(`Failed to save CMS section ${key}:`, e);
      return false;
    }
  }, []);

  // Login handler
  const login = useCallback(async (passcode: string): Promise<boolean> => {
    try {
      const passcodeRef = ref(database, "settings/adminPasscode");
      const snapshot = await get(passcodeRef);
      
      let dbPasscode = "admin123"; // Fallback passcode
      if (snapshot.exists()) {
        dbPasscode = snapshot.val();
      } else {
        // Seed default passcode if it doesn't exist
        await set(passcodeRef, dbPasscode);
      }

      if (passcode === dbPasscode) {
        setIsAuthenticated(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("bs_admin_auth", "true");
        }
        return true;
      }
      return false;
    } catch (e) {
      console.error("Login verification failed:", e);
      // Hard fallback if database access fails
      if (passcode === "admin123") {
        setIsAuthenticated(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("bs_admin_auth", "true");
        }
        return true;
      }
      return false;
    }
  }, []);

  // Logout handler
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("bs_admin_auth");
    }
  }, []);

  // Passcode updater
  const updatePasscode = useCallback(async (newPasscode: string): Promise<boolean> => {
    try {
      if (!newPasscode || newPasscode.trim().length < 4) return false;
      const passcodeRef = ref(database, "settings/adminPasscode");
      await set(passcodeRef, newPasscode.trim());
      return true;
    } catch (e) {
      console.error("Failed to update passcode in database:", e);
      return false;
    }
  }, []);

  return (
    <CMSContext.Provider
      value={{
        data,
        loading,
        isFirebaseConnected,
        saveSection,
        isAuthenticated,
        login,
        logout,
        updatePasscode,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}

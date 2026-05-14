import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "sw";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    nav_home: "Home",
    nav_services: "Services",
    nav_about: "About",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    nav_deploy: "Deploy",
    // Hero
    hero_badge: "Intelligence Driven Engineering",
    hero_title_1: "Welcome to",
    hero_title_2: "Digital Future",
    hero_desc: "MtaalamuTech integrates elite capital intelligence with high-fidelity system design. We don't just solve problems; we engineer paradigms.",
    // Cards
    card_intel_title: "Global Investment Advisory",
    card_intel_desc: "Institutional-grade market analysis and strategic capital management for the modern investor.",
    card_fx_title: "FX Intelligence & Education",
    card_fx_desc: "High-fidelity charting education and professional risk management protocols inspired by TradingView.",
    card_web_title: "Premium Computing",
    card_web_desc: "Building scalable, high-frequency digital architectures following strict W3C engineering standards.",
    card_media_title: "Visionary Media",
    card_media_desc: "Distinct visual identities and premium brand aesthetics designed for high-end market resonance.",
    card_logic_title: "Core Logic Ops",
    card_logic_desc: "Algorithmic excellence in Python, Java, and systems engineering for complex business challenges.",
    card_led_title: "LED Infrastructure",
    card_led_desc: "Precision Operation for high-resolution displays powered by NovaStar control systems.",
    // UI
    ui_view_specs: "View Specifications",
    ui_launch: "Launch Experience",
    ui_booking: "Secure Booking",
    ui_why_badge: "Dominance",
    ui_why_title: "Why we dominate",
    ui_client_stories: "Client Stories",
    ui_faq_badge: "Operations Manual",
    ui_faq_title: "Frequently Asked Questions",
    ui_cta_title: "Ready for Deployment?",
    ui_cta_desc: "Join the elite tier of innovators today.",
    ui_cta_btn: "Initialize Now",
    // FAQ
    faq_badge: "Operations Manual",
    faq_title: "Frequently Asked Questions",
    // Language Toggle
    toggle_lang: "Switch to Swahili"
  },
  sw: {
    // Navbar
    nav_home: "Nyumbani",
    nav_services: "Huduma",
    nav_about: "Kuhusu",
    nav_faq: "Maswali",
    nav_contact: "Mawasiliano",
    nav_deploy: "Anza Sasa",
    // Hero
    hero_badge: "Uhandisi Unaoendeshwa na Akili",
    hero_title_1: "Karibu kwenye",
    hero_title_2: "Mustakabali wa Kidijitali",
    hero_desc: "MtaalamuTech inaunganisha akili ya hali ya juu ya mtaji na muundo wa mifumo ya uaminifu wa juu. Hatutui tu matatizo; tunaunda mbinu mpya.",
    // Cards
    card_intel_title: "Ushauri wa Uwekezaji wa Kimataifa",
    card_intel_desc: "Uchambuzi wa soko wa kiwango cha taasisi na usimamizi wa mtaji wa kimkakati kwa mwekezaji wa kisasa.",
    card_fx_title: "Akili na Elimu ya FX",
    card_fx_desc: "Elimu ya chati za uaminifu wa juu na itifaki za kitaalamu za usimamizi wa hatari zilizochochewa na TradingView.",
    card_web_title: "Kompyuta ya Kulipia",
    card_web_desc: "Kujenga usanifu wa dijiti unaoweza kupanuka, wa masafa ya juu kufuatia viwango vikali vya uhandisi vya W3C.",
    card_media_title: "Media ya Maono",
    card_media_desc: "Utambulisho wa kuonekana tofauti na urembo wa chapa ya hali ya juu iliyoundwa kwa ajili ya soko la juu.",
    card_logic_title: "Operesheni za Mantiki",
    card_logic_desc: "Ubora wa kualgorithm katika Python, Java, na uhandisi wa mifumo kwa changamoto ngumu za biashara.",
    card_led_title: "Miundombinu ya LED",
    card_led_desc: "Uendeshaji wa usahihi kwa skrini za azimio la juu zinazoendeshwa na mifumo ya kudhibiti ya NovaStar.",
    // UI
    ui_view_specs: "Angalia Maelezo",
    ui_launch: "Anza Uzoefu",
    ui_booking: "Uhifadhi Salama",
    ui_why_badge: "Utawala",
    ui_why_title: "Kwa nini tunatawala",
    ui_client_stories: "Maudhui ya Wateja",
    ui_faq_badge: "Mwongozo wa Kazi",
    ui_faq_title: "Maswali Yanayoulizwa",
    ui_cta_title: "Uko Tayari?",
    ui_cta_desc: "Jiunge na kundi la wasomi wa ubunifu leo.",
    ui_cta_btn: "Anza Sasa",
    // FAQ
    faq_badge: "Mwongozo wa Operesheni",
    faq_title: "Maswali Yanayoulizwa Mara kwa Mara",
    // Language Toggle
    toggle_lang: "Badili kwenda Kiingereza"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

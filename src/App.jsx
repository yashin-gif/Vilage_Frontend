import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const translations = {
bn: {
home: "হোম",
biography: "গ্রামের পরিচিতি",
about: "আমাদের সম্পর্কে",
services: "গ্রামীণ সেবা",
news: "সর্বশেষ সংবাদ",
login: "লগইন",
register: "নিবন্ধন",
welcome: "আমাদের বগারচরে স্বাগতম",
subtitle:
"আমাদের শেকড়, আমাদের মানুষ, আমাদের ঐতিহ্য। গ্রামের মানুষের মধ্যে যোগাযোগ বৃদ্ধি এবং প্রয়োজনীয় তথ্য সবার কাছে পৌঁছে দেওয়াই আমাদের লক্ষ্য।",
explore: "গ্রাম সম্পর্কে জানুন",
servicesButton: "সেবাসমূহ দেখুন",
community: "আমাদের গ্রাম, আমাদের পরিচয়",
communityText:
"একটি ডিজিটাল প্ল্যাটফর্ম, যেখানে বগারচরের মানুষ ও গ্রামের প্রয়োজনীয় তথ্য থাকবে সবার হাতের নাগালে।",
quickServices: "গ্রামের প্রয়োজনীয় সেবা",
quickText: "আপনার প্রয়োজনীয় তথ্য সহজেই খুঁজে নিন।",
people: "গ্রামের মানুষ",
families: "পরিবারসমূহ",
blood: "রক্তদাতা",
institutions: "শিক্ষাপ্রতিষ্ঠান",
peopleDesc: "গ্রামের মানুষের পরিচিতি ও তথ্য জানুন।",
familiesDesc: "গ্রামের পরিবারগুলোর তথ্য দেখুন।",
bloodDesc: "জরুরি প্রয়োজনে রক্তদাতার তথ্য খুঁজুন।",
institutionsDesc: "স্কুল, কলেজ ও অন্যান্য প্রতিষ্ঠানের তথ্য।",
learnMore: "আরও জানুন",
location: "আমাদের অবস্থান",
locationText: "বগারচর, বকশীগঞ্জ, জামালপুর, বাংলাদেশ",
newsTitle: "গ্রামের সংবাদ ও ঘোষণা",
newsText: "গ্রামের গুরুত্বপূর্ণ খবর ও ঘোষণা এখানে প্রকাশ করা হবে।",
newsBadge: "গ্রামের আপডেট",
newsHeading: "বগারচরের খবর ও গুরুত্বপূর্ণ ঘোষণা",
newsDescription:
"গ্রামের বিভিন্ন খবর, সামাজিক কার্যক্রম ও গুরুত্বপূর্ণ বিজ্ঞপ্তি এক জায়গায় দেখুন।",
readNews: "সব সংবাদ দেখুন",
ctaTitle: "আপনার গ্রাম, আপনার অংশগ্রহণ",
ctaText:
"বগারচরের তথ্য সবার কাছে পৌঁছে দিতে আমাদের ডিজিটাল উদ্যোগের সঙ্গে যুক্ত হোন।",
join: "যুক্ত হোন",
footerText: "আমাদের গ্রাম, আমাদের পরিচয়।",
links: "দ্রুত লিংক",
contact: "গ্রামের ঠিকানা",
copyright: "সর্বস্বত্ব সংরক্ষিত।",
loginMessage: "লগইন পেজ পরবর্তী ধাপে তৈরি করা হবে।",
heroTag: "আমাদের প্রিয় বগারচর",
},
en: {
home: "Home",
biography: "Village Biography",
about: "About Us",
services: "Village Services",
news: "Latest News",
login: "Login",
register: "Register",
welcome: "Welcome to Bogarchar",
subtitle:
"Our roots, our people, our heritage. We aim to connect our community and make essential village information accessible to everyone.",
explore: "Explore Our Village",
servicesButton: "Explore Services",
community: "Our Village, Our Identity",
communityText:
"A digital platform that brings the people and essential information of Bogarchar closer together.",
quickServices: "Essential Village Services",
quickText: "Find the information you need, all in one place.",
people: "Village People",
families: "Families",
blood: "Blood Donors",
institutions: "Institutions",
peopleDesc: "Discover information about local residents.",
familiesDesc: "Explore information about village families.",
bloodDesc: "Find blood donor information for emergencies.",
institutionsDesc: "Information about schools, colleges and more.",
learnMore: "Learn More",
location: "Our Location",
locationText: "Bogarchar, Bakshiganj, Jamalpur, Bangladesh",
newsTitle: "Village News & Announcements",
newsText: "Important village news and announcements will be published here.",
newsBadge: "Village Updates",
newsHeading: "News and Important Announcements",
newsDescription:
"Stay informed about local news, community activities and important notices.",
readNews: "View All News",
ctaTitle: "Your Village, Your Participation",
ctaText:
"Join our digital initiative to help make Bogarchar's information accessible to everyone.",
join: "Join Us",
footerText: "Our Village, Our Identity.",
links: "Quick Links",
contact: "Village Location",
copyright: "All rights reserved.",
loginMessage: "The login page will be created in the next step.",
heroTag: "Our Beloved Bogarchar",
},
};

const services = [
{
icon: "👥",
title: "people",
desc: "peopleDesc",
color: "bg-blue-50 text-blue-700",
href: "#people",
},
{
icon: "🏡",
title: "families",
desc: "familiesDesc",
color: "bg-amber-50 text-amber-700",
href: "#families",
},
{
icon: "🩸",
title: "blood",
desc: "bloodDesc",
color: "bg-red-50 text-red-700",
href: "#blood",
},
{
icon: "🏫",
title: "institutions",
desc: "institutionsDesc",
color: "bg-purple-50 text-purple-700",
href: "#institutions",
},
];

function App() {
const [language, setLanguage] = useState(
() => localStorage.getItem("village-language") || "bn"
);
const [menuOpen, setMenuOpen] = useState(false);
const [notice, setNotice] = useState("");

const t = translations[language];

const changeLanguage = () => {
const nextLanguage = language === "bn" ? "en" : "bn";
setLanguage(nextLanguage);
localStorage.setItem("village-language", nextLanguage);
};

const showNotice = (message) => {
setNotice(message);
window.setTimeout(() => setNotice(""), 3000);
};

const navLinks = [
{ label: t.home, href: "#home" },
{ label: t.biography, href: "#biography" },
{ label: t.about, href: "#about" },
{ label: t.services, href: "#services" },
{ label: t.news, href: "#news" },
];

return ( <div className="min-h-screen overflow-x-hidden bg-white text-slate-800">
{/* Navbar */} <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md"> <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"> <a href="#home" className="flex items-center gap-3"> <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-700 text-2xl shadow-sm">
🏡 </div>

```
        <div>
          <h1 className="text-lg font-extrabold leading-tight text-green-800 sm:text-xl">
            Digital Village
          </h1>
          <p className="text-xs font-medium text-slate-500">
            Bogarchar, Jamalpur
          </p>
        </div>
      </a>

      <nav className="hidden items-center gap-6 lg:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-semibold text-slate-600 transition hover:text-green-700"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-2 sm:flex">
        <button
          onClick={changeLanguage}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-green-600 hover:text-green-700"
          aria-label="Change language"
        >
          {language === "bn" ? "EN" : "বাংলা"}
        </button>

        <button
          onClick={() => showNotice(t.loginMessage)}
          className="rounded-xl px-4 py-2.5 text-sm font-bold text-green-800 transition hover:bg-green-50"
        >
          {t.login}
        </button>

        <button
          onClick={() => showNotice(t.loginMessage)}
          className="rounded-xl bg-green-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-800"
        >
          {t.register}
        </button>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-2xl text-slate-700 sm:hidden"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "×" : "☰"}
      </button>
    </div>

    {menuOpen && (
      <div className="border-t border-slate-100 bg-white px-4 py-4 sm:hidden">
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-green-50 hover:text-green-800"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={changeLanguage}
            className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold"
          >
            {language === "bn" ? "English" : "বাংলা"}
          </button>

          <button
            onClick={() => {
              setMenuOpen(false);
              showNotice(t.loginMessage);
            }}
            className="rounded-xl bg-green-700 px-3 py-3 text-sm font-bold text-white"
          >
            {t.login}
          </button>
        </div>
      </div>
    )}
  </header>

  <main>
    {/* Hero */}
    <section
      id="home"
      className="relative isolate overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-100"
    >
      <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-green-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-2 text-sm font-semibold text-green-800 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-600" />
            {t.heroTag}
          </div>

          <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {t.welcome}
            <span className="mt-2 block text-green-700">
              {language === "bn"
                ? "আমাদের গ্রাম, আমাদের পরিচয়।"
                : "Our Village, Our Identity."}
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            {t.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#biography"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-0.5 hover:bg-green-800"
            >
              {t.explore}
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 transition hover:border-green-300 hover:bg-green-50"
            >
              {t.servicesButton}
            </a>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <span className="text-green-700">✓</span>
              {language === "bn" ? "সবার জন্য তথ্য" : "Information for everyone"}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-700">✓</span>
              {language === "bn" ? "সহজ ব্যবহার" : "Easy to use"}
            </span>
          </div>
        </div>

        {/* Village illustration */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-green-200/40 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-2xl shadow-green-900/10">
            <div className="relative flex min-h-[330px] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-sky-100 via-green-50 to-green-100 p-5 sm:min-h-[400px] sm:p-8">
              <div className="absolute right-8 top-8 h-14 w-14 rounded-full bg-amber-300 shadow-lg shadow-amber-300/30" />

              <div className="relative z-10">
                <span className="rounded-full bg-white/80 px-3 py-2 text-xs font-bold text-green-800 shadow-sm">
                  📍 Bogarchar, Jamalpur
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-36 bg-green-300/60 [clip-path:polygon(0_40%,25%_0,50%_45%,75%_10%,100%_35%,100%_100%,0_100%)]" />

              <div className="absolute inset-x-0 bottom-0 h-24 bg-green-600/70 [clip-path:polygon(0_25%,35%_65%,65%_15%,100%_40%,100%_100%,0_100%)]" />

              <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-center gap-3 sm:gap-5">
                <div className="relative mb-12">
                  <div className="mx-auto h-14 w-2 bg-amber-800" />
                  <div className="absolute -top-8 left-1/2 h-16 w-20 -translate-x-1/2 rounded-t-full bg-green-800 sm:w-24" />
                </div>

                <div className="relative mb-8 w-36 sm:w-44">
                  <div className="absolute -top-7 left-1/2 h-0 w-0 -translate-x-1/2 border-b-[32px] border-l-[78px] border-r-[78px] border-b-rose-700 border-l-transparent border-r-transparent sm:border-l-[96px] sm:border-r-[96px]" />
                  <div className="relative h-24 rounded-t-sm border-x-4 border-t-4 border-amber-100 bg-amber-50 shadow-lg">
                    <div className="absolute left-3 top-5 h-8 w-7 border-2 border-sky-300 bg-sky-100" />
                    <div className="absolute right-3 top-5 h-8 w-7 border-2 border-sky-300 bg-sky-100" />
                    <div className="absolute bottom-0 left-1/2 h-12 w-8 -translate-x-1/2 rounded-t-full bg-amber-800" />
                  </div>
                </div>

                <div className="relative mb-12">
                  <div className="mx-auto h-12 w-2 bg-amber-800" />
                  <div className="absolute -top-7 left-1/2 h-14 w-16 -translate-x-1/2 rounded-t-full bg-green-700 sm:w-20" />
                </div>
              </div>

              <div className="relative z-20 mt-auto rounded-2xl border border-white/80 bg-white/90 p-4 shadow-lg backdrop-blur sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                  {language === "bn" ? "আমাদের ঠিকানা" : "OUR LOCATION"}
                </p>
                <p className="mt-1 font-bold text-slate-800 sm:text-lg">
                  {t.locationText}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -left-2 top-1/3 rounded-2xl border border-green-100 bg-white px-4 py-3 shadow-lg sm:-left-8">
            <span className="text-xl">🌾</span>
            <span className="ml-2 text-sm font-bold text-slate-700">
              {language === "bn" ? "সবুজের গ্রাম" : "A Green Village"}
            </span>
          </div>
        </div>
      </div>
    </section>

    {/* Location strip */}
    <section className="border-y border-green-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:px-8">
        {[
          {
            icon: "📍",
            label: language === "bn" ? "গ্রাম" : "Village",
            value: "বগারচর",
            en: "Bogarchar",
          },
          {
            icon: "🏘️",
            label: language === "bn" ? "উপজেলা" : "Upazila",
            value: "বকশীগঞ্জ",
            en: "Bakshiganj",
          },
          {
            icon: "🗺️",
            label: language === "bn" ? "জেলা" : "District",
            value: "জামালপুর",
            en: "Jamalpur",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-center gap-3 rounded-2xl bg-green-50/70 px-4 py-4 sm:justify-start"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
              {item.icon}
            </span>
            <div>
              <p className="text-xs font-medium text-slate-500">{item.label}</p>
              <p className="font-extrabold text-slate-800">
                {language === "bn" ? item.value : item.en}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Biography */}
    <section id="biography" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div className="relative">
          <div className="rounded-3xl bg-gradient-to-br from-green-100 to-emerald-50 p-6 sm:p-10">
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-white/80 bg-white/70 p-6 text-center">
              <span className="text-6xl">🌿</span>
              <h3 className="mt-4 text-2xl font-black text-green-800">
                {language === "bn" ? "আমাদের বগারচর" : "Our Bogarchar"}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Bogarchar, Bakshiganj, Jamalpur
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-green-700">
            {language === "bn" ? "গ্রামের পরিচিতি" : "VILLAGE BIOGRAPHY"}
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
            {t.community}
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            {t.communityText}
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            {language === "bn"
              ? "এই ওয়েবসাইটের মাধ্যমে গ্রামের মানুষ, পরিবার, শিক্ষাপ্রতিষ্ঠান, রক্তদাতা ও গুরুত্বপূর্ণ তথ্য একটি জায়গায় তুলে ধরার পরিকল্পনা রয়েছে।"
              : "This website aims to bring together information about residents, families, educational institutions, blood donors and other important village resources."}
          </p>
          <a
            href="#about"
            className="mt-6 inline-flex items-center gap-2 font-bold text-green-800 transition hover:gap-3"
          >
            {t.learnMore} <span>→</span>
          </a>
        </div>
      </div>
    </section>

    {/* Services */}
    <section id="services" className="scroll-mt-24 bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-green-700">
            {language === "bn" ? "এক জায়গায় প্রয়োজনীয় তথ্য" : "ALL IN ONE PLACE"}
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
            {t.quickServices}
          </h2>
          <p className="mt-4 leading-7 text-slate-600">{t.quickText}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <a
              key={service.title}
              href={service.href}
              className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/5"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${service.color}`}>
                {service.icon}
              </div>
              <h3 className="mt-5 text-xl font-extrabold text-slate-800">
                {t[service.title]}
              </h3>
              <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">
                {t[service.desc]}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-green-700 transition group-hover:gap-3">
                {t.learnMore} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* About */}
    <section id="about" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-green-800">
        <div className="grid items-center gap-8 p-7 sm:p-10 md:grid-cols-2 md:p-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-green-200">
              {language === "bn" ? "আমাদের লক্ষ্য" : "OUR MISSION"}
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
              {language === "bn"
                ? "প্রযুক্তির মাধ্যমে গ্রামের মানুষের পাশে"
                : "Supporting Our Community Through Technology"}
            </h2>
          </div>
          <div>
            <p className="leading-8 text-green-50/90">{t.communityText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                language === "bn" ? "সঠিক তথ্য" : "Reliable Information",
                language === "bn" ? "মানুষের সংযোগ" : "Community Connection",
                language === "bn" ? "সহজ সেবা" : "Accessible Services",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* News */}
    <section id="news" className="scroll-mt-24 bg-green-50/70 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-green-700">
              {t.newsBadge}
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              {t.newsTitle}
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              {t.newsDescription}
            </p>
          </div>
          <button
            onClick={() => showNotice(t.newsText)}
            className="self-start rounded-xl border border-green-200 bg-white px-5 py-3 text-sm font-bold text-green-800 transition hover:bg-green-100 sm:self-auto"
          >
            {t.readNews} →
          </button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: "📢",
              tag: language === "bn" ? "ঘোষণা" : "Announcement",
            },
            {
              icon: "🤝",
              tag: language === "bn" ? "সামাজিক কার্যক্রম" : "Community",
            },
            {
              icon: "🌱",
              tag: language === "bn" ? "গ্রামের উন্নয়ন" : "Development",
            },
          ].map((item) => (
            <article
              key={item.tag}
              className="rounded-2xl border border-green-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                {item.icon}
              </span>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-green-700">
                {item.tag}
              </p>
              <h3 className="mt-2 text-lg font-extrabold text-slate-800">
                {t.newsHeading}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {t.newsText}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-green-100 bg-gradient-to-r from-white to-green-50 p-8 text-center sm:p-12">
        <div className="text-4xl">💚</div>
        <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
          {t.ctaTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
          {t.ctaText}
        </p>
        <button
          onClick={() => showNotice(t.loginMessage)}
          className="mt-7 rounded-xl bg-green-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800"
        >
          {t.join} →
        </button>
      </div>
    </section>
  </main>

  {/* Footer */}
  <footer className="bg-slate-950 text-white">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-2xl">
            🏡
          </span>
          <span className="text-xl font-extrabold">Digital Village</span>
        </a>
        <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
          {t.footerText}
        </p>
      </div>

      <div>
        <h3 className="font-bold text-white">{t.links}</h3>
        <div className="mt-4 flex flex-col items-start gap-3 text-sm text-slate-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-green-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-white">{t.contact}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-400">
          📍 Bogarchar
          <br />
          Bakshiganj, Jamalpur
          <br />
          Bangladesh
        </p>
      </div>
    </div>

    <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} Digital Village — Bogarchar. {t.copyright}
    </div>
  </footer>

  {/* Notification */}
  {notice && (
    <div
      role="status"
      className="fixed bottom-5 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl bg-slate-900 px-5 py-4 text-center text-sm font-medium text-white shadow-2xl"
    >
      {notice}
    </div>
  )}
</div>
);
}

export default App;

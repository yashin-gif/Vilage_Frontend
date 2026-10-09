export default function About() {
return ( <div className="min-h-screen bg-green-50 px-4 py-16"> <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm sm:p-12"> <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl">
🏡 </div>


    <p className="mt-6 text-sm font-bold uppercase tracking-widest text-green-700">
      About Digital Village
    </p>

    <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
      আমাদের সম্পর্কে
    </h1>

    <p className="mt-5 text-base leading-8 text-slate-600">
      Digital Village হলো বগারচর গ্রামের জন্য একটি ডিজিটাল
      প্ল্যাটফর্ম। এর উদ্দেশ্য হলো গ্রামের মানুষের প্রয়োজনীয়
      তথ্য সহজে খুঁজে পাওয়ার সুযোগ তৈরি করা।
    </p>

    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl bg-green-50 p-5">
        <span className="text-2xl">🤝</span>
        <h2 className="mt-3 text-lg font-bold text-slate-800">
          মানুষের সংযোগ
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          গ্রামের মানুষকে প্রয়োজনীয় তথ্যের মাধ্যমে কাছাকাছি আনা।
        </p>
      </div>

      <div className="rounded-2xl bg-blue-50 p-5">
        <span className="text-2xl">📚</span>
        <h2 className="mt-3 text-lg font-bold text-slate-800">
          প্রয়োজনীয় তথ্য
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          গ্রামের পরিচিতি, পরিবার, শিক্ষাপ্রতিষ্ঠান ও অন্যান্য
          প্রয়োজনীয় তথ্য এক জায়গায় তুলে ধরা।
        </p>
      </div>
    </div>

    <a
      href="/"
      className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800"
    >
      ← হোম পেজে ফিরে যান
    </a>
  </div>
</div>

);
}

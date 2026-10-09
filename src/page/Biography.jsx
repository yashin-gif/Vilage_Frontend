export default function Biography() {
  return (
    <div className="min-h-screen bg-green-50 px-4 py-16">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm sm:p-12">
        <h1 className="text-3xl font-black text-green-800 sm:text-4xl">
          গ্রামের পরিচিতি
        </h1>

        <p className="mt-4 leading-8 text-slate-600">
          বগারচর আমাদের প্রিয় গ্রাম। এই পেজে গ্রামের ইতিহাস, ঐতিহ্য,
          মানুষের জীবনযাপন এবং গুরুত্বপূর্ণ তথ্য তুলে ধরা হবে।
        </p>

        <p className="mt-4 leading-8 text-slate-600">
          আমাদের লক্ষ্য হলো গ্রামের পরিচিতি ও প্রয়োজনীয় তথ্য একটি
          ডিজিটাল প্ল্যাটফর্মে সবার কাছে পৌঁছে দেওয়া।
        </p>

        <a
          href="/"
          className="mt-8 inline-block rounded-xl bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800"
        >
          ← হোম পেজে ফিরে যান
        </a>
      </div>
    </div>
  );
}
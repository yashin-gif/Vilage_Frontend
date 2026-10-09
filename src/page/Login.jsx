import { useState } from "react";

export default function Login() {
const [showPassword, setShowPassword] = useState(false);

const handleSubmit = (event) => {
event.preventDefault();
alert("লগইন ফিচারটি পরবর্তী ধাপে Backend-এর সঙ্গে যুক্ত করা হবে।");
};

return ( <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100 px-4 py-12"> <div className="w-full max-w-md"> <div className="mb-6 text-center"> <a href="/" className="inline-flex items-center gap-3"> <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-700 text-3xl shadow-lg">
🏡 </span> <span className="text-left"> <span className="block text-2xl font-black text-green-800">
Digital Village </span> <span className="text-sm text-slate-500">
Bogarchar, Jamalpur </span> </span> </a> </div>

```
    <div className="rounded-3xl border border-white bg-white p-6 shadow-xl shadow-green-900/5 sm:p-9">
      <div className="text-center">
        <h1 className="text-3xl font-black text-slate-900">
          স্বাগতম!
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          আপনার অ্যাকাউন্টে লগইন করে এগিয়ে যান।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            ইমেইল ঠিকানা
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="আপনার ইমেইল লিখুন"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="password"
              className="text-sm font-bold text-slate-700"
            >
              পাসওয়ার্ড
            </label>

            <a
              href="/forgot-password"
              className="text-xs font-bold text-green-700 hover:text-green-900"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </a>
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-20 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-bold text-green-700 hover:bg-green-50"
            >
              {showPassword ? "লুকান" : "দেখুন"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-green-700 px-5 py-3.5 font-bold text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-0.5 hover:bg-green-800"
        >
          লগইন করুন →
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-500">
        অ্যাকাউন্ট নেই?{" "}
        <a
          href="/register"
          className="font-bold text-green-700 hover:text-green-900"
        >
          নিবন্ধন করুন
        </a>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5 text-center">
        <a
          href="/"
          className="text-sm font-semibold text-slate-500 transition hover:text-green-700"
        >
          ← হোম পেজে ফিরে যান
        </a>
      </div>
    </div>

    <p className="mt-6 text-center text-xs text-slate-400">
      © {new Date().getFullYear()} Digital Village — Bogarchar
    </p>
  </div>
</div>


);
}

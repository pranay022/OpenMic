'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-zinc-950 text-white min-h-[calc(100vh-80px)]">
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-tight bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Unfiltered Feedback. <br className="hidden md:block" /> Verified Security.
          </h1>
          <p className="mt-8 text-zinc-400 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
            OpenMic is a trusted platform to receive honest, anonymous feedback from your community. We verify all accounts to maintain a secure and professional environment.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button className="bg-white text-black hover:bg-zinc-200 h-14 px-10 text-lg font-bold rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95">
                Join OpenMic
              </Button>
            </Link>
          </div>
          
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl backdrop-blur-sm">
              <h3 className="text-white font-bold mb-2">Anonymous Senders</h3>
              <p className="text-zinc-500 text-sm">We prioritize the anonymity of your feedback senders to encourage pure and truthful insights.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl backdrop-blur-sm">
              <h3 className="text-white font-bold mb-2">Secure Verification</h3>
              <p className="text-zinc-500 text-sm">Every message board is linked to a verified email, ensuring a legitimate and safe community space.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl backdrop-blur-sm">
              <h3 className="text-white font-bold mb-2">Real-time Insights</h3>
              <p className="text-zinc-500 text-sm">Receive feedback instantly and manage your community's voice directly from your secure dashboard.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center p-8 bg-zinc-950 border-t border-zinc-900 text-zinc-500 text-sm">
        © {new Date().getFullYear()} OpenMic. Built for honesty.
      </footer>
    </>
  );
}

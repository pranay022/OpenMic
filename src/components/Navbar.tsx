'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';

function Navbar() {
  const { data: session } = useSession();
  const user : User = session?.user;

  return (
    <nav className="p-4 md:p-6 border-b border-zinc-900 bg-zinc-950 text-white backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <div className="w-14 h-14 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
            <img src="/logo.png" alt="OpenMic Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-3xl font-bold tracking-tighter">OpenMic</span>
        </Link>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          {session ? (
            <>
              <span className="text-zinc-400 text-sm font-medium">
                {user.username || user.email}
              </span>
              <Button 
                onClick={() => signOut()} 
                className="bg-white text-black hover:bg-zinc-200 font-semibold rounded-full px-6 transition-all" 
                variant="default"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button 
                className="bg-white text-black hover:bg-zinc-200 font-semibold rounded-full px-6 transition-all" 
                variant="default"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/signInSchema';
import { Home, ChevronLeft, Loader2, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      setIsSubmitting(false);
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    }

    if (result?.url) {
      router.replace('/dashboard');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-950 px-4 relative">
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
      >
        <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 group-hover:border-zinc-700">
          <ChevronLeft className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium">Home</span>
      </Link>

      <div className="w-full max-w-sm space-y-8">
        <div className="text-center flex flex-col items-center">
          <div className="w-14 h-14 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
            <img src="/logo.png" alt="OpenMic Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white focus:outline-none">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in to your OpenMic account
          </p>
        </div>

        <div className="p-8 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl backdrop-blur-xl shadow-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Email or Username</FormLabel>
                    <Input 
                      {...field} 
                      className="bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-700"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Password</FormLabel>
                    <div className="relative">
                      <Input 
                        type={showPassword ? 'text' : 'password'} 
                        {...field} 
                        className="bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-700 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                className="w-full bg-white text-black hover:bg-zinc-200 transition-colors h-11 font-semibold rounded-xl" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Form>
        </div>

        <p className="text-center text-sm text-zinc-500">
          Not a member yet?{' '}
          <Link href="/sign-up" className="text-zinc-200 hover:text-white transition-colors font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

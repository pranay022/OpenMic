'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';
import { Home, ChevronLeft } from 'lucide-react';
import Image from 'next/image';

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: 'default',
      });
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to sent message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4 py-12 relative">
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
      >
        <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 group-hover:border-zinc-700">
          <ChevronLeft className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium">Home</span>
      </Link>

      <div className="w-full max-w-2xl space-y-12">
        <div className="text-center flex flex-col items-center space-y-2">
          <div className="w-14 h-14 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
            <Image src="/logo.png" alt="OpenMic Logo" width={56} height={56} className="object-cover" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Send Feedback
          </h1>
          <p className="text-zinc-500 font-medium">
            Give <span className="text-zinc-300">@{username}</span> honest, anonymous feedback
          </p>
        </div>

        <div className="p-8 bg-zinc-900/40 border border-zinc-800/50 rounded-3xl backdrop-blur-xl shadow-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write your anonymous feedback here..."
                        className="resize-none bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-700 min-h-[120px] rounded-2xl p-4 text-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  disabled={isLoading || !messageContent}
                  className="bg-white text-black hover:bg-zinc-200 font-bold rounded-xl px-12 h-12 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Feedback'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>


        <div className="pt-12 border-t border-zinc-900 text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Want your own feedback board?</h3>
            <p className="text-zinc-500">Create an account and start receiving anonymous feedback today.</p>
          </div>
          <Link href={'/sign-up'} className="inline-block">
            <Button className="bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 font-semibold rounded-xl px-8 h-12 transition-all">
              Create My Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

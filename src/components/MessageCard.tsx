'use client'

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { Message } from '@/model/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ApiResponse } from '@/types/ApiResponse';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );
      toast({
        title: response.data.message,
      });
      onMessageDelete(message._id);

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to delete message',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog>
      <Card className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl backdrop-blur-sm transition-all hover:border-zinc-700/50 group">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <DialogTrigger asChild>
              <div className="space-y-3 flex-grow cursor-pointer group-hover:opacity-80 transition-opacity">
                <p className="text-zinc-100 text-[15px] leading-relaxed font-medium line-clamp-3">
                  {message.content}
                </p>
                {message.content.length > 100 && (
                  <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">
                    Click to expand message
                  </span>
                )}
              </div>
            </DialogTrigger>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 transition-colors shrink-0 rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Feedback?</AlertDialogTitle>
                  <AlertDialogDescription className="text-zinc-400">
                    This action cannot be undone. This will permanently remove
                    this feedback from your dashboard.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteConfirm}
                    className="bg-rose-600 text-white hover:bg-rose-700 font-semibold"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
            {dayjs(message.createdAt).format('MMM D, YYYY • h:mm A')}
          </div>
        </CardHeader>
      </Card>

      <DialogContent className="bg-zinc-950 border-zinc-800 rounded-3xl max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest pt-2">
            Feedback received {dayjs(message.createdAt).format('MMM D, YYYY [at] h:mm A')}
          </div>
        </DialogHeader>
        <div className="py-6">
          <p className="text-zinc-100 text-lg leading-relaxed font-medium whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

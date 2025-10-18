'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface UsernameSetupProps {
  onSubmit: (username: string) => void;
}

export function UsernameSetup({ onSubmit }: UsernameSetupProps) {
  const [username, setUsername] = useState<string>('');

  const handleSubmit = (): void => {
    if (username.trim().length < 2) {
      toast.error('Username must be at least 2 characters long');
      return;
    }
    if (username.trim().length > 20) {
      toast.error('Username must be less than 20 characters');
      return;
    }
    onSubmit(username.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-black mb-4 animate-bounce">
            🔍 Word Search Fun
          </h1>
          <p className="text-lg text-gray-700">
            Welcome to the ultimate word puzzle adventure!
          </p>
        </div>

        <Card className="shadow-2xl border-2 border-purple-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-black">Create Your Profile</CardTitle>
            <CardDescription className="text-gray-600">
              Enter a username to start your word search journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-black">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-lg border-2 border-gray-300 focus:border-purple-500"
                maxLength={20}
              />
              <p className="text-xs text-gray-500">
                {username.length}/20 characters
              </p>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
              disabled={username.trim().length < 2}
            >
              Start Playing
            </Button>

            <div className="text-center text-sm text-gray-600 mt-4">
              <p>✨ Find hidden words in grids</p>
              <p>🎯 Choose from 10+ categories</p>
              <p>🏆 Track your scores and share</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

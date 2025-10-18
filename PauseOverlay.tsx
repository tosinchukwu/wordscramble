'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, LogOut } from 'lucide-react';

interface PauseOverlayProps {
  onResume: () => void;
  onExit: () => void;
}

export function PauseOverlay({ onResume, onExit }: PauseOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-md shadow-2xl border-2 border-purple-300">
        <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl">Game Paused</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <p className="text-center text-gray-700 text-lg">
            Take a break! Your progress is saved.
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={onResume}
              className="w-full text-lg py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold"
            >
              <Play className="w-5 h-5 mr-2" />
              Resume Game
            </Button>
            
            <Button
              onClick={onExit}
              variant="outline"
              className="w-full text-lg py-6 border-2 border-red-300 hover:bg-red-50 text-red-600 font-bold"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Exit to Menu
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600 mt-6">
            <p>💡 Tip: Words can be horizontal, vertical, or diagonal!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

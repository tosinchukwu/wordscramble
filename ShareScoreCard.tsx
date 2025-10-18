'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Share2, Copy, Check, Edit2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { sdk } from '@farcaster/miniapp-sdk';
import type { Difficulty } from '@/app/page';

interface ShareScoreCardProps {
  username: string;
  category: string;
  score: number;
  time: string;
  wordsFound: number;
  totalWords: number;
  difficulty: Difficulty;
  onClose: () => void;
}

export function ShareScoreCard({
  username,
  category,
  score,
  time,
  wordsFound,
  totalWords,
  difficulty,
  onClose
}: ShareScoreCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [customMessage, setCustomMessage] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);

  // Get the game link (will be the deployed app URL)
  const gameLink = typeof window !== 'undefined' ? window.location.origin : 'https://word-search-fun.vercel.app';

  // Message templates with engaging prompts
  const messageTemplates = [
    `🔍 Word Search Challenge!

👤 ${username}
📚 ${category.charAt(0).toUpperCase() + category.slice(1)} (${difficulty.toUpperCase()})
🏆 Score: ${score} points
⏱️ Time: ${time}
✅ Found: ${wordsFound}/${totalWords} words

Can you beat my score? 🎯
Play now: ${gameLink}`,

    `💪 Just crushed a ${difficulty} ${category} word search!

Final Stats:
• Score: ${score} pts 🏆
• Time: ${time} ⚡
• Words: ${wordsFound}/${totalWords} ✅

Think you're faster? Prove it! 🔥
${gameLink}`,

    `🎮 ${username} here with a challenge!

I just scored ${score} points in ${time} on the ${difficulty} ${category} puzzle! Found all ${wordsFound}/${totalWords} words 🎯

Your turn! Can you do better? 👀
${gameLink}`,

    `🌟 New Personal Best!

Category: ${category} (${difficulty})
Score: ${score} 🏆
Time: ${time} ⏱️
Words: ${wordsFound}/${totalWords} ✅

Join me and test your word skills! 🧠
${gameLink}`
  ];

  useEffect(() => {
    setCustomMessage(messageTemplates[selectedTemplate]);
  }, [selectedTemplate]);

  // Success animation
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleShareToFarcaster = async (): Promise<void> => {
    try {
      const messageToShare = isEditing ? customMessage : messageTemplates[selectedTemplate];
      const result = await sdk.actions.openUrl(`https://warpcast.com/~/compose?text=${encodeURIComponent(messageToShare)}`);
      
      if (result.isExternal) {
        toast.success('Opening Farcaster...');
      } else {
        setShowSuccess(true);
        toast.success('Shared to Farcaster! 🎉', {
          description: 'Your score has been shared successfully!'
        });
      }
    } catch (error) {
      console.error('Failed to share to Farcaster:', error);
      toast.error('Failed to share to Farcaster');
    }
  };

  const handleCopyToClipboard = (): void => {
    const messageToShare = isEditing ? customMessage : messageTemplates[selectedTemplate];
    navigator.clipboard.writeText(messageToShare);
    setShowSuccess(true);
    toast.success('Copied to clipboard! 📋', {
      description: 'Paste your score anywhere you like!'
    });
  };

  const getDifficultyEmoji = (diff: Difficulty): string => {
    switch (diff) {
      case 'easy': return '😊';
      case 'medium': return '🤔';
      case 'hard': return '🔥';
      default: return '🎮';
    }
  };

  const getDifficultyColor = (diff: Difficulty): string => {
    switch (diff) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-orange-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-black flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            Share Your Score
          </DialogTitle>
          <DialogDescription>
            Show off your word search skills and challenge your friends!
          </DialogDescription>
        </DialogHeader>

        {/* Success Animation Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-green-500/20 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg animate-in fade-in zoom-in duration-300">
            <div className="bg-white p-6 rounded-full shadow-2xl">
              <Check className="w-12 h-12 text-green-500 animate-in zoom-in duration-500" />
            </div>
          </div>
        )}

        {/* Score Card Preview */}
        <Card className="border-2 border-purple-200 overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
            <CardTitle className="text-center text-2xl">
              🔍 Word Search Fun
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="text-center space-y-2">
              <p className="text-lg font-bold text-black flex items-center justify-center gap-2">
                👤 {username}
              </p>
              <p className="text-gray-700 capitalize flex items-center justify-center gap-2">
                📚 {category} Category
              </p>
              <div className={`text-sm font-semibold ${getDifficultyColor(difficulty)} flex items-center justify-center gap-1`}>
                {getDifficultyEmoji(difficulty)} {difficulty.toUpperCase()} MODE
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{score}</p>
                <p className="text-sm text-gray-600">Score</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-600">{time}</p>
                <p className="text-sm text-gray-600">Time</p>
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
              <p className="text-lg font-bold text-green-700">
                ✅ {wordsFound}/{totalWords} Words Found
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {wordsFound === totalWords ? 'Perfect Score! 🎉' : `${totalWords - wordsFound} remaining`}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Message Templates */}
        {!isEditing && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-black">Choose a message style:</label>
            <div className="grid grid-cols-2 gap-2">
              {['Classic', 'Competitive', 'Friendly', 'Excited'].map((style, index) => (
                <Button
                  key={index}
                  onClick={() => setSelectedTemplate(index)}
                  variant={selectedTemplate === index ? 'default' : 'outline'}
                  size="sm"
                  className={selectedTemplate === index ? 'bg-purple-600 text-white' : ''}
                >
                  {style}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Message Preview/Edit */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-black">
              {isEditing ? 'Edit your message:' : 'Preview:'}
            </label>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="ghost"
              size="sm"
              className="text-purple-600 hover:text-purple-700"
            >
              <Edit2 className="w-4 h-4 mr-1" />
              {isEditing ? 'Use Template' : 'Customize'}
            </Button>
          </div>
          
          {isEditing ? (
            <Textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
              placeholder="Write your custom message..."
            />
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 whitespace-pre-wrap text-sm font-mono max-h-[200px] overflow-y-auto">
              {messageTemplates[selectedTemplate]}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            onClick={handleShareToFarcaster}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share to Farcaster
          </Button>
          
          <Button
            onClick={handleCopyToClipboard}
            variant="outline"
            className="w-full border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50"
            size="lg"
          >
            <Copy className="w-5 h-5 mr-2" />
            Copy to Clipboard
          </Button>

          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full"
          >
            Close
          </Button>
        </div>

        {/* Game Link Display */}
        <div className="text-center pt-2 border-t">
          <p className="text-xs text-gray-500">
            Game Link: <span className="text-purple-600 font-mono">{gameLink}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

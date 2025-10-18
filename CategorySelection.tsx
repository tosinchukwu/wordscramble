'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings } from 'lucide-react';

interface CategorySelectionProps {
  username: string;
  onSelectCategory: (category: string) => void;
  onOpenSettings: () => void;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  puzzleCount: number;
  gradient: string;
}

const categories: Category[] = [
  {
    id: 'nature',
    name: 'Nature',
    icon: '🌿',
    description: 'Discover words about plants, animals, and the environment',
    puzzleCount: 50,
    gradient: 'from-green-400 to-emerald-600'
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    description: 'Explore tech terms, gadgets, and innovations',
    puzzleCount: 50,
    gradient: 'from-blue-400 to-indigo-600'
  },
  {
    id: 'history',
    name: 'History',
    icon: '📜',
    description: 'Journey through historical events and figures',
    puzzleCount: 50,
    gradient: 'from-amber-400 to-orange-600'
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
    description: 'Find words from various sports and games',
    puzzleCount: 50,
    gradient: 'from-red-400 to-rose-600'
  },
  {
    id: 'food',
    name: 'Food',
    icon: '🍕',
    description: 'Delicious words about cuisines and ingredients',
    puzzleCount: 50,
    gradient: 'from-yellow-400 to-orange-600'
  },
  {
    id: 'animals',
    name: 'Animals',
    icon: '🦁',
    description: 'Wildlife, pets, and creatures from around the world',
    puzzleCount: 50,
    gradient: 'from-purple-400 to-pink-600'
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    description: 'Scientific terms, discoveries, and concepts',
    puzzleCount: 50,
    gradient: 'from-cyan-400 to-blue-600'
  },
  {
    id: 'music',
    name: 'Music',
    icon: '🎵',
    description: 'Musical instruments, genres, and artists',
    puzzleCount: 50,
    gradient: 'from-pink-400 to-purple-600'
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: '✈️',
    description: 'Countries, cities, and landmarks worldwide',
    puzzleCount: 50,
    gradient: 'from-teal-400 to-cyan-600'
  },
  {
    id: 'art',
    name: 'Art',
    icon: '🎨',
    description: 'Artists, styles, and creative expressions',
    puzzleCount: 50,
    gradient: 'from-fuchsia-400 to-purple-600'
  }
];

export function CategorySelection({ username, onSelectCategory, onOpenSettings }: CategorySelectionProps) {
  return (
    <div className="min-h-screen p-4 pt-20 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">
              Welcome back, {username}! 👋
            </h1>
            <p className="text-lg text-gray-700">
              Choose a category to start your word search adventure
            </p>
          </div>
          <Button
            onClick={onOpenSettings}
            variant="outline"
            size="lg"
            className="border-2 border-gray-300 hover:border-purple-500"
          >
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-gray-200 hover:border-purple-400"
              onClick={() => onSelectCategory(category.id)}
            >
              <CardHeader className={`bg-gradient-to-br ${category.gradient} text-white rounded-t-lg`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{category.icon}</span>
                    <CardTitle className="text-2xl">{category.name}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {category.puzzleCount}+ puzzles
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription className="text-black text-base">
                  {category.description}
                </CardDescription>
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(category.id);
                  }}
                >
                  Play Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-white/80 border-2 border-purple-200">
            <CardContent className="py-6">
              <h3 className="text-xl font-bold text-black mb-2">
                🎯 How to Play
              </h3>
              <p className="text-gray-700 mb-4">
                Find hidden words in the grid by dragging across adjacent letters. Words can be horizontal, vertical, or diagonal!
              </p>
              <div className="flex justify-center gap-4 text-sm text-gray-600">
                <span>✨ Drag to select words</span>
                <span>⏸️ Pause anytime</span>
                <span>📤 Share your scores</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

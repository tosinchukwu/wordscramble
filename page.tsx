'use client';

import { useState, useEffect } from 'react';
import { UsernameSetup } from '@/components/UsernameSetup';
import { CategorySelection } from '@/components/game/CategorySelection';
import { WordSearchGame } from '@/components/game/WordSearchGame';
import { GameSettings } from '@/components/game/GameSettings';
import { sdk } from "@farcaster/miniapp-sdk";

export type GameView = 'username' | 'categories' | 'game' | 'settings';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GridSize = 10 | 12 | 15;
export type ColorTheme = 'default' | 'ocean' | 'forest' | 'sunset';

export default function Page() {
  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        if (document.readyState !== 'complete') {
          await new Promise(resolve => {
            if (document.readyState === 'complete') {
              resolve(void 0);
            } else {
              window.addEventListener('load', () => resolve(void 0), { once: true });
            }
          });
        }

        await sdk.actions.ready();
        console.log("Farcaster SDK initialized successfully - app fully loaded");
      } catch (error) {
        console.error('Failed to initialize Farcaster SDK:', error);
        setTimeout(async () => {
          try {
            await sdk.actions.ready();
            console.log('Farcaster SDK initialized on retry');
          } catch (retryError) {
            console.error('Farcaster SDK retry failed:', retryError);
          }
        }, 1000);
      }
    };
    initializeFarcaster();
  }, []);

  const [currentView, setCurrentView] = useState<GameView>('username');
  const [username, setUsername] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [gridSize, setGridSize] = useState<GridSize>(12);
  const [colorTheme, setColorTheme] = useState<ColorTheme>('default');

  // Load username from localStorage
  useEffect(() => {
    const savedUsername = localStorage.getItem('wordSearchUsername');
    if (savedUsername) {
      setUsername(savedUsername);
      setCurrentView('categories');
    }
  }, []);

  const handleUsernameSubmit = (name: string): void => {
    setUsername(name);
    localStorage.setItem('wordSearchUsername', name);
    setCurrentView('categories');
  };

  const handleCategorySelect = (category: string): void => {
    setSelectedCategory(category);
    setCurrentView('game');
  };

  const handleBackToCategories = (): void => {
    setCurrentView('categories');
  };

  const handleOpenSettings = (): void => {
    setCurrentView('settings');
  };

  const handleCloseSettings = (): void => {
    setCurrentView('categories');
  };

  const getThemeClasses = (): string => {
    const themes: Record<ColorTheme, string> = {
      default: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50',
      ocean: 'bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50',
      forest: 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50',
      sunset: 'bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50'
    };
    return themes[colorTheme];
  };

  return (
    <main className={`min-h-screen ${getThemeClasses()} transition-all duration-500`}>
      {currentView === 'username' && (
        <UsernameSetup onSubmit={handleUsernameSubmit} />
      )}
      
      {currentView === 'categories' && (
        <CategorySelection
          username={username}
          onSelectCategory={handleCategorySelect}
          onOpenSettings={handleOpenSettings}
        />
      )}
      
      {currentView === 'game' && (
        <WordSearchGame
          username={username}
          category={selectedCategory}
          difficulty={difficulty}
          gridSize={gridSize}
          colorTheme={colorTheme}
          onBack={handleBackToCategories}
        />
      )}
      
      {currentView === 'settings' && (
        <GameSettings
          difficulty={difficulty}
          gridSize={gridSize}
          colorTheme={colorTheme}
          onDifficultyChange={setDifficulty}
          onGridSizeChange={setGridSize}
          onColorThemeChange={setColorTheme}
          onClose={handleCloseSettings}
        />
      )}
    </main>
  );
}

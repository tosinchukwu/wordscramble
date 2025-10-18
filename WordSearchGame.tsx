'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ArrowLeft, Pause, Play, Share2, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import { getRandomWords, generateWordSearchGrid } from '@/lib/wordSearchData';
import { PauseOverlay } from './PauseOverlay';
import { ShareScoreCard } from './ShareScoreCard';
import type { Difficulty, GridSize, ColorTheme } from '@/app/page';

interface WordSearchGameProps {
  username: string;
  category: string;
  difficulty: Difficulty;
  gridSize: GridSize;
  colorTheme: ColorTheme;
  onBack: () => void;
}

interface Cell {
  row: number;
  col: number;
}

export function WordSearchGame({ username, category, difficulty, gridSize, colorTheme, onBack }: WordSearchGameProps) {
  const [grid, setGrid] = useState<string[][]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showExitDialog, setShowExitDialog] = useState<boolean>(false);
  const [showShareDialog, setShowShareDialog] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const wordPositions = useRef<Map<string, Array<{row: number; col: number}>>>(new Map());
  const lastTouchCell = useRef<Cell | null>(null);
  const touchStartTime = useRef<number>(0);

  const wordCount = difficulty === 'easy' ? 8 : difficulty === 'medium' ? 12 : 15;

  useEffect(() => {
    initializeGame();
  }, [category, difficulty, gridSize]);

  useEffect(() => {
    if (!isPaused && !gameCompleted) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPaused, gameCompleted]);

  useEffect(() => {
    if (foundWords.size === words.length && words.length > 0) {
      setGameCompleted(true);
      const bonusScore = Math.max(0, 1000 - timeElapsed * 10);
      setScore(prev => prev + bonusScore);
      toast.success('Congratulations! Puzzle completed! 🎉');
    }
  }, [foundWords.size, words.length]);

  const initializeGame = (): void => {
    const selectedWords = getRandomWords(category, wordCount);
    const { grid: newGrid, positions } = generateWordSearchGrid(selectedWords, gridSize);
    setGrid(newGrid);
    setWords(selectedWords);
    wordPositions.current = positions;
    setFoundWords(new Set());
    setSelectedCells([]);
    setScore(0);
    setTimeElapsed(0);
    setGameCompleted(false);
  };

  // Haptic feedback helper
  const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light'): void => {
    if ('vibrate' in navigator) {
      const duration = type === 'light' ? 10 : type === 'medium' ? 20 : 50;
      navigator.vibrate(duration);
    }
  };

  const handleMouseDown = (row: number, col: number): void => {
    if (isPaused || gameCompleted) return;
    setIsSelecting(true);
    setSelectedCells([{ row, col }]);
  };

  const handleMouseEnter = (row: number, col: number): void => {
    if (!isSelecting || isPaused || gameCompleted) return;
    
    const lastCell = selectedCells[selectedCells.length - 1];
    if (!lastCell) return;

    const isAdjacent = Math.abs(row - lastCell.row) <= 1 && Math.abs(col - lastCell.col) <= 1;
    if (isAdjacent && !selectedCells.some(cell => cell.row === row && cell.col === col)) {
      setSelectedCells(prev => [...prev, { row, col }]);
    }
  };

  const handleMouseUp = (): void => {
    if (!isSelecting || isPaused || gameCompleted) return;
    setIsSelecting(false);
    checkWord();
  };

  // Enhanced touch event handlers with boundary detection and haptic feedback
  const getCellFromTouch = (touch: React.Touch): { row: number; col: number } | null => {
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!element) return null;
    
    const cellDiv = element.closest('[data-cell]');
    if (!cellDiv) return null;
    
    const row = parseInt(cellDiv.getAttribute('data-row') || '-1');
    const col = parseInt(cellDiv.getAttribute('data-col') || '-1');
    
    if (row === -1 || col === -1) return null;
    return { row, col };
  };

  // Check if touch is near boundary (within 20% of cell edge)
  const isNearBoundary = (touch: React.Touch, cellElement: Element): boolean => {
    const rect = cellElement.getBoundingClientRect();
    const margin = rect.width * 0.2; // 20% margin
    
    const distanceFromLeft = touch.clientX - rect.left;
    const distanceFromRight = rect.right - touch.clientX;
    const distanceFromTop = touch.clientY - rect.top;
    const distanceFromBottom = rect.bottom - touch.clientY;
    
    return distanceFromLeft < margin || 
           distanceFromRight < margin || 
           distanceFromTop < margin || 
           distanceFromBottom < margin;
  };

  const handleTouchStart = (e: React.TouchEvent, row: number, col: number): void => {
    if (isPaused || gameCompleted) return;
    e.preventDefault();
    
    touchStartTime.current = Date.now();
    setIsSelecting(true);
    setSelectedCells([{ row, col }]);
    lastTouchCell.current = { row, col };
    
    // Light haptic feedback on touch start
    triggerHapticFeedback('light');
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    if (!isSelecting || isPaused || gameCompleted) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    if (!touch) return;
    
    const cell = getCellFromTouch(touch);
    if (!cell) return;
    
    const lastCell = selectedCells[selectedCells.length - 1];
    if (!lastCell) return;

    // Check if same cell as last touch
    if (lastTouchCell.current && 
        lastTouchCell.current.row === cell.row && 
        lastTouchCell.current.col === cell.col) {
      return;
    }

    // Enhanced adjacency check with diagonal support
    const rowDiff = Math.abs(cell.row - lastCell.row);
    const colDiff = Math.abs(cell.col - lastCell.col);
    const isAdjacent = rowDiff <= 1 && colDiff <= 1;
    
    // Check if already selected
    const alreadySelected = selectedCells.some(c => c.row === cell.row && c.col === cell.col);
    
    if (isAdjacent && !alreadySelected) {
      // Get current cell element for boundary detection
      const cellElement = document.elementFromPoint(touch.clientX, touch.clientY);
      
      if (cellElement) {
        const nearBoundary = isNearBoundary(touch, cellElement);
        
        // If near boundary, provide subtle resistance feedback
        if (nearBoundary) {
          triggerHapticFeedback('light');
        }
      }
      
      setSelectedCells(prev => [...prev, cell]);
      lastTouchCell.current = cell;
      
      // Medium haptic feedback when adding new cell
      triggerHapticFeedback('medium');
    }
  };

  const handleTouchEnd = (e: React.TouchEvent): void => {
    if (!isSelecting || isPaused || gameCompleted) return;
    e.preventDefault();
    
    const touchDuration = Date.now() - touchStartTime.current;
    
    // If touch was very brief (< 100ms) and only one cell, might be accidental
    if (touchDuration < 100 && selectedCells.length === 1) {
      setSelectedCells([]);
      setIsSelecting(false);
      return;
    }
    
    setIsSelecting(false);
    lastTouchCell.current = null;
    checkWord();
  };

  const checkWord = (): void => {
    if (selectedCells.length < 2) {
      setSelectedCells([]);
      return;
    }

    const selectedWord = selectedCells.map(cell => grid[cell.row][cell.col]).join('');
    
    for (const word of words) {
      if (selectedWord === word && !foundWords.has(word)) {
        setFoundWords(prev => new Set([...prev, word]));
        setScore(prev => prev + word.length * 10);
        toast.success(`Found: ${word}! +${word.length * 10} points`);
        setSelectedCells([]);
        
        // Heavy haptic feedback for successful word
        triggerHapticFeedback('heavy');
        return;
      }
    }
    
    toast.error('Not a valid word');
    setSelectedCells([]);
    
    // Light haptic feedback for incorrect word
    triggerHapticFeedback('light');
  };

  const isCellSelected = (row: number, col: number): boolean => {
    return selectedCells.some(cell => cell.row === row && cell.col === col);
  };

  const isCellInFoundWord = (row: number, col: number): boolean => {
    for (const word of foundWords) {
      const positions = wordPositions.current.get(word);
      if (positions?.some(pos => pos.row === row && pos.col === col)) {
        return true;
      }
    }
    return false;
  };

  const handleExit = (): void => {
    setShowExitDialog(true);
  };

  const confirmExit = (): void => {
    setShowExitDialog(false);
    onBack();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen p-4 pt-20 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={handleExit}
            variant="outline"
            size="lg"
            className="border-2 border-gray-300 hover:border-purple-500"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Exit
          </Button>
          
          <div className="flex gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              ⏱️ {formatTime(timeElapsed)}
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              🏆 {score} pts
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              📊 {foundWords.size}/{words.length}
            </Badge>
          </div>

          <Button
            onClick={() => setIsPaused(!isPaused)}
            variant="outline"
            size="lg"
            className="border-2 border-gray-300 hover:border-purple-500"
            disabled={gameCompleted}
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Word Search Grid */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl text-black capitalize">
                  {category} Word Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  ref={gridRef}
                  className="grid gap-1 select-none"
                  style={{
                    gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                    touchAction: 'none' // Prevent default touch behaviors
                  }}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {grid.map((row, rowIndex) =>
                    row.map((letter, colIndex) => {
                      const isSelected = isCellSelected(rowIndex, colIndex);
                      const isFound = isCellInFoundWord(rowIndex, colIndex);
                      
                      return (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          data-cell="true"
                          data-row={rowIndex}
                          data-col={colIndex}
                          className={`
                            aspect-square flex items-center justify-center text-sm md:text-base lg:text-lg font-bold
                            border-2 rounded cursor-pointer transition-all duration-150
                            ${isFound
                              ? 'bg-green-500 text-white border-green-600 shadow-lg scale-105'
                              : isSelected
                              ? 'bg-blue-500 text-white border-blue-600 shadow-md scale-110'
                              : 'bg-white text-black border-gray-300 hover:bg-gray-100 active:bg-gray-200'
                            }
                          `}
                          onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                          onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                          onTouchStart={(e) => handleTouchStart(e, rowIndex, colIndex)}
                        >
                          {letter}
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Word List */}
          <div>
            <Card className="shadow-xl border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-xl text-black">Words to Find</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {words.map((word) => (
                    <div
                      key={word}
                      className={`
                        p-3 rounded-lg font-medium transition-all duration-300
                        ${foundWords.has(word)
                          ? 'bg-green-100 text-green-700 line-through'
                          : 'bg-gray-100 text-black'
                        }
                      `}
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {gameCompleted && (
              <Card className="mt-6 shadow-xl border-2 border-green-500">
                <CardContent className="pt-6 text-center space-y-4">
                  <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
                  <h3 className="text-2xl font-bold text-black">
                    Puzzle Complete!
                  </h3>
                  <p className="text-lg text-gray-700">
                    Final Score: {score} points
                  </p>
                  <p className="text-gray-600">
                    Time: {formatTime(timeElapsed)}
                  </p>
                  <div className="space-y-2">
                    <Button
                      onClick={() => setShowShareDialog(true)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Score
                    </Button>
                    <Button
                      onClick={initializeGame}
                      className="w-full"
                      variant="outline"
                    >
                      Play Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Pause Overlay */}
      {isPaused && (
        <PauseOverlay
          onResume={() => setIsPaused(false)}
          onExit={handleExit}
        />
      )}

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Game?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to exit? Your progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmExit}>Exit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Share Dialog */}
      {showShareDialog && (
        <ShareScoreCard
          username={username}
          category={category}
          score={score}
          time={formatTime(timeElapsed)}
          wordsFound={foundWords.size}
          totalWords={words.length}
          difficulty={difficulty}
          onClose={() => setShowShareDialog(false)}
        />
      )}
    </div>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { X } from 'lucide-react';
import type { Difficulty, GridSize, ColorTheme } from '@/app/page';

interface GameSettingsProps {
  difficulty: Difficulty;
  gridSize: GridSize;
  colorTheme: ColorTheme;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onGridSizeChange: (size: GridSize) => void;
  onColorThemeChange: (theme: ColorTheme) => void;
  onClose: () => void;
}

export function GameSettings({
  difficulty,
  gridSize,
  colorTheme,
  onDifficultyChange,
  onGridSizeChange,
  onColorThemeChange,
  onClose
}: GameSettingsProps) {
  return (
    <div className="min-h-screen p-4 pt-20 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-2xl border-2 border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl">Game Settings</CardTitle>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          <CardDescription className="text-white/90">
            Customize your word search experience
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          {/* Difficulty Setting */}
          <div className="space-y-4">
            <Label className="text-lg font-bold text-black">Difficulty Level</Label>
            <RadioGroup value={difficulty} onValueChange={(value) => onDifficultyChange(value as Difficulty)}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 cursor-pointer">
                  <RadioGroupItem value="easy" id="easy" />
                  <Label htmlFor="easy" className="flex-1 cursor-pointer text-black">
                    <div className="font-bold">Easy</div>
                    <div className="text-sm text-gray-600">8 words, smaller grid</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 cursor-pointer">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="flex-1 cursor-pointer text-black">
                    <div className="font-bold">Medium</div>
                    <div className="text-sm text-gray-600">12 words, medium grid</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 cursor-pointer">
                  <RadioGroupItem value="hard" id="hard" />
                  <Label htmlFor="hard" className="flex-1 cursor-pointer text-black">
                    <div className="font-bold">Hard</div>
                    <div className="text-sm text-gray-600">15 words, larger grid</div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Grid Size Setting */}
          <div className="space-y-4">
            <Label className="text-lg font-bold text-black">Grid Size</Label>
            <RadioGroup value={gridSize.toString()} onValueChange={(value) => onGridSizeChange(parseInt(value) as GridSize)}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 cursor-pointer">
                  <RadioGroupItem value="10" id="size-10" />
                  <Label htmlFor="size-10" className="flex-1 cursor-pointer text-black">
                    <div className="font-bold">10x10</div>
                    <div className="text-sm text-gray-600">Compact grid, easier to scan</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 cursor-pointer">
                  <RadioGroupItem value="12" id="size-12" />
                  <Label htmlFor="size-12" className="flex-1 cursor-pointer text-black">
                    <div className="font-bold">12x12</div>
                    <div className="text-sm text-gray-600">Balanced grid size</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 cursor-pointer">
                  <RadioGroupItem value="15" id="size-15" />
                  <Label htmlFor="size-15" className="flex-1 cursor-pointer text-black">
                    <div className="font-bold">15x15</div>
                    <div className="text-sm text-gray-600">Large grid, more challenge</div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Color Theme Setting */}
          <div className="space-y-4">
            <Label className="text-lg font-bold text-black">Color Theme</Label>
            <RadioGroup value={colorTheme} onValueChange={(value) => onColorThemeChange(value as ColorTheme)}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 cursor-pointer">
                  <RadioGroupItem value="default" id="theme-default" />
                  <Label htmlFor="theme-default" className="flex-1 cursor-pointer text-black">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-400 to-pink-400"></div>
                      <div>
                        <div className="font-bold">Default</div>
                        <div className="text-sm text-gray-600">Purple & Pink gradient</div>
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 cursor-pointer">
                  <RadioGroupItem value="ocean" id="theme-ocean" />
                  <Label htmlFor="theme-ocean" className="flex-1 cursor-pointer text-black">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-blue-400"></div>
                      <div>
                        <div className="font-bold">Ocean</div>
                        <div className="text-sm text-gray-600">Blue & Cyan gradient</div>
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 cursor-pointer">
                  <RadioGroupItem value="forest" id="theme-forest" />
                  <Label htmlFor="theme-forest" className="flex-1 cursor-pointer text-black">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-400 to-green-400"></div>
                      <div>
                        <div className="font-bold">Forest</div>
                        <div className="text-sm text-gray-600">Green & Emerald gradient</div>
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 cursor-pointer">
                  <RadioGroupItem value="sunset" id="theme-sunset" />
                  <Label htmlFor="theme-sunset" className="flex-1 cursor-pointer text-black">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-400 to-pink-400"></div>
                      <div>
                        <div className="font-bold">Sunset</div>
                        <div className="text-sm text-gray-600">Orange & Rose gradient</div>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Button
            onClick={onClose}
            className="w-full text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
          >
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export interface WordPuzzle {
  word: string;
  category: string;
}

export const wordSearchData: Record<string, string[]> = {
  nature: [
    'TREE', 'FLOWER', 'RIVER', 'MOUNTAIN', 'FOREST', 'OCEAN', 'RAIN', 'SUN', 'MOON', 'STAR',
    'CLOUD', 'WIND', 'LEAF', 'GRASS', 'SEED', 'ROOT', 'BRANCH', 'BARK', 'SOIL', 'EARTH',
    'WATER', 'FIRE', 'AIR', 'LIGHT', 'DARK', 'PLANT', 'GARDEN', 'FIELD', 'VALLEY', 'HILL',
    'LAKE', 'POND', 'STREAM', 'WATERFALL', 'BEACH', 'SAND', 'STONE', 'ROCK', 'CAVE', 'CLIFF',
    'ISLAND', 'DESERT', 'JUNGLE', 'MEADOW', 'PRAIRIE', 'SWAMP', 'MARSH', 'TUNDRA', 'GLACIER', 'VOLCANO'
  ],
  technology: [
    'COMPUTER', 'PHONE', 'TABLET', 'LAPTOP', 'MONITOR', 'KEYBOARD', 'MOUSE', 'PRINTER', 'SCANNER', 'ROUTER',
    'MODEM', 'CABLE', 'WIFI', 'BLUETOOTH', 'USB', 'CHIP', 'CIRCUIT', 'SOFTWARE', 'HARDWARE', 'APP',
    'CODE', 'DATA', 'CLOUD', 'SERVER', 'DATABASE', 'NETWORK', 'INTERNET', 'WEB', 'EMAIL', 'BROWSER',
    'SEARCH', 'DOWNLOAD', 'UPLOAD', 'STREAM', 'PIXEL', 'SCREEN', 'DISPLAY', 'CAMERA', 'SENSOR', 'DRONE',
    'ROBOT', 'VIRTUAL', 'DIGITAL', 'CYBER', 'BINARY', 'ALGORITHM', 'ENCRYPTION', 'FIREWALL', 'PROTOCOL', 'BANDWIDTH'
  ],
  history: [
    'ANCIENT', 'MEDIEVAL', 'MODERN', 'EMPIRE', 'KINGDOM', 'DYNASTY', 'PHARAOH', 'EMPEROR', 'KING', 'QUEEN',
    'KNIGHT', 'CASTLE', 'FORTRESS', 'BATTLE', 'WAR', 'PEACE', 'TREATY', 'REVOLUTION', 'DISCOVERY', 'INVENTION',
    'CIVILIZATION', 'CULTURE', 'TRADITION', 'ARTIFACT', 'MONUMENT', 'PYRAMID', 'TEMPLE', 'RUINS', 'COLONY', 'EXPLORER',
    'VIKING', 'ROMAN', 'GREEK', 'EGYPTIAN', 'AZTEC', 'MAYA', 'INCA', 'SAMURAI', 'CRUSADE', 'RENAISSANCE',
    'INDUSTRIAL', 'COLONIAL', 'INDEPENDENCE', 'DEMOCRACY', 'REPUBLIC', 'MONARCHY', 'FEUDAL', 'MERCHANT', 'TRADE', 'SLAVERY'
  ],
  sports: [
    'SOCCER', 'BASKETBALL', 'TENNIS', 'BASEBALL', 'FOOTBALL', 'VOLLEYBALL', 'HOCKEY', 'GOLF', 'SWIMMING', 'RUNNING',
    'CYCLING', 'BOXING', 'WRESTLING', 'MARTIAL', 'KARATE', 'JUDO', 'YOGA', 'GYMNASTIC', 'TRACK', 'FIELD',
    'JUMP', 'THROW', 'CATCH', 'KICK', 'PASS', 'SHOOT', 'SCORE', 'GOAL', 'POINT', 'WIN',
    'LOSE', 'DRAW', 'MATCH', 'GAME', 'TOURNAMENT', 'CHAMPIONSHIP', 'LEAGUE', 'TEAM', 'PLAYER', 'COACH',
    'REFEREE', 'STADIUM', 'ARENA', 'COURT', 'FIELD', 'TRACK', 'POOL', 'RING', 'MEDAL', 'TROPHY'
  ],
  food: [
    'PIZZA', 'PASTA', 'BURGER', 'SALAD', 'SOUP', 'BREAD', 'CHEESE', 'MEAT', 'FISH', 'CHICKEN',
    'BEEF', 'PORK', 'LAMB', 'RICE', 'NOODLE', 'VEGETABLE', 'FRUIT', 'APPLE', 'BANANA', 'ORANGE',
    'GRAPE', 'BERRY', 'MELON', 'PEACH', 'PEAR', 'CHERRY', 'LEMON', 'LIME', 'TOMATO', 'POTATO',
    'CARROT', 'ONION', 'GARLIC', 'PEPPER', 'SALT', 'SUGAR', 'SPICE', 'HERB', 'SAUCE', 'DRESSING',
    'CAKE', 'COOKIE', 'CANDY', 'CHOCOLATE', 'ICE', 'CREAM', 'MILK', 'BUTTER', 'YOGURT', 'JUICE'
  ],
  animals: [
    'LION', 'TIGER', 'BEAR', 'WOLF', 'FOX', 'DEER', 'RABBIT', 'SQUIRREL', 'MOUSE', 'RAT',
    'CAT', 'DOG', 'HORSE', 'COW', 'PIG', 'SHEEP', 'GOAT', 'CHICKEN', 'DUCK', 'GOOSE',
    'EAGLE', 'HAWK', 'OWL', 'PARROT', 'PENGUIN', 'FLAMINGO', 'SWAN', 'CROW', 'SPARROW', 'ROBIN',
    'SNAKE', 'LIZARD', 'TURTLE', 'FROG', 'TOAD', 'CROCODILE', 'ALLIGATOR', 'SHARK', 'WHALE', 'DOLPHIN',
    'SEAL', 'OCTOPUS', 'JELLYFISH', 'CRAB', 'LOBSTER', 'SHRIMP', 'BUTTERFLY', 'BEE', 'ANT', 'SPIDER'
  ],
  science: [
    'ATOM', 'MOLECULE', 'ELEMENT', 'COMPOUND', 'REACTION', 'ENERGY', 'FORCE', 'GRAVITY', 'MOTION', 'SPEED',
    'ACCELERATION', 'VELOCITY', 'MASS', 'WEIGHT', 'DENSITY', 'VOLUME', 'PRESSURE', 'TEMPERATURE', 'HEAT', 'LIGHT',
    'SOUND', 'WAVE', 'FREQUENCY', 'AMPLITUDE', 'PARTICLE', 'ELECTRON', 'PROTON', 'NEUTRON', 'NUCLEUS', 'ORBIT',
    'PLANET', 'GALAXY', 'UNIVERSE', 'SPACE', 'TIME', 'DIMENSION', 'THEORY', 'HYPOTHESIS', 'EXPERIMENT', 'OBSERVATION',
    'MICROSCOPE', 'TELESCOPE', 'LABORATORY', 'CHEMISTRY', 'PHYSICS', 'BIOLOGY', 'ANATOMY', 'CELL', 'DNA', 'GENE'
  ],
  music: [
    'PIANO', 'GUITAR', 'VIOLIN', 'DRUM', 'FLUTE', 'TRUMPET', 'SAXOPHONE', 'CLARINET', 'HARP', 'CELLO',
    'BASS', 'BANJO', 'UKULELE', 'ACCORDION', 'HARMONICA', 'XYLOPHONE', 'TAMBOURINE', 'CYMBAL', 'BELL', 'HORN',
    'NOTE', 'CHORD', 'SCALE', 'MELODY', 'HARMONY', 'RHYTHM', 'TEMPO', 'BEAT', 'MEASURE', 'BAR',
    'SONG', 'TUNE', 'LYRICS', 'VERSE', 'CHORUS', 'BRIDGE', 'INTRO', 'OUTRO', 'SOLO', 'DUET',
    'JAZZ', 'ROCK', 'POP', 'CLASSICAL', 'BLUES', 'COUNTRY', 'FOLK', 'METAL', 'PUNK', 'DISCO'
  ],
  travel: [
    'PARIS', 'LONDON', 'TOKYO', 'NEWYORK', 'ROME', 'MADRID', 'BERLIN', 'MOSCOW', 'DUBAI', 'SYDNEY',
    'AIRPORT', 'TRAIN', 'BUS', 'CAR', 'TAXI', 'SUBWAY', 'FERRY', 'CRUISE', 'FLIGHT', 'JOURNEY',
    'PASSPORT', 'VISA', 'TICKET', 'LUGGAGE', 'BAGGAGE', 'SUITCASE', 'BACKPACK', 'MAP', 'GUIDE', 'TOUR',
    'HOTEL', 'MOTEL', 'HOSTEL', 'RESORT', 'LODGE', 'CABIN', 'TENT', 'CAMPING', 'HIKING', 'BEACH',
    'MOUNTAIN', 'DESERT', 'FOREST', 'CITY', 'VILLAGE', 'TOWN', 'LANDMARK', 'MUSEUM', 'GALLERY', 'MONUMENT'
  ],
  art: [
    'PAINTING', 'DRAWING', 'SCULPTURE', 'SKETCH', 'PORTRAIT', 'LANDSCAPE', 'ABSTRACT', 'REALISTIC', 'MODERN', 'CLASSIC',
    'CANVAS', 'BRUSH', 'PAINT', 'COLOR', 'PALETTE', 'EASEL', 'FRAME', 'GALLERY', 'MUSEUM', 'EXHIBIT',
    'ARTIST', 'PAINTER', 'SCULPTOR', 'PICASSO', 'MONET', 'VANGOGH', 'DAVINCI', 'MICHELANGELO', 'REMBRANDT', 'WARHOL',
    'RENAISSANCE', 'BAROQUE', 'ROCOCO', 'GOTHIC', 'ROMANTIC', 'IMPRESSIONISM', 'CUBISM', 'SURREALISM', 'MINIMALISM', 'EXPRESSIONISM',
    'SKETCH', 'CHARCOAL', 'PASTEL', 'WATERCOLOR', 'OIL', 'ACRYLIC', 'INK', 'PENCIL', 'CRAYON', 'MARKER'
  ]
};

export function getRandomWords(category: string, count: number): string[] {
  const words = wordSearchData[category] || [];
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function generateWordSearchGrid(words: string[], size: number): {
  grid: string[][];
  positions: Map<string, Array<{row: number; col: number}>>;
} {
  const grid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
  const positions = new Map<string, Array<{row: number; col: number}>>();
  
  const directions = [
    { dx: 0, dy: 1 },   // horizontal
    { dx: 1, dy: 0 },   // vertical
    { dx: 1, dy: 1 },   // diagonal down-right
    { dx: 1, dy: -1 },  // diagonal down-left
  ];

  const canPlaceWord = (word: string, row: number, col: number, dx: number, dy: number): boolean => {
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dx;
      const newCol = col + i * dy;
      
      if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size) {
        return false;
      }
      
      if (grid[newRow][newCol] !== '' && grid[newRow][newCol] !== word[i]) {
        return false;
      }
    }
    return true;
  };

  const placeWord = (word: string, row: number, col: number, dx: number, dy: number): void => {
    const wordPositions: Array<{row: number; col: number}> = [];
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dx;
      const newCol = col + i * dy;
      grid[newRow][newCol] = word[i];
      wordPositions.push({ row: newRow, col: newCol });
    }
    positions.set(word, wordPositions);
  };

  // Place words
  for (const word of words) {
    let placed = false;
    let attempts = 0;
    
    while (!placed && attempts < 100) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      
      if (canPlaceWord(word, row, col, direction.dx, direction.dy)) {
        placeWord(word, row, col, direction.dx, direction.dy);
        placed = true;
      }
      attempts++;
    }
  }

  // Fill empty cells with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === '') {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return { grid, positions };
}

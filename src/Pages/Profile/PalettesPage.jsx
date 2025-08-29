import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Palette, Eye, Menu, Search, Heart, Share2, MessageCircle, Play, Star, ArrowRight, ChevronDown, Settings, RefreshCw, Sliders, X, ChevronLeft, ChevronRight, Filter, Grid, List } from "lucide-react";

// All color palettes with semantic color assignments
const palettes = [
  { name: "Galaxy Dust", colors: ["#0f2027", "#203a43", "#2c5364", "#6a11cb"] },
  {
    name: "Mystic Teal",
    colors: ["#136a8a", "#267871", "#00bf8f", "#001510"],
  },
  {
    name: "Coffee Mocha",
    colors: ["#4e342e", "#6f4e37", "#a47148", "#d7ccc8"],
  },
  { name: "Sunset Glow", colors: ["#ff9a9e", "#fad0c4", "#fad390", "#f6e58d"] },
  {
    name: "Ocean Breeze",
    colors: ["#43cea2", "#185a9d", "#00c6ff", "#0072ff"],
  },
  {
    name: "Purple Dream",
    colors: ["#a18cd1", "#fbc2eb", "#8e2de2", "#4a00e0"],
  },
  { name: "Forest Mist", colors: ["#56ab2f", "#a8e063", "#2ecc71", "#27ae60"] },
  { name: "Candy Pop", colors: ["#ff6f61", "#ffb347", "#ffcc33", "#ff6699"] },
  {
    name: "Aurora Lights",
    colors: ["#00c3ff", "#ffff1c", "#ff61a6", "#9b72aa"],
  },
  { name: "Fire & Ice", colors: ["#f12711", "#f5af19", "#2193b0", "#6dd5ed"] },
  {
    name: "Berry Smoothie",
    colors: ["#d53369", "#daae51", "#a40606", "#d98324"],
  },
  { name: "Coral Reef", colors: ["#ff9966", "#ff5e62", "#00f2fe", "#4facfe"] },
  { name: "Golden Hour", colors: ["#ff9a00", "#ff6a00", "#ff3c00", "#ffce00"] },
  
  { name: "Minty Fresh", colors: ["#76b852", "#8DC26F", "#00c9a7", "#92fe9d"] },
  { name: "Rose Petals", colors: ["#ffdde1", "#ee9ca7", "#ff758c", "#ff7eb3"] },
  {
    name: "Electric Vibe",
    colors: ["#fc00ff", "#00dbde", "#ff0080", "#7928ca"],
  },
  { name: "Deep Space", colors: ["#000428", "#004e92", "#0f0c29", "#302b63"] },
  { name: "Lava Flow", colors: ["#ff512f", "#dd2476", "#ff6a00", "#ff0000"] },
  {
    name: "Cotton Candy",
    colors: ["#ffb6c1", "#ff69b4", "#add8e6", "#87cefa"],
  },
  { name: "Neon Nights", colors: ["#00f260", "#0575e6", "#f00000", "#ff0080"] },
  {
    name: "Autumn Leaves",
    colors: ["#d38312", "#a83279", "#ff7e5f", "#feb47b"],
  },
  {
    name: "Crystal Waters",
    colors: ["#89f7fe", "#66a6ff", "#38ef7d", "#11998e"],
  },
  {
    name: "Midnight Purple",
    colors: ["#41295a", "#2F0743", "#662D8C", "#ED1E79"],
  },
  {
    name: "Frozen Dreams",
    colors: ["#e0c3fc", "#8ec5fc", "#a1c4fd", "#c2e9fb"],
  },
  {
    name: "Sunflower Field",
    colors: ["#f7ff00", "#db36a4", "#fceabb", "#f8b500"],
  },
  {
    name: "Tropical Punch",
    colors: ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"],
  },
  {
    name: "Shadow Realm",
    colors: ["#232526", "#414345", "#434343", "#000000"],
  },

  {
    name: "Peach Sorbet",
    colors: ["#FFDAB9", "#FFB6C1", "#FF7F50", "#FFA07A"],
  },
  {
    name: "Emerald Isle",
    colors: ["#004d40", "#00796b", "#26a69a", "#80cbc4"],
  },
  {
    name: "Cherry Blossom",
    colors: ["#ffafbd", "#ffc3a0", "#ffdde1", "#ee9ca7"],
  },
  {
    name: "Steel Blue",
    colors: ["#1c92d2", "#f2fcfe", "#000046", "#1CB5E0"],
  },
  {
    name: "Royal Gold",
    colors: ["#f6d365", "#fda085", "#ffd700", "#ffb347"],
  },

  
  {
    name: "Neon Jungle",
    colors: ["#00ff87", "#60efff", "#ff6ec4", "#7873f5"],
  },
  {
    name: "Frozen Lake",
    colors: ["#83a4d4", "#b6fbff", "#2193b0", "#6dd5ed"],
  },
  {
    name: "Blood Moon",
    colors: ["#870000", "#190a05", "#5a0000", "#ff0000"],
  },

  {
    name: "Ivory Pearl",
    colors: ["#fdfcfb", "#e2d1c3", "#fafafa", "#d6ae7b"],
  },
  {
    name: "Cyberpunk",
    colors: ["#ff0080", "#7928ca", "#2af598", "#00f2fe"],
  },
  {
    name: "Warm Sand",
    colors: ["#fceabb", "#f8b500", "#eacda3", "#d6ae7b"],
  },

  {
    name: "Tropical Sunset",
    colors: ["#f83600", "#f9d423", "#fc4a1a", "#f7b733"],
  },
  {
    name: "Ice Cream Pop",
    colors: ["#f093fb", "#f5576c", "#fbc2eb", "#a6c1ee"],
  },
  {
    name: "Cobalt Storm",
    colors: ["#00416a", "#e4e5e6", "#2c3e50", "#3498db"],
  },
  {
    name: "Dark Velvet",
    colors: ["#000000", "#434343", "#1f1c2c", "#928dab"],
  },
  {
    name: "Desert Heat",
    colors: ["#c79081", "#dfa579", "#e58c8a", "#fbc687"],
  },
  {
    name: "Pink Lemonade",
    colors: ["#ff9a9e", "#fecfef", "#f6d365", "#fda085"],
  },
  {
    name: "Galaxy Core",
    colors: ["#0f2027", "#203a43", "#2c5364", "#6441a5"],
  },
  {
    name: "Golden Dust",
    colors: ["#d4af37", "#ffd700", "#f6d365", "#fda085"],
  },
  {
    name: "Blue Horizon",
    colors: ["#36d1dc", "#5b86e5", "#1e3c72", "#2a5298"],
  },
  {
    name: "Rose Quartz",
    colors: ["#e55d87", "#5fc3e4", "#fbc2eb", "#a6c1ee"],
  },
  {
    name: "Fire Ember",
    colors: ["#f00000", "#ff8008", "#ff512f", "#dd2476"],
  },
  {
    name: "Candyland",
    colors: ["#ff9a9e", "#fad0c4", "#fbc2eb", "#a1c4fd"],
  },
  {
    name: "Twilight Sky",
    colors: ["#0f0c29", "#302b63", "#24243e", "#6a11cb"],
  },
  {
    name: "Green Meadow",
    colors: ["#11998e", "#38ef7d", "#00c9a7", "#92fe9d"],
  },
  {
    name: "Citrus Punch",
    colors: ["#f9d423", "#ff4e50", "#ff6a00", "#ee0979"],
  },
  {
    name: "Silver Lining",
    colors: ["#bdc3c7", "#2c3e50", "#e0eafc", "#cfdef3"],
  },
  {
    name: "Royal Indigo",
    colors: ["#4a00e0", "#8e2de2", "#3a1c71", "#d76d77"],
  },
  {
    name: "Deep Ocean",
    colors: ["#2c3e50", "#3498db", "#34495e", "#2980b9"],
  },
  {
    name: "Amber Glow",
    colors: ["#ffb347", "#ffcc33", "#ff6a00", "#f5af19"],
  },
  {
    name: "Rainbow Dash",
    colors: ["#ff4e50", "#f9d423", "#24c6dc", "#5433ff"],
  },
  {
    name: "Smoky Ash",
    colors: ["#606c88", "#3f4c6b", "#434343", "#232526"],
  },
  {
    name: "Pink Bliss",
    colors: ["#ff9a9e", "#fecfef", "#fbc2eb", "#a6c1ee"],
  },
  {
    name: "Royal Rose",
    colors: ["#ff758c", "#ff7eb3", "#fcb69f", "#ffdde1"],
  },
  {
    name: "Frozen Mist",
    colors: ["#83a4d4", "#b6fbff", "#cfd9df", "#e2ebf0"],
  },
  {
    name: "Mango Tango",
    colors: ["#ff9a00", "#ff6a00", "#ff3c00", "#ffce00"],
  },
  {
    name: "Cocoa Bean",
    colors: ["#3e2723", "#5d4037", "#795548", "#a1887f"],
  },
  {
    name: "Citrus Zest",
    colors: ["#f7971e", "#ffd200", "#f9d423", "#ff8008"],
  },
  {
    name: "Violet Storm",
    colors: ["#20002c", "#cbb4d4", "#662d8c", "#ed1e79"],
  },
  {
    name: "Midnight Blue",
    colors: ["#232526", "#414345", "#000046", "#1CB5E0"],
  },
  {
    name: "Neon Glow",
    colors: ["#00f2fe", "#4facfe", "#ff0080", "#f80759"],
  },
  {
    name: "Pastel Dreams",
    colors: ["#a1c4fd", "#c2e9fb", "#d4fc79", "#96e6a1"],
  },
  {
    name: "Wildfire",
    colors: ["#ff416c", "#ff4b2b", "#ff6a00", "#ee0979"],
  },
  {
    name: "Aqua Marine",
    colors: ["#1a2980", "#26d0ce", "#13547a", "#80d0c7"],
  },
  {
    name: "Royal Marble",
    colors: ["#f5f7fa", "#c3cfe2", "#bdc3c7", "#2c3e50"],
  },
  {
    name: "Tangerine",
    colors: ["#f12711", "#f5af19", "#ff6a00", "#ff9a00"],
  },
 
  {
    name: "Amber Rose",
    colors: ["#f7971e", "#ffd200", "#ff758c", "#ff7eb3"],
  },
  {
    name: "Sakura Bloom",
    colors: ["#ffb7c5", "#ffdde1", "#ffc1cc", "#ff69b4"],
  },
  {
    name: "Arctic Chill",
    colors: ["#00d2ff", "#3a7bd5", "#83a4d4", "#b6fbff"],
  },
  { name: "Molten Lava", colors: ["#ff0000", "#ff512f", "#f12711", "#a40606"] },
  {
    name: "Zen Garden",
    colors: ["#355C7D", "#6C5B7B", "#C06C84", "#F8B195"],
  },
  {
    name: "Lime Fizz",
    colors: ["#a8ff78", "#78ffd6", "#56ab2f", "#a8e063"],
  },
  {
    name: "Solar Eclipse",
    colors: ["#0f2027", "#2c5364", "#232526", "#000000"],
  },
  { name: "Berry Crush", colors: ["#8e2de2", "#ff0080", "#fc466b", "#3a1c71"] },
  {
    name: "Amber Sunset",
    colors: ["#ff7e5f", "#feb47b", "#f7971e", "#ffd200"],
  },
  {
    name: "Mystic Ocean",
    colors: ["#2E3192", "#1BFFFF", "#0F2027", "#2C5364"],
  },
  { name: "Dreamscape", colors: ["#00c6ff", "#0072ff", "#7f00ff", "#e100ff"] },
];
// Helper functions
const isColorDark = (color) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return brightness < 128;
};

const lightenColor = (color, amount = 0.1) => {
  const hex = color.replace('#', '');
  const r = Math.min(255, parseInt(hex.substr(0, 2), 16) + (255 * amount));
  const g = Math.min(255, parseInt(hex.substr(2, 2), 16) + (255 * amount));
  const b = Math.min(255, parseInt(hex.substr(4, 2), 16) + (255 * amount));
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
};

const hsvToHex = (h, s, v) => {
  const S = (s > 1) ? s / 100 : s;
  const V = (v > 1) ? v / 100 : v;
  const C = V * S;
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
  const M = V - C;
  let r = 0, g = 0, b = 0;
  
  if (h >= 0 && h < 60) { r = C; g = X; b = 0; }
  else if (h >= 60 && h < 120) { r = X; g = C; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = C; b = X; }
  else if (h >= 180 && h < 240) { r = 0; g = X; b = C; }
  else if (h >= 240 && h < 300) { r = X; g = 0; b = C; }
  else { r = C; g = 0; b = X; }
  
  r = Math.round((r + M) * 255);
  g = Math.round((g + M) * 255);
  b = Math.round((b + M) * 255);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const hexToHsv = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  
  let h = 0;
  if (diff !== 0) {
    if (max === r) h = ((g - b) / diff) % 6;
    else if (max === g) h = (b - r) / diff + 2;
    else h = (r - g) / diff + 4;
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  
  const s = max === 0 ? 0 : diff / max;
  const v = max;
  
  return { h, s: Math.round(s * 100), v: Math.round(v * 100) };
};

// Color wheel component
const ColorWheel = ({ hue, saturation, brightness, onHueChange, onSaturationChange, onBrightnessChange, size = 140 }) => {
  const handleWheelClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    const normalizedAngle = angle < 0 ? angle + 360 : angle;
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = size / 2 - 10;
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    
    onHueChange(normalizedAngle);
    onSaturationChange(normalizedDistance * 100);
  }, [onHueChange, onSaturationChange, size]);

  const indicatorX = Math.cos(hue * Math.PI / 180) * (saturation / 100) * (size / 2 - 10);
  const indicatorY = Math.sin(hue * Math.PI / 180) * (saturation / 100) * (size / 2 - 10);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg width={size} height={size} onClick={handleWheelClick} className="cursor-pointer">
          <defs>
            <radialGradient id="saturation-gradient">
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <g transform={`translate(${size/2}, ${size/2})`}>
            {Array.from({ length: 360 }, (_, i) => (
              <path
                key={i}
                d={`M 0 0 L ${Math.cos(i * Math.PI / 180) * (size/2 - 10)} ${Math.sin(i * Math.PI / 180) * (size/2 - 10)} A ${size/2 - 10} ${size/2 - 10} 0 0 1 ${Math.cos((i + 1) * Math.PI / 180) * (size/2 - 10)} ${Math.sin((i + 1) * Math.PI / 180) * (size/2 - 10)} Z`}
                fill={hsvToHex(i, 100, 100)}
              />
            ))}
            <circle cx="0" cy="0" r={size/2 - 10} fill="url(#saturation-gradient)" />
            <circle cx={indicatorX} cy={indicatorY} r="6" fill="white" stroke="#333" strokeWidth="2" />
          </g>
        </svg>
      </div>
      <div className="w-full">
        <label className="text-xs text-gray-600 mb-1 block">Brightness</label>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => onBrightnessChange(parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{ background: `linear-gradient(90deg, black, ${hsvToHex(hue, saturation, 100)})` }}
          />
          <div
            className="absolute top-0 w-3 h-3 bg-white border-2 border-gray-400 rounded-full transform -translate-y-1 pointer-events-none"
            style={{ left: `calc(${brightness}% - 6px)` }}
          />
        </div>
      </div>
    </div>
  );
};

// Custom color editor
const CustomColorEditor = ({ customColors, onCustomColorChange, onApplyCustomColors }) => {
  const [activeElement, setActiveElement] = useState('primary');
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(100);

  const elementTypes = {
    primary: { label: 'Primary', description: 'Main brand color' },
    secondary: { label: 'Secondary', description: 'Supporting color' },
    accent: { label: 'Accent', description: 'Emphasis color' },
    background: { label: 'Background', description: 'Background surfaces' }
  };

  const updateColorFromWheel = useCallback(() => {
    const newColor = hsvToHex(hue, saturation, brightness);
    onCustomColorChange(activeElement, newColor);
  }, [hue, saturation, brightness, activeElement, onCustomColorChange]);

  const handleElementChange = (element) => {
    setActiveElement(element);
    const color = customColors[element];
    if (color) {
      const hsv = hexToHsv(color);
      setHue(hsv.h);
      setSaturation(hsv.s);
      setBrightness(hsv.v);
    }
  };

  useEffect(() => {
    updateColorFromWheel();
  }, [updateColorFromWheel]);

  const generateRandomPalette = () => {
    const baseHue = Math.random() * 360;
    const colors = {
      primary: hsvToHex(baseHue, 70 + Math.random() * 30, 60 + Math.random() * 40),
      secondary: hsvToHex((baseHue + 30 + Math.random() * 60) % 360, 50 + Math.random() * 40, 70 + Math.random() * 30),
      accent: hsvToHex((baseHue + 120 + Math.random() * 120) % 360, 80 + Math.random() * 20, 80 + Math.random() * 20),
      background: hsvToHex(baseHue, 10 + Math.random() * 20, 95 + Math.random() * 5)
    };

    Object.entries(colors).forEach(([key, color]) => {
      onCustomColorChange(key, color);
    });

    const hsv = hexToHsv(colors[activeElement]);
    setHue(hsv.h);
    setSaturation(hsv.s);
    setBrightness(hsv.v);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
          <Sliders className="w-4 h-4" />
          Custom Colors
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateRandomPalette}
          className="p-2 bg-gray-100 dark:bg-secondary-700 hover:bg-gray-200 dark:hover:bg-secondary-600 rounded-lg transition-colors"
          title="Generate random palette"
        >
          <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </motion.button>
      </div>

      {/* Color Selection */}
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(elementTypes).map(([key, info]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleElementChange(key)}
            className={`p-2 rounded-lg text-left transition-all border-2 
              ${activeElement === key 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50 dark:border-blue-400' 
                : 'border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 hover:bg-gray-50 dark:hover:bg-secondary-700'
              }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: customColors[key] || '#000000' }}
              />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{info.label}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{info.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Color Wheel */}
      <div className="bg-gray-50 dark:bg-secondary-800 p-3 rounded-lg">
        <ColorWheel
          hue={hue}
          saturation={saturation}
          brightness={brightness}
          onHueChange={setHue}
          onSaturationChange={setSaturation}
          onBrightnessChange={setBrightness}
          size={140}
        />
      </div>

      {/* Color Input */}
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg border-2 border-gray-300 dark:border-secondary-600 shadow-sm"
          style={{ backgroundColor: customColors[activeElement] || '#000000' }}
        />
        <input
          type="text"
          value={customColors[activeElement] || '#000000'}
          onChange={(e) => {
            const color = e.target.value;
            if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
              onCustomColorChange(activeElement, color);
              const hsv = hexToHsv(color);
              setHue(hsv.h);
              setSaturation(hsv.s);
              setBrightness(hsv.v);
            }
          }}
          className="flex-1 p-2 border border-gray-300 dark:border-secondary-600 rounded-lg font-mono text-xs bg-white dark:bg-secondary-900 text-gray-800 dark:text-gray-100"
          placeholder="#000000"
        />
      </div>

      {/* Apply Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onApplyCustomColors}
        className="w-full p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all text-sm"
      >
        Apply Custom Colors
      </motion.button>
    </div>
  );
};

// Demo website component
const DemoWebsite = ({ colors }) => {
  const [likes, setLikes] = useState(142);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div
      className="w-full h-full rounded-xl overflow-hidden shadow-lg"
      style={{
        backgroundColor: colors.background || "#ffffff",
        color: colors.text || "#1f2937",
      }}
    >
      {/* Scrollable content wrapper */}
      <div className="h-full overflow-y-auto">
        {/* Mac Window Header */}
        <div
          className="px-6 py-3 border-b flex items-center gap-3 sticky top-0 z-10"
          style={{
            borderColor: colors.border || "#e5e7eb",
            backgroundColor: colors.surface || "#ffffff",
          }}
        >
          {/* Mac dots */}
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition-colors"
            />
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-600 transition-colors"
            />
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition-colors"
            />
          </div>

          {/* Window title */}
          <div className="flex-1 text-center">
            <span className="text-sm text-gray-600 font-medium">
              ColorCraft - Design Studio
            </span>
          </div>
        </div>

        {/* Header */}
        <header
          className="px-6 py-4 border-b sticky top-[42px] z-10"
          style={{
            borderColor: colors.border || "#e5e7eb",
            backgroundColor: colors.surface || "#ffffff",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.primary || "#3b82f6" }}
              >
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h1
                className="text-lg font-bold"
                style={{ color: colors.text }}
              >
                ColorCraft
              </h1>
            </div>
            <nav className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: colors.text }}
              >
                Home
              </a>
              <a
                href="#"
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: colors.text }}
              >
                Gallery
              </a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg text-white font-medium text-sm"
                style={{ backgroundColor: colors.primary || "#3b82f6" }}
              >
                Get Started
              </motion.button>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-4xl font-bold mb-4">
                Design with{" "}
                <span
                  className="bg-gradient-to-r bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(45deg, ${
                      colors.primary || "#3b82f6"
                    }, ${colors.accent || "#8b5cf6"})`,
                  }}
                >
                  Beautiful Colors
                </span>
              </h2>
              <p
                className="text-lg mb-8"
                style={{ color: colors.textSecondary || "#6b7280" }}
              >
                Create stunning color palettes that bring your designs to life
                with our advanced color tools.
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex gap-4 justify-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg text-white font-medium flex items-center gap-2"
                style={{ backgroundColor: colors.primary || "#3b82f6" }}
              >
                <Play className="w-4 h-4" />
                Start Creating
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg font-medium border flex items-center gap-2"
                style={{
                  borderColor: colors.border || "#e5e7eb",
                  color: colors.text || "#1f2937",
                }}
              >
                <Eye className="w-4 h-4" />
                View Examples
              </motion.button>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Card 1 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl border text-left"
                style={{
                  backgroundColor: colors.surface || "#ffffff",
                  borderColor: colors.border || "#e5e7eb",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: colors.accent || "#8b5cf6" }}
                  >
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      Premium Quality
                    </h3>
                    <p
                      className="text-sm mb-4"
                      style={{ color: colors.textSecondary || "#6b7280" }}
                    >
                      Hand-crafted color combinations that work perfectly
                      together for any design project.
                    </p>
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                          isLiked
                            ? "text-red-500 bg-red-50"
                            : "hover:bg-gray-100"
                        }`}
                        style={{
                          backgroundColor: isLiked
                            ? "#fee2e2"
                            : colors.background || "#f9fafb",
                        }}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isLiked ? "fill-current" : ""
                          }`}
                        />
                        <span>{likes}</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm hover:bg-gray-100"
                        style={{
                          backgroundColor: colors.background || "#f9fafb",
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl border text-left"
                style={{
                  backgroundColor: colors.surface || "#ffffff",
                  borderColor: colors.border || "#e5e7eb",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: colors.secondary || "#10b981" }}
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Community</h3>
                    <p
                      className="text-sm mb-4"
                      style={{ color: colors.textSecondary || "#6b7280" }}
                    >
                      Join thousands of designers sharing their favorite
                      palettes and creative inspiration.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg text-white font-medium text-sm flex items-center gap-2"
                      style={{
                        backgroundColor: colors.secondary || "#10b981",
                      }}
                    >
                      Join Community <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="px-6 py-4 border-t mt-8"
          style={{
            borderColor: colors.border || "#e5e7eb",
            backgroundColor: colors.surface || "#ffffff",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded flex items-center justify-center"
                style={{ backgroundColor: colors.primary || "#3b82f6" }}
              >
                <Palette className="w-4 h-4 text-white" />
              </div>
              <span
                className="font-semibold"
                style={{ color: colors.text }}
              >
                ColorCraft
              </span>
            </div>
            <p
              className="text-sm"
              style={{ color: colors.textSecondary || "#6b7280" }}
            >
              Made with ❤️ by designers
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Main component
const PalettesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPalette, setSelectedPalette] = useState(palettes[0]);
  const [copiedColors, setCopiedColors] = useState({});
  const [showCustomEditor, setShowCustomEditor] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [customColors, setCustomColors] = useState({
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#8b5cf6',
    background: '#ffffff'
  });

  const filteredPalettes = palettes.filter(palette =>
    palette.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPalettes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPalettes = filteredPalettes.slice(startIndex, startIndex + itemsPerPage);

  const paletteToSemanticColors = useCallback((palette) => {
    const colors = palette.colors;
    const backgroundBase = colors[3] || '#ffffff';
    const isDarkTheme = isColorDark(backgroundBase);
    return {
      primary: colors[0] || '#3b82f6',
      secondary: colors[1] || '#10b981',
      accent: colors[2] || '#8b5cf6',
      background: isDarkTheme ? backgroundBase : lightenColor(backgroundBase, 0.3),
      text: isDarkTheme ? '#ffffff' : '#1f2937',
      textSecondary: isDarkTheme ? '#e5e7eb' : '#6b7280',
      border: isDarkTheme ? '#4b5563' : lightenColor(backgroundBase, 0.2),
      surface: isDarkTheme ? lightenColor(backgroundBase, 0.1) : lightenColor(backgroundBase, 0.4)
    };
  }, []);

  const copyToClipboard = async (color, paletteIndex, colorIndex) => {
    try {
      await navigator.clipboard.writeText(color);
      const key = `${paletteIndex}-${colorIndex}`;
      setCopiedColors(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedColors(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  const handleCustomColorChange = (element, color) => {
    setCustomColors(prev => ({ ...prev, [element]: color }));
  };

  const handleApplyCustomColors = () => {
    setSelectedPalette({
      name: "Custom Palette",
      colors: Object.values(customColors)
    });
  };

  const copyFullPalette = (palette, paletteIdx) => {
    navigator.clipboard.writeText(palette.colors.join(', '));
    setCopiedColors(prev => ({ ...prev, [`full-${paletteIdx}`]: true }));
    setTimeout(() => setCopiedColors(prev => ({ ...prev, [`full-${paletteIdx}`]: false })), 1500);
  };

  const Button = ({ children, onClick, className = "" }) => (
    <motion.button
      whileHover={{ scale: 1.05 }} // slightly grow on hover
      whileTap={{ scale: 0.95 }} // slightly shrink on click
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
                  text-sm font-medium transition-all shadow-md ${className}`}
    >
      {children}
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-700 transition-colors">
      {/* Header */}
      <header className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xs border-b border-gray-200 dark:border-secondary-700 sticky top-0  ">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                Color Palette Generator
              </h1>
            </motion.div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className=" p-2 bg-gray-100 dark:bg-secondary-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600 rounded-lg transition-colors"
                title="Toggle sidebar"
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <AnimatePresence>
          <motion.aside
            initial={{ width: isSidebarCollapsed ? 0 : 400 }}
            animate={{ width: isSidebarCollapsed ? 0 : 400 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`bg-white/80 dark:bg-secondary-900/80 backdrop-blur-xs border-r border-gray-200 dark:border-secondary-700 overflow-hidden ${isSidebarCollapsed ? 'lg:block hidden' : 'block'}`}
          >
            <div className="h-full overflow-y-auto p-6 space-y-6">
              {/* Search */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search palettes..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-3 bg-white/60 dark:bg-secondary-800/60 backdrop-blur-xs border border-gray-200 dark:border-secondary-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-800 dark:text-gray-100"
                />
              </motion.div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCustomEditor(!showCustomEditor)}
                  className={`px-3 py-2 rounded-lg transition-all text-sm flex items-center gap-2 ${
                    showCustomEditor ? 'bg-primary-100 text-primary-600 dark:bg-primary-700/30 dark:text-primary-300' : 'bg-gray-100 dark:bg-secondary-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
                  }`}
                >
                  <Sliders className="w-4 h-4" />
                  Custom
                </motion.button>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredPalettes.length} palettes
                </span>
              </div>

              {/* Custom Editor */}
              <AnimatePresence>
                {showCustomEditor && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white/60 dark:bg-secondary-800/60 backdrop-blur-xs rounded-xl p-4 border border-gray-200 dark:border-secondary-700"
                  >
                    <CustomColorEditor
                      customColors={customColors}
                      onCustomColorChange={handleCustomColorChange}
                      onApplyCustomColors={handleApplyCustomColors}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Palette List */}
              <div className="space-y-6 w-full max-w-5xl mx-auto px-4">
                  <h3 className="font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100 text-lg">
                    <Palette className="w-5 h-5" />
                    Palettes
                  </h3>

                  <div className="space-y-5">
                    {paginatedPalettes.map((palette, idx) => (
                      <div
                        key={`${palette.name}-${idx}`}
                        className={`p-5 rounded-2xl cursor-pointer border-2 transition-all
                          ${
                            selectedPalette?.name === palette.name
                              ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/50'
                              : 'border-gray-200 dark:border-secondary-700 bg-white/60 dark:bg-secondary-800/60 hover:bg-white/80 dark:hover:bg-secondary-700/70'
                          }`}
                        onClick={() => setSelectedPalette(palette)}
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-800 dark:text-gray-100 text-base">{palette.name}</h4>
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedPalette(palette); }}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors"
                            title="Preview palette"
                          >
                            <Eye className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                          </button>
                        </div>

                        {/* Colors */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                          {palette.colors.map((color, colorIndex) => (
                            <div
                              key={colorIndex}
                              className="aspect-square rounded-lg cursor-pointer relative overflow-hidden"
                              style={{ backgroundColor: color }}
                              onClick={(e) => { e.stopPropagation(); copyToClipboard(color, idx, colorIndex); }}
                              title={color}
                            >
                              {copiedColors[`${idx}-${colorIndex}`] && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Color codes */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                          {palette.colors.map((color, colorIndex) => (
                            <button
                              key={colorIndex}
                              onClick={(e) => { e.stopPropagation(); copyToClipboard(color, idx, colorIndex); }}
                              className="w-full px-1 py-1 text-xs font-mono rounded text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors text-center"
                              title={color}
                            >
                              {color}
                            </button>
                          ))}
                        </div>

                        {/* Full palette copy */}
                        <Button
                          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-all shadow-md"
                          onClick={(e) => { e.stopPropagation(); copyFullPalette(palette, idx); }}
                        >
                          {copiedColors[`full-${idx}`] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copiedColors[`full-${idx}`] ? 'Copied Full Palette!' : 'Copy Full Palette'}
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-4">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 border rounded-lg bg-white/60 dark:bg-secondary-800 border-gray-200 dark:border-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <span className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {currentPage} / {totalPages}
                      </span>

                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className="p-2 border rounded-lg bg-white/60 dark:bg-secondary-800 border-gray-200 dark:border-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
            </div>
          </motion.aside>
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <DemoWebsite colors={paletteToSemanticColors(selectedPalette)} />
        </main>
      </div>
    </div>
  );
};

export default PalettesPage;
import { AppState } from './types';
import { 
  Square, Circle, Diamond, Sparkles, 
  Box, MousePointer2, Grid3X3, CircleDot 
} from 'lucide-react';

export const INITIAL_STATE: AppState = {
  content: {
    type: 'url',
    value: 'https://www.google.com',
    text: '',
    email: '',
    subject: '',
    message: '',
    ssid: '',
    password: '',
    encryption: 'WPA'
  },
  colors: {
    singleColor: '#000000',
    gradient: false,
    gradientStart: '#059669', // Emerald 600
    gradientEnd: '#34d399',   // Emerald 400
    gradientType: 'linear',
    bgColor: '#ffffff',
    customEyeColor: false,
    eyeFrameColor: '#000000',
    eyeBallColor: '#000000',
  },
  design: {
    bodyShape: 'square',
    eyeFrameShape: 'square',
    eyeBallShape: 'square',
  },
  logo: {
    src: null,
    size: 0.2,
    removeBg: false,
  },
  resolution: 1000,
};

// Shape Visual Helpers
export const BODY_SHAPES = [
  { id: 'square', label: 'Square', icon: <Square className="w-6 h-6" /> },
  { id: 'dots', label: 'Dots', icon: <Circle className="w-6 h-6" /> },
  { id: 'rounded', label: 'Rounded', icon: <Box className="w-6 h-6 rounded-md" /> },
  { id: 'extra-rounded', label: 'Extra', icon: <Box className="w-6 h-6 rounded-xl" /> },
  { id: 'classy', label: 'Classy', icon: <Diamond className="w-6 h-6" /> },
  { id: 'classy-rounded', label: 'Classy R', icon: <Sparkles className="w-6 h-6" /> },
];

export const FRAME_SHAPES = [
  { id: 'square', label: 'Square', icon: <Box className="w-6 h-6 border-2 border-current" /> },
  { id: 'extra-rounded', label: 'Rounded', icon: <Box className="w-6 h-6 rounded-lg border-2 border-current" /> },
  { id: 'dot', label: 'Dot', icon: <CircleDot className="w-6 h-6" /> },
];

export const BALL_SHAPES = [
  { id: 'square', label: 'Square', icon: <Square className="w-4 h-4" /> },
  { id: 'dot', label: 'Dot', icon: <Circle className="w-4 h-4" /> },
];

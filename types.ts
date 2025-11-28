export type CornerSquareType = 'dot' | 'square' | 'extra-rounded';
export type CornerDotType = 'dot' | 'square';
export type DotType = 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';

export interface QRColorConfig {
  singleColor: string;
  gradient: boolean;
  gradientStart: string;
  gradientEnd: string;
  gradientType: 'linear' | 'radial';
  bgColor: string;
  customEyeColor: boolean;
  eyeFrameColor: string;
  eyeBallColor: string;
}

export interface QRContent {
  type: 'url' | 'text' | 'email' | 'phone' | 'wifi';
  value: string; // Used for URL and Phone
  text?: string;
  email?: string;
  subject?: string;
  message?: string;
  ssid?: string;
  password?: string;
  encryption?: 'WPA' | 'WEP' | 'nopass';
}

export interface QRDesign {
  bodyShape: DotType;
  eyeFrameShape: CornerSquareType;
  eyeBallShape: CornerDotType;
}

export interface QRLogo {
  src: string | null;
  size: number; // 0.1 to 0.5
  removeBg: boolean;
}

export interface AppState {
  content: QRContent;
  colors: QRColorConfig;
  design: QRDesign;
  logo: QRLogo;
  resolution: number;
}

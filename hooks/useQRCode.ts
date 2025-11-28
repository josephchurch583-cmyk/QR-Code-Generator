import { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';
import { AppState } from '../types';

// Helper to construct the data string based on content type
const generateQRData = (content: AppState['content']): string => {
  switch (content.type) {
    case 'url':
      return content.value || '';
    case 'text':
      return content.text || '';
    case 'email':
      return `mailto:${content.email}?subject=${encodeURIComponent(content.subject || '')}&body=${encodeURIComponent(content.message || '')}`;
    case 'phone':
      return `tel:${content.value}`;
    case 'wifi':
      return `WIFI:T:${content.encryption};S:${content.ssid};P:${content.password};;`;
    default:
      return '';
  }
};

export const useQRCode = (config: AppState) => {
  const ref = useRef<HTMLDivElement>(null);
  const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling({
    width: 300,
    height: 300,
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 10
    }
  }));

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode]);

  useEffect(() => {
    const data = generateQRData(config.content);
    
    // Construct Styling Options
    const options: Options = {
      width: 300,
      height: 300,
      data: data,
      image: config.logo.src || undefined,
      dotsOptions: {
        type: config.design.bodyShape,
        color: config.colors.gradient ? undefined : config.colors.singleColor,
        gradient: config.colors.gradient ? {
          type: config.colors.gradientType,
          rotation: 0,
          colorStops: [
            { offset: 0, color: config.colors.gradientStart },
            { offset: 1, color: config.colors.gradientEnd }
          ]
        } : undefined
      },
      backgroundOptions: {
        color: config.colors.bgColor,
      },
      imageOptions: {
        imageSize: config.logo.size,
        margin: 0,
      },
      cornersSquareOptions: {
        type: config.design.eyeFrameShape,
        color: config.colors.customEyeColor ? config.colors.eyeFrameColor : (config.colors.gradient ? config.colors.gradientStart : config.colors.singleColor)
      },
      cornersDotOptions: {
        type: config.design.eyeBallShape,
        color: config.colors.customEyeColor ? config.colors.eyeBallColor : (config.colors.gradient ? config.colors.gradientStart : config.colors.singleColor)
      }
    };

    qrCode.update(options);
  }, [config, qrCode]);

  const download = (extension: 'png' | 'svg' | 'jpeg') => {
    qrCode.update({
      width: config.resolution,
      height: config.resolution
    });
    qrCode.download({
      name: 'my-qr-code',
      extension: extension
    });
    // Revert back to preview size
    setTimeout(() => {
        qrCode.update({
            width: 300,
            height: 300
        });
    }, 100);
  };

  return { ref, download };
};

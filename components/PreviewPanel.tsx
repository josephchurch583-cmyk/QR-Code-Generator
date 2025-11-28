import React, { useRef } from 'react';
import { useQRCode } from '../hooks/useQRCode';
import { AppState } from '../types';
import { Download, Sliders } from 'lucide-react';

interface Props {
  state: AppState;
  onResolutionChange: (res: number) => void;
}

export const PreviewPanel: React.FC<Props> = ({ state, onResolutionChange }) => {
  const { ref, download } = useQRCode(state);

  return (
    <div className="sticky top-6 flex flex-col items-center">
      
      {/* QR Code Container */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6 relative">
         <div ref={ref} className="overflow-hidden rounded-lg" />
         {/* Badge */}
         <div className="absolute -top-3 -right-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded shadow-sm text-yellow-900 transform rotate-12">
            LIVE
         </div>
      </div>

      {/* Quality Slider */}
      <div className="w-full max-w-xs bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-4">
        <div className="flex items-center gap-2 mb-2 text-gray-600">
           <Sliders size={16} />
           <span className="text-sm font-medium">Quality / Resolution</span>
        </div>
        <div className="flex items-center gap-3">
          <input 
            type="range" 
            min="500" 
            max="2000" 
            step="100" 
            value={state.resolution} 
            onChange={(e) => onResolutionChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600 w-16 text-center">
             {state.resolution}px
          </span>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="w-full max-w-xs grid grid-cols-2 gap-3">
        <button 
          onClick={() => download('png')}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-bold shadow-md transition-all active:scale-95"
        >
          <Download size={18} />
          PNG
        </button>
        <button 
          onClick={() => download('svg')}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-bold shadow-md transition-all active:scale-95"
        >
          <Download size={18} />
          SVG
        </button>
      </div>

      <p className="mt-6 text-xs text-gray-400 text-center max-w-xs">
        High quality vector graphics for professional print and digital use.
      </p>

    </div>
  );
};

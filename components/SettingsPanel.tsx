import React, { useCallback } from 'react';
import { AppState, QRColorConfig, QRDesign, QRLogo } from '../types';
import { ContentTabs } from './Settings/ContentTabs';
import { Accordion } from './Settings/Accordion';
import { Palette, Image as ImageIcon, LayoutGrid, Type } from 'lucide-react';
import { BODY_SHAPES, FRAME_SHAPES, BALL_SHAPES } from '../constants';

interface Props {
  state: AppState;
  onChange: (newState: Partial<AppState>) => void;
}

export const SettingsPanel: React.FC<Props> = ({ state, onChange }) => {

  // -- Handlers --
  const updateContent = useCallback((newContent: any) => {
    onChange({ content: { ...state.content, ...newContent } });
  }, [state.content, onChange]);

  const updateColors = useCallback((newColors: Partial<QRColorConfig>) => {
    onChange({ colors: { ...state.colors, ...newColors } });
  }, [state.colors, onChange]);

  const updateDesign = useCallback((newDesign: Partial<QRDesign>) => {
    onChange({ design: { ...state.design, ...newDesign } });
  }, [state.design, onChange]);

  const updateLogo = useCallback((newLogo: Partial<QRLogo>) => {
    onChange({ logo: { ...state.logo, ...newLogo } });
  }, [state.logo, onChange]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateLogo({ src: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Enter Content */}
      <Accordion title="Enter Content" icon={<Type size={20} />} defaultOpen>
        <ContentTabs content={state.content} onChange={updateContent} />
      </Accordion>

      {/* 2. Set Colors */}
      <Accordion title="Set Colors" icon={<Palette size={20} />}>
        <div className="space-y-6">
          {/* Foreground & Background */}
          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-xs font-medium text-gray-500 mb-1">Background Color</label>
               <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={state.colors.bgColor} 
                    onChange={(e) => updateColors({ bgColor: e.target.value })} 
                    className="h-10 w-10 p-0 border-0 rounded cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">{state.colors.bgColor}</span>
               </div>
             </div>
             
             {!state.colors.gradient && (
               <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Foreground Color</label>
                  <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={state.colors.singleColor} 
                        onChange={(e) => updateColors({ singleColor: e.target.value })} 
                        className="h-10 w-10 p-0 border-0 rounded cursor-pointer"
                      />
                      <span className="text-sm text-gray-600">{state.colors.singleColor}</span>
                  </div>
               </div>
             )}
          </div>

          {/* Gradient Toggle */}
          <div className="border-t pt-4">
             <label className="flex items-center gap-2 mb-3 cursor-pointer">
               <input 
                 type="checkbox" 
                 checked={state.colors.gradient} 
                 onChange={(e) => updateColors({ gradient: e.target.checked })} 
                 className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300"
               />
               <span className="font-medium text-gray-700">Use Gradient</span>
             </label>

             {state.colors.gradient && (
               <div className="grid grid-cols-2 gap-4 pl-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Start Color</label>
                    <input 
                      type="color" 
                      value={state.colors.gradientStart} 
                      onChange={(e) => updateColors({ gradientStart: e.target.value })} 
                      className="h-10 w-full p-0 border-0 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">End Color</label>
                    <input 
                      type="color" 
                      value={state.colors.gradientEnd} 
                      onChange={(e) => updateColors({ gradientEnd: e.target.value })} 
                      className="h-10 w-full p-0 border-0 rounded cursor-pointer"
                    />
                  </div>
                  <div className="col-span-2">
                     <label className="block text-xs font-medium text-gray-500 mb-1">Gradient Type</label>
                     <select 
                       value={state.colors.gradientType} 
                       onChange={(e) => updateColors({ gradientType: e.target.value as any })}
                       className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                     >
                       <option value="linear">Linear</option>
                       <option value="radial">Radial</option>
                     </select>
                  </div>
               </div>
             )}
          </div>

          {/* Custom Eye Colors */}
          <div className="border-t pt-4">
            <label className="flex items-center gap-2 mb-3 cursor-pointer">
               <input 
                 type="checkbox" 
                 checked={state.colors.customEyeColor} 
                 onChange={(e) => updateColors({ customEyeColor: e.target.checked })} 
                 className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300"
               />
               <span className="font-medium text-gray-700">Custom Eye Color</span>
             </label>

             {state.colors.customEyeColor && (
               <div className="grid grid-cols-2 gap-4 pl-6">
                 <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Eye Frame</label>
                    <input 
                      type="color" 
                      value={state.colors.eyeFrameColor} 
                      onChange={(e) => updateColors({ eyeFrameColor: e.target.value })} 
                      className="h-10 w-full p-0 border-0 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Eye Ball</label>
                    <input 
                      type="color" 
                      value={state.colors.eyeBallColor} 
                      onChange={(e) => updateColors({ eyeBallColor: e.target.value })} 
                      className="h-10 w-full p-0 border-0 rounded cursor-pointer"
                    />
                  </div>
               </div>
             )}
          </div>
        </div>
      </Accordion>

      {/* 3. Add Logo Image */}
      <Accordion title="Add Logo Image" icon={<ImageIcon size={20} />}>
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-white transition-colors">
             <input 
               type="file" 
               accept="image/png, image/jpeg" 
               onChange={handleFileUpload} 
               className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
             />
             {state.logo.src && (
               <div className="mt-4 relative">
                  <img src={state.logo.src} alt="Logo Preview" className="h-16 w-16 object-contain border border-gray-200 rounded" />
                  <button 
                    onClick={() => updateLogo({ src: null })} 
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
               </div>
             )}
          </div>

          {state.logo.src && (
             <div className="space-y-2">
                 <div className="flex justify-between">
                    <label className="text-sm text-gray-700">Logo Size</label>
                    <span className="text-xs text-gray-500">{Math.round(state.logo.size * 100)}%</span>
                 </div>
                 <input 
                   type="range" 
                   min="0.1" 
                   max="0.5" 
                   step="0.05" 
                   value={state.logo.size} 
                   onChange={(e) => updateLogo({ size: parseFloat(e.target.value) })}
                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                 />
                 
                 {/* Visual placeholder for feature not fully supported by standard generic file upload without backend processing */}
                 <div className="flex items-center gap-2 mt-2 opacity-50 cursor-not-allowed" title="Requires backend processing">
                    <input type="checkbox" disabled className="w-4 h-4 rounded border-gray-300" />
                    <span className="text-sm text-gray-500">Remove Background (Pro)</span>
                 </div>
             </div>
          )}
        </div>
      </Accordion>

      {/* 4. Customize Design */}
      <Accordion title="Customize Design" icon={<LayoutGrid size={20} />}>
         <div className="space-y-6">
            
            {/* Body Shape */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Body Shape</h4>
              <div className="grid grid-cols-4 gap-2">
                {BODY_SHAPES.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => updateDesign({ bodyShape: shape.id as any })}
                    className={`flex flex-col items-center justify-center p-2 rounded border transition-all ${
                      state.design.bodyShape === shape.id 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-200' 
                      : 'border-gray-200 hover:border-emerald-300 text-gray-600'
                    }`}
                  >
                    {shape.icon}
                    <span className="text-[10px] mt-1">{shape.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Eye Frame Shape */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Eye Frame Shape</h4>
              <div className="grid grid-cols-4 gap-2">
                {FRAME_SHAPES.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => updateDesign({ eyeFrameShape: shape.id as any })}
                    className={`flex flex-col items-center justify-center p-2 rounded border transition-all ${
                      state.design.eyeFrameShape === shape.id 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-200' 
                      : 'border-gray-200 hover:border-emerald-300 text-gray-600'
                    }`}
                  >
                    {shape.icon}
                    <span className="text-[10px] mt-1">{shape.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Eye Ball Shape */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Eye Ball Shape</h4>
              <div className="grid grid-cols-4 gap-2">
                {BALL_SHAPES.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => updateDesign({ eyeBallShape: shape.id as any })}
                    className={`flex flex-col items-center justify-center p-2 rounded border transition-all ${
                      state.design.eyeBallShape === shape.id 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-200' 
                      : 'border-gray-200 hover:border-emerald-300 text-gray-600'
                    }`}
                  >
                    {shape.icon}
                    <span className="text-[10px] mt-1">{shape.label}</span>
                  </button>
                ))}
              </div>
            </div>

         </div>
      </Accordion>

    </div>
  );
};

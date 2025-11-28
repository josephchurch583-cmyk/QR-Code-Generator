import React, { useState, useEffect } from 'react';
import { SettingsPanel } from './SettingsPanel';
import { PreviewPanel } from './PreviewPanel';
import { AppState } from '../types';
import { INITIAL_STATE } from '../constants';

export const QRCodeGenerator: React.FC = () => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [debouncedState, setDebouncedState] = useState<AppState>(INITIAL_STATE);

  // Deep update handler
  const handleStateChange = (updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  // Debounce effect for heavy rendering logic in PreviewPanel
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedState(state);
    }, 500); // 0.5s debounce

    return () => {
      clearTimeout(handler);
    };
  }, [state]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Settings (8/12 width on large screens) */}
        <div className="lg:col-span-8 order-2 lg:order-1">
          <SettingsPanel state={state} onChange={handleStateChange} />
        </div>

        {/* Right Column: Preview (4/12 width on large screens) */}
        <div className="lg:col-span-4 order-1 lg:order-2">
           {/* We pass debounced state to preview to avoid lagging while typing */}
          <PreviewPanel 
            state={debouncedState} 
            onResolutionChange={(res) => handleStateChange({ resolution: res })} 
          />
        </div>
        
      </div>
    </div>
  );
};

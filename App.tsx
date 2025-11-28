import React from 'react';
import { QRCodeGenerator } from './components/QRCodeGenerator';
import { QrCode, Github } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg text-white">
              <QrCode size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Rafee QR Studio</h1>
              <p className="text-xs text-gray-500 font-medium">Professional QR Generator</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
             <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
               100% Free & Client-Side
             </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <QRCodeGenerator />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm mb-2">
            Created with React, TailwindCSS, and qr-code-styling.
          </p>
          <div className="flex justify-center items-center gap-2 text-gray-400 text-sm hover:text-gray-600 transition-colors cursor-pointer">
            <Github size={16} />
            <span>Open Source Clone Concept</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
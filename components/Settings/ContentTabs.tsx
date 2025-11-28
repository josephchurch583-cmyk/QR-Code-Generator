import React from 'react';
import { AppState, QRContent } from '../../types';
import { Link, AlignLeft, Mail, Phone, Wifi } from 'lucide-react';

interface Props {
  content: QRContent;
  onChange: (newContent: Partial<QRContent>) => void;
}

const TAB_CLASSES = "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200";
const ACTIVE_TAB = "border-emerald-600 text-emerald-700 bg-emerald-50";
const INACTIVE_TAB = "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50";

export const ContentTabs: React.FC<Props> = ({ content, onChange }) => {
  const handleTypeChange = (type: QRContent['type']) => {
    onChange({ type });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
        <button onClick={() => handleTypeChange('url')} className={`${TAB_CLASSES} ${content.type === 'url' ? ACTIVE_TAB : INACTIVE_TAB}`}>
          <Link size={16} /> URL
        </button>
        <button onClick={() => handleTypeChange('text')} className={`${TAB_CLASSES} ${content.type === 'text' ? ACTIVE_TAB : INACTIVE_TAB}`}>
          <AlignLeft size={16} /> Text
        </button>
        <button onClick={() => handleTypeChange('email')} className={`${TAB_CLASSES} ${content.type === 'email' ? ACTIVE_TAB : INACTIVE_TAB}`}>
          <Mail size={16} /> Email
        </button>
        <button onClick={() => handleTypeChange('phone')} className={`${TAB_CLASSES} ${content.type === 'phone' ? ACTIVE_TAB : INACTIVE_TAB}`}>
          <Phone size={16} /> Phone
        </button>
        <button onClick={() => handleTypeChange('wifi')} className={`${TAB_CLASSES} ${content.type === 'wifi' ? ACTIVE_TAB : INACTIVE_TAB}`}>
          <Wifi size={16} /> WiFi
        </button>
      </div>

      {/* Inputs */}
      <div className="p-6">
        {content.type === 'url' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Website URL</label>
            <input
              type="url"
              name="value"
              value={content.value || ''}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            />
          </div>
        )}

        {content.type === 'text' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Your Text</label>
            <textarea
              name="text"
              value={content.text || ''}
              onChange={handleChange}
              rows={4}
              placeholder="Enter your text here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            />
          </div>
        )}

        {content.type === 'email' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="email" value={content.email || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input type="text" name="subject" value={content.subject || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="Meeting Request" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea name="message" value={content.message || ''} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
            </div>
          </div>
        )}

        {content.type === 'phone' && (
          <div className="space-y-2">
             <label className="block text-sm font-medium text-gray-700">Phone Number</label>
             <input type="tel" name="value" value={content.value || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="+1 555 000 0000" />
          </div>
        )}

        {content.type === 'wifi' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Network Name (SSID)</label>
              <input type="text" name="ssid" value={content.ssid || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="text" name="password" value={content.password || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Encryption</label>
              <select name="encryption" value={content.encryption} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import { useState } from "react";

const CloseIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m18 6-12 12" />
    <path d="m6 6 12 12" />
  </svg>
);

const Settings = ({ isOpen, onClose, isDark, settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleReset = () => {
    const defaultSettings = {
      timeout: 5000,
      autoFormat: true,
      showHeaders: true,
      followRedirects: true,
      validateSSL: true,
      maxRetries: 3,
      theme: 'auto'
    };
    setLocalSettings(defaultSettings);
    onSettingsChange(defaultSettings);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative w-full max-w-2xl mx-4 rounded-2xl border shadow-2xl transition-all duration-300 transform ${
          isDark 
            ? "bg-[#141414] border-white/10" 
            : "bg-white border-gray-200/50"
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          isDark ? "border-white/10" : "border-gray-200/50"
        }`}>
          <h2 className={`text-xl font-bold ${
            isDark ? "text-white" : "text-[#141414]"
          }`}>
            Settings
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-all duration-300 hover:scale-110 ${
              isDark
                ? "bg-[#1f1f1f] border-white/10 hover:bg-[#252525] hover:border-red-400/50"
                : "bg-white border-gray-200/50 hover:bg-gray-50 hover:border-red-400/50"
            }`}
          >
            <CloseIcon className={`transition-all duration-300 ${
              isDark
                ? "text-gray-300 hover:text-red-400"
                : "text-gray-600 hover:text-red-400"
            }`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-96 overflow-y-auto custom-scrollbar">
          {/* Request Settings */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${
              isDark ? "text-white" : "text-[#141414]"
            }`}>
              Request Settings
            </h3>
            
            {/* Timeout */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}>
                Request Timeout (ms)
              </label>
              <input
                type="number"
                value={localSettings.timeout}
                onChange={(e) => handleSettingChange('timeout', parseInt(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                  isDark
                    ? "bg-[#1f1f1f] border-white/10 text-white focus:border-yellow-400/50"
                    : "bg-white border-gray-200 text-[#141414] focus:border-yellow-400/50"
                } focus:outline-none focus:ring-1 focus:ring-yellow-400/50`}
                min="1000"
                max="60000"
                step="1000"
              />
            </div>

            {/* Max Retries */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}>
                Max Retries
              </label>
              <select
                value={localSettings.maxRetries}
                onChange={(e) => handleSettingChange('maxRetries', parseInt(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                  isDark
                    ? "bg-[#1f1f1f] border-white/10 text-white focus:border-yellow-400/50"
                    : "bg-white border-gray-200 text-[#141414] focus:border-yellow-400/50"
                } focus:outline-none focus:ring-1 focus:ring-yellow-400/50`}
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
              </select>
            </div>
          </div>

          {/* Display Settings */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${
              isDark ? "text-white" : "text-[#141414]"
            }`}>
              Display Settings
            </h3>

            {/* Auto Format JSON */}
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}>
                Auto Format JSON Response
              </label>
              <button
                onClick={() => handleSettingChange('autoFormat', !localSettings.autoFormat)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  localSettings.autoFormat ? "bg-yellow-400" : isDark ? "bg-gray-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    localSettings.autoFormat ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Show Response Headers */}
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}>
                Show Response Headers
              </label>
              <button
                onClick={() => handleSettingChange('showHeaders', !localSettings.showHeaders)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  localSettings.showHeaders ? "bg-yellow-400" : isDark ? "bg-gray-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    localSettings.showHeaders ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${
              isDark ? "text-white" : "text-[#141414]"
            }`}>
              Security Settings
            </h3>

            {/* Follow Redirects */}
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}>
                Follow Redirects
              </label>
              <button
                onClick={() => handleSettingChange('followRedirects', !localSettings.followRedirects)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  localSettings.followRedirects ? "bg-yellow-400" : isDark ? "bg-gray-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    localSettings.followRedirects ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Validate SSL */}
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}>
                Validate SSL Certificates
              </label>
              <button
                onClick={() => handleSettingChange('validateSSL', !localSettings.validateSSL)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  localSettings.validateSSL ? "bg-yellow-400" : isDark ? "bg-gray-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    localSettings.validateSSL ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between p-6 border-t ${
          isDark ? "border-white/10" : "border-gray-200/50"
        }`}>
          <button
            onClick={handleReset}
            className={`px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${
              isDark
                ? "bg-[#1f1f1f] border-white/10 text-gray-300 hover:bg-[#252525] hover:border-red-400/50 hover:text-red-400"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-red-400/50 hover:text-red-400"
            }`}
          >
            Reset to Defaults
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "bg-[#1f1f1f] border-white/10 text-gray-300 hover:bg-[#252525]"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-yellow-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
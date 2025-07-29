import { useState, useCallback, useMemo } from "react";

const ExpandIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
    <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
    <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
    <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
  </svg>
);

const CollapseIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8 3v3a2 2 0 0 1-2 2H3" />
    <path d="m3 3 5 5" />
    <path d="M8 21v-3a2 2 0 0 1 2-2h3" />
    <path d="m8 21 5-5" />
    <path d="M16 3h3a2 2 0 0 1 2 2v3" />
    <path d="m21 3-5 5" />
    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    <path d="m21 21-5-5" />
  </svg>
);

const ResponseSettingsIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 3h6l6 18h6" />
    <path d="M14 3h7" />
  </svg>
);

const ResponseSection = ({ 
  response = null, 
  isDark = false, 
  apiType = "rest", 
  settings = { autoFormat: true } 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showResponseSettings, setShowResponseSettings] = useState(false);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const toggleResponseSettings = useCallback(() => {
    setShowResponseSettings(prev => !prev);
  }, []);

  const formatResponseData = useCallback((data) => {
    if (!data) return '';
    
    if (typeof data === "string" && (data.startsWith("{") || data.startsWith("["))) {
      try {
        return settings.autoFormat ? JSON.stringify(JSON.parse(data), null, 2) : data;
      // eslint-disable-next-line no-unused-vars
      } catch (e) {
        return data;
      }
    }
    return typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
  }, [settings.autoFormat]);

  const statusStyles = useMemo(() => {
    if (!response?.status) return "";
    
    if (response.status >= 200 && response.status < 300) {
      return "text-emerald-700 bg-emerald-100";
    } else if (response.status >= 400) {
      return "text-red-700 bg-red-100";
    } else {
      return "text-indigo-700 bg-indigo-100";
    }
  }, [response?.status]);

  const themeClasses = useMemo(() => ({
    background: isDark ? "bg-[#141414] text-white" : "bg-white text-[#141414]",
    border: isDark ? "border-white/10" : "border-gray-200/50",
    cardBg: isDark ? "bg-[#1f1f1f] border-white/10" : "bg-white border-gray-200/50",
    text: isDark ? "text-white" : "text-[#141414]",
    textSecondary: isDark ? "text-gray-300" : "text-gray-700",
    textMuted: isDark ? "text-gray-400" : "text-gray-500",
    textIcon: isDark ? "text-white/20" : "text-gray-300",
    button: isDark 
      ? "bg-[#1f1f1f] border-white/10 hover:bg-[#252525] hover:border-indigo-400/50"
      : "bg-white border-gray-200/50 hover:bg-gray-50 hover:border-indigo-400/50",
    buttonIcon: isDark 
      ? "text-gray-300 hover:text-indigo-400"
      : "text-gray-600 hover:text-indigo-400",
    emptyState: isDark 
      ? "border-white/10 text-gray-400"
      : "border-gray-200/50 text-gray-500"
  }), [isDark]);

  const apiEmoji = useMemo(() => {
    switch (apiType) {
      case "graphql": return "⚡";
      case "websocket": return "🔌";
      default: return "🚀";
    }
  }, [apiType]);

  const emptyStateMessage = useMemo(() => {
    if (apiType === "websocket") {
      return {
        title: "WebSocket support coming soon!",
        subtitle: "Stay tuned for real-time communication features 🔥"
      };
    }
    return {
      title: `Ready to launch your ${apiType.toUpperCase()} request!`,
      subtitle: "Hit that Send button to see magic happen ✨"
    };
  }, [apiType]);

  const Header = ({ isFullScreen = false }) => (
    <div className={`flex items-center justify-between ${isFullScreen ? 'py-4 px-6' : 'mb-4'} ${isFullScreen ? `border-b ${themeClasses.border}` : ''}`}>
      <h3 className={`${isFullScreen ? 'text-lg sm:text-xl' : 'text-lg'} font-bold flex items-center flex-wrap gap-2 ${themeClasses.text}`}>
        <span>Response</span>
        {response && (
          <>
            <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${statusStyles}`}>
              Status: {response.status}
            </div>
            <span className={`font-bold px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${statusStyles}`}>
              Status Text: {response.statusText || "None"}
            </span>
          </>
        )}
      </h3>
      <div className="flex space-x-2 flex-shrink-0">
        <button
          onClick={toggleResponseSettings}
          className={`p-2 sm:p-3 rounded-xl border transition-all duration-300 hover:scale-110 ${themeClasses.button}`}
          aria-label="Response Settings"
        >
          <ResponseSettingsIcon className={`transition-all duration-300 ${themeClasses.buttonIcon}`} />
        </button>
        <button
          onClick={toggleExpanded}
          className={`p-2 sm:p-3 rounded-xl border transition-all duration-300 hover:scale-110 ${themeClasses.button}`}
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <CollapseIcon className={`transition-all duration-300 ${themeClasses.buttonIcon}`} />
          ) : (
            <ExpandIcon className={`transition-all duration-300 ${themeClasses.buttonIcon}`} />
          )}
        </button>
      </div>
    </div>
  );

  const Content = ({ isFullScreen = false }) => (
    <>
      {response ? (
        <div className={`rounded-xl border transition-all duration-300 ${themeClasses.cardBg} ${isFullScreen ? 'h-full flex flex-col' : ''}`}>
          <div className={`p-4 ${isFullScreen ? 'flex-1 overflow-hidden' : ''}`}>
            <pre className={`font-mono text-xs sm:text-sm whitespace-pre-wrap break-words ${themeClasses.textSecondary} ${isFullScreen ? 'h-full overflow-auto' : 'overflow-auto max-h-32'}`}>
              {formatResponseData(response.data)}
            </pre>
          </div>
        </div>
      ) : (
        <div className={`flex items-center justify-center text-center rounded-xl border-2 border-dashed transition-all duration-300 ${isFullScreen ? 'h-full' : 'py-8'} ${themeClasses.emptyState}`}>
          <div className="px-4">
            <div className={`${isFullScreen ? 'text-4xl sm:text-6xl mb-4' : 'text-4xl mb-2'} ${themeClasses.textIcon}`}>
              {apiEmoji}
            </div>
            <p className={`font-medium ${isFullScreen ? 'text-base sm:text-lg' : ''}`}>
              {emptyStateMessage.title}
            </p>
            <p className={`${isFullScreen ? 'text-sm sm:text-base mt-2' : 'text-sm mt-1'}`}>
              {emptyStateMessage.subtitle}
            </p>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-8">
          <div className={`w-full h-full max-w-7xl max-h-full transition-all duration-500 flex flex-col rounded-lg sm:rounded-xl overflow-hidden ${themeClasses.background} ${themeClasses.border} border`}>

            <div className="flex-shrink-0">
              <Header isFullScreen />
            </div>
            
            <div className="flex-1 px-6 pt-4 overflow-hidden">
              <Content isFullScreen />
            </div>
          </div>
        </div>
      )}

      {/* Normal View */}
      <div className="flex-1 py-4 px-4 sm:px-6">
        <Header />
        <Content />
      </div>

      {/* Settings Modal */}
      {showResponseSettings && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={toggleResponseSettings}
        >
          <div
            className={`max-w-md w-full rounded-xl border p-6 ${themeClasses.cardBg} ${themeClasses.text}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold">Response Settings</h4>
              <button
                onClick={toggleResponseSettings}
                className={`p-2 rounded-lg transition-all duration-300 ${themeClasses.button}`}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto Format JSON</span>
                <div className={`w-12 h-6 rounded-full ${settings.autoFormat ? 'bg-indigo-600' : 'bg-gray-300'} relative transition-all duration-300 cursor-pointer`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${settings.autoFormat ? 'left-6' : 'left-0.5'}`}></div>
                </div>
              </div>
              <p className="text-sm opacity-70">More settings coming soon...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResponseSection;
import { useState } from "react";
import GraphQLClient from "./components/GraphQLClient";
import RestApiClient from "./components/RestApiClient";
import WebSocketClient from "./components/WebSocketClient";
import Settings from "./components/Settings";

const ThemeIcon = ({ isActive, className }) => (
  <svg
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
    {isActive ? (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </>
    ) : (
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    )}
  </svg>
);

const SettingsIcon = ({ className }) => (
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
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

function App() {
  const [activeStates, setActiveStates] = useState({
    pin: false,
    theme: false, // false = dark mode (default), true = light mode
  });
  const [apiType, setApiType] = useState("rest"); // rest, graphql, websockets
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    timeout: 5000,
    autoFormat: true,
    showHeaders: true,
    followRedirects: true,
    validateSSL: true,
    maxRetries: 3,
    theme: "auto",
  });

  const toggleState = (key) => {
    setActiveStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
  };

  const isDark = !activeStates.theme; // Dark mode when theme is false

  const handleSendRequest = async (type, requestData) => {
    setLoading(true);
    try {
      if (type === "rest") {
        const headers = {};
        requestData.headers.forEach((h) => {
          if (h.key && h.value) headers[h.key] = h.value;
        });

        const options = {
          method: requestData.method,
          headers,
        };

        if (requestData.method !== "GET" && requestData.body) {
          options.body = requestData.body;
        }

        const res = await fetch(requestData.url, options);
        const data = await res.text();

        setResponse({
          status: res.status,
          statusText: res.statusText,
          headers: Object.fromEntries(res.headers),
          data: data,
        });
      } else if (type === "graphql") {
        const headers = {};
        requestData.headers.forEach((h) => {
          if (h.key && h.value) headers[h.key] = h.value;
        });

        const body = {
          query: requestData.query,
          variables: requestData.variables
            ? JSON.parse(requestData.variables)
            : {},
        };

        if (requestData.operationName) {
          body.operationName = requestData.operationName;
        }

        const res = await fetch(requestData.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: JSON.stringify(body),
        });

        const data = await res.text();

        setResponse({
          status: res.status,
          statusText: res.statusText,
          headers: Object.fromEntries(res.headers),
          data: data,
        });
      }
    } catch (error) {
      setResponse({
        status: 0,
        statusText: "Error",
        headers: {},
        data: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col w-lg min-h-[600px] transition-all custom-scrollbar duration-500 ${
        isDark ? "bg-[#141414] text-white" : "bg-white text-[#141414]"
      }`}
    >
      <header className="backdrop-blur-xl transition-all duration-500">
        <div className="flex justify-between items-center px-6 py-2">
          <p className="text-xl font-bold">zapi</p>
          <nav className="flex space-x-2 items-center">
            {[
              { key: "theme", icon: ThemeIcon, active: activeStates.theme },
              {
                key: "settings",
                icon: SettingsIcon,
                active: false,
                onClick: handleSettingsClick,
              },
            ].map(({ key, icon, active, onClick }) => (
              <button
                key={key}
                onClick={
                  onClick || (() => key !== "settings" && toggleState(key))
                }
                className={`group relative p-3 rounded-xl border transition-all duration-300 hover:scale-110 hover:rotate-3 ${
                  isDark
                    ? "bg-[#1f1f1f] border-white/10 hover:bg-[#252525] hover:border-indigo-400/50"
                    : "bg-white border-gray-200/50 hover:bg-gray-50 hover:border-indigo-400/50"
                } ${active ? "border-indigo-400/70 bg-indigo-400/10" : ""}`}
              >
                {icon &&
                  icon({
                    isActive: active,
                    className: `transition-all duration-300 ${
                      active
                        ? "text-indigo-400"
                        : isDark
                        ? "text-gray-300 group-hover:text-indigo-400"
                        : "text-gray-600 group-hover:text-indigo-400"
                    }`,
                  })}
                {active && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-indigo-400 animate-pulse" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* API Type Selection Strip */}
      <div
        className={`transition-all duration-500 w-full px-5 ${
          isDark ? "border-white/10" : "border-gray-200/50"
        }`}
      >
        <div className={`flex px-1 space-x-2 `}>
          {[
            { key: "rest", label: "REST API", icon: "" },
            { key: "graphql", label: "GraphQL", icon: "" },
            {
              key: "websocket",
              label: "WebSocket",
              icon: "",
              comingSoon: true,
            },
          ].map(({ key, label, icon, comingSoon }) => (
            <button
              key={key}
              onClick={() => !comingSoon && setApiType(key)}
              disabled={comingSoon}
              className={`flex-1 px-3 py-2 text-sm border border-zinc-700/40 font-semibold rounded-lg transition-all duration-300 relative overflow-hidden flex items-center justify-center space-x-2 ${
                apiType === key
                  ? "text-black bg-indigo-400 shadow-lg"
                  : comingSoon
                  ? isDark
                    ? "text-gray-600 cursor-not-allowed"
                    : "text-gray-400 cursor-not-allowed"
                  : isDark
                  ? "text-gray-400 hover:text-white hover:bg-[#3b3b3b]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white"
              }`}
            >
              <span className="text-base">{icon}</span>
              <span>{label}</span>
              {comingSoon && (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    isDark
                      ? "bg-gray-700 text-gray-400"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  Soon
                </span>
              )}
              {apiType === key && (
                <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Request Section */}
      <div
        className={`p-6 border-b transition-all duration-500 ${
          isDark ? "border-white/10" : "border-gray-200/50"
        }`}
      >
        {apiType === "rest" && (
          <RestApiClient
            isDark={isDark}
            loading={loading}
            onSendRequest={handleSendRequest}
          />
        )}

        {apiType === "graphql" && (
          <GraphQLClient
            isDark={isDark}
            loading={loading}
            onSendRequest={handleSendRequest}
          />
        )}

        {apiType === "websocket" && <WebSocketClient isDark={isDark} />}
      </div>

      {/* Response Section */}
      <div className="flex-1 p-6">
        <h3
          className={`text-lg font-bold mb-4 flex items-center space-x-2 ${
            isDark ? "text-white" : "text-[#141414]"
          }`}
        >
          <span>Response</span>
          {response && (
            <>
              <div
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  response.status >= 200 && response.status < 300
                    ? "text-emerald-700 bg-emerald-100"
                    : response.status >= 400
                    ? "text-red-700 bg-red-100"
                    : "text-indigo-700 bg-indigo-100"
                }`}
              >
                {`Status: ${response.status}`}
              </div>
              <div className="flex gap-4 text-sm">
                <span
                  className={`font-bold px-3 py-1 rounded-full ${
                    response.status >= 200 && response.status < 300
                      ? "text-emerald-700 bg-emerald-100"
                      : response.status >= 400
                      ? "text-red-700 bg-red-100"
                      : "text-indigo-700 bg-indigo-100"
                  }`}
                >
                  {`Status Text: ${
                    response.statusText ? response.statusText : "None"
                  }`}
                </span>
              </div>
            </>
          )}
        </h3>

        {response ? (
          <div className="space-y-4">
            <div
              className={`rounded-xl border p-4 transition-all duration-300 ${
                isDark
                  ? "bg-[#1f1f1f] border-white/10"
                  : "bg-white border-gray-200/50"
              }`}
            >
              <pre
                className={`font-mono text-sm whitespace-pre-wrap overflow-auto max-h-32 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {typeof response.data === "string" &&
                (response.data.startsWith("{") || response.data.startsWith("["))
                  ? settings.autoFormat
                    ? JSON.stringify(JSON.parse(response.data), null, 2)
                    : response.data
                  : response.data}
              </pre>
            </div>
          </div>
        ) : (
          <div
            className={`text-center py-8 rounded-xl border-2 border-dashed transition-all duration-300 ${
              isDark
                ? "border-white/10 text-gray-400"
                : "border-gray-200/50 text-gray-500"
            }`}
          >
            <div
              className={`text-4xl mb-2 ${
                isDark ? "text-white/20" : "text-gray-300"
              }`}
            >
              {apiType === "rest" ? "🚀" : apiType === "graphql" ? "⚡" : "🔌"}
            </div>
            <p className="font-medium">
              {apiType === "websocket"
                ? "WebSocket support coming soon!"
                : `Ready to launch your ${apiType.toUpperCase()} request!`}
            </p>
            <p className="text-sm mt-1">
              {apiType === "websocket"
                ? "Stay tuned for real-time communication features 🔥"
                : "Hit that Send button to see magic happen ✨"}
            </p>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      <Settings
        isOpen={showSettings}
        onClose={handleSettingsClose}
        isDark={isDark}
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
}

export default App;

import { useState } from "react";

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

  const [request, setRequest] = useState({
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    headers: [{ key: "Content-Type", value: "application/json" }],
    body: "",
  });

  const [activeTab, setActiveTab] = useState("headers");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleState = (key) => {
    setActiveStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isDark = !activeStates.theme; // Dark mode when theme is false

  const handleSendRequest = async () => {
    setLoading(true);
    try {
      const headers = {};
      request.headers.forEach((h) => {
        if (h.key && h.value) headers[h.key] = h.value;
      });

      const options = {
        method: request.method,
        headers,
      };

      if (request.method !== "GET" && request.body) {
        options.body = request.body;
      }

      const res = await fetch(request.url, options);
      const data = await res.text();

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers),
        data: data,
      });
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

  const addHeader = () => {
    setRequest((prev) => ({
      ...prev,
      headers: [...prev.headers, { key: "", value: "" }],
    }));
  };

  const updateHeader = (index, field, value) => {
    setRequest((prev) => ({
      ...prev,
      headers: prev.headers.map((h, i) =>
        i === index ? { ...h, [field]: value } : h
      ),
    }));
  };

  const removeHeader = (index) => {
    setRequest((prev) => ({
      ...prev,
      headers: prev.headers.filter((_, i) => i !== index),
    }));
  };

  const getMethodColor = (method) => {
    const colors = {
      GET: isDark
        ? "text-emerald-400 bg-emerald-900/30 border-emerald-600/50"
        : "text-emerald-700 bg-emerald-50 border-emerald-300",
      POST: isDark
        ? "text-blue-400 bg-blue-900/30 border-blue-600/50"
        : "text-blue-700 bg-blue-50 border-blue-300",
      PUT: isDark
        ? "text-orange-400 bg-orange-900/30 border-orange-600/50"
        : "text-orange-700 bg-orange-50 border-orange-300",
      DELETE: isDark
        ? "text-red-400 bg-red-900/30 border-red-600/50"
        : "text-red-700 bg-red-50 border-red-300",
      PATCH: isDark
        ? "text-purple-400 bg-purple-900/30 border-purple-600/50"
        : "text-purple-700 bg-purple-50 border-purple-300",
    };
    return colors[method] || colors.GET;
  };

  return (
    <div
      className={`flex flex-col w-lg min-h-[600px] transition-all custom-scrollbar duration-500 ${
        isDark ? "bg-[#141414] text-white" : "bg-white text-[#141414]"
      }`}
    >
      <header
        className={`backdrop-blur-xl border-b transition-all duration-500 ${
          isDark
            ? "bg-[#141414] border-white/10"
            : "bg-white border-gray-200/50"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-2">
          <p className="text-xl font-bold">zapi</p>
          <nav className="flex space-x-2 items-center">
            {[
              { key: "theme", icon: ThemeIcon, active: activeStates.theme },
              { key: "settings", icon: SettingsIcon, active: false },
            ].map(({ key, icon, active }) => (
              <button
                key={key}
                onClick={() => key !== "settings" && toggleState(key)}
                className={`group relative p-3 rounded-xl border transition-all duration-300 hover:scale-110 hover:rotate-3 ${
                  isDark
                    ? "bg-[#1f1f1f] border-white/10 hover:bg-[#252525] hover:border-yellow-400/50"
                    : "bg-white border-gray-200/50 hover:bg-gray-50 hover:border-yellow-400/50"
                } ${active ? "border-yellow-400/70 bg-yellow-400/10" : ""}`}
              >
                {icon &&
                  icon({
                    isActive: active,
                    className: `transition-all duration-300 ${
                      active
                        ? "text-yellow-400"
                        : isDark
                        ? "text-gray-300 group-hover:text-yellow-400"
                        : "text-gray-600 group-hover:text-yellow-400"
                    }`,
                  })}
                {active && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Request Section */}
      <div
        className={`p-6 border-b transition-all duration-500 ${
          isDark ? "border-white/10" : "border-gray-200/50"
        }`}
      >
        {/* Method and URL */}
        <div className="flex gap-3 mb-6">
          <div className="relative">
            <select
              value={request.method}
              onChange={(e) =>
                setRequest((prev) => ({ ...prev, method: e.target.value }))
              }
              className={`px-4 py-3 rounded-xl border font-bold text-sm transition-all duration-300 hover:scale-105 focus:scale-105 outline-none appearance-none pr-10 ${getMethodColor(
                request.method
              )} ${isDark ? "backdrop-blur-sm" : "backdrop-blur-sm"}`}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className={`w-4 h-4 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1 relative group">
            <input
              type="text"
              value={request.url}
              onChange={(e) =>
                setRequest((prev) => ({ ...prev, url: e.target.value }))
              }
              placeholder="Enter your API endpoint..."
              className={`w-full px-4 py-3 rounded-xl border font-mono text-sm transition-all duration-300 outline-none focus:scale-[1.02] ${
                isDark
                  ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:bg-[#252525]"
                  : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-yellow-400/50 focus:bg-gray-50"
              }`}
            />
            <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none bg-yellow-400/5" />
          </div>

          <button
            onClick={handleSendRequest}
            disabled={loading}
            className="px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 shadow-lg bg-yellow-400 text-black hover:bg-emerald-400 shadow-yellow-500/25"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Sending</span>
              </div>
            ) : (
              "Send ↗️"
            )}
          </button>
        </div>

        {/* Tabs */}
        <div
          className={`flex rounded-xl p-1 mb-6 ${
            isDark ? "bg-[#1f1f1f]" : "bg-gray-100"
          }`}
        >
          {["headers", "body"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 text-sm font-semibold capitalize rounded-lg transition-all duration-300 relative overflow-hidden ${
                activeTab === tab
                  ? "text-black bg-yellow-400 shadow-lg"
                  : isDark
                  ? "text-gray-400 hover:text-white hover:bg-[#252525]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "headers" && (
          <div className="space-y-3">
            {request.headers.map((header, index) => (
              <div key={index} className="flex gap-3 group">
                <input
                  type="text"
                  value={header.key}
                  onChange={(e) => updateHeader(index, "key", e.target.value)}
                  placeholder="Header key"
                  className={`flex-1 px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-300 outline-none focus:scale-105 ${
                    isDark
                      ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:bg-[#252525]"
                      : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-yellow-400/50 focus:bg-gray-50"
                  }`}
                />
                <input
                  type="text"
                  value={header.value}
                  onChange={(e) => updateHeader(index, "value", e.target.value)}
                  placeholder="Header value"
                  className={`flex-1 px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-300 outline-none focus:scale-105 ${
                    isDark
                      ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:bg-[#252525]"
                      : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-yellow-400/50 focus:bg-gray-50"
                  }`}
                />
                <button
                  onClick={() => removeHeader(index)}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 ${
                    isDark
                      ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      : "text-red-500 hover:text-red-400 hover:bg-red-100"
                  }`}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={addHeader}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-dashed transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "border-yellow-400/30 text-yellow-400 hover:border-yellow-400/50 hover:bg-yellow-400/10"
                  : "border-yellow-400/30 text-yellow-400 hover:border-yellow-400/50 hover:bg-yellow-50"
              }`}
            >
              <span className="text-lg">+</span>
              <span className="font-medium">Add Header</span>
            </button>
          </div>
        )}

        {activeTab === "body" && (
          <div className="relative group">
            <textarea
              value={request.body}
              onChange={(e) =>
                setRequest((prev) => ({ ...prev, body: e.target.value }))
              }
              placeholder="Enter request body (JSON, XML, etc.)"
              className={`w-full h-24 px-4 py-3 rounded-xl border font-mono text-sm transition-all duration-300 outline-none focus:scale-[1.02] resize-none ${
                isDark
                  ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:bg-[#252525]"
                  : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-yellow-400/50 focus:bg-gray-50"
              }`}
            />
            <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none bg-yellow-400/5" />
          </div>
        )}
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
                    : "text-yellow-700 bg-yellow-100"
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
                      : "text-yellow-700 bg-yellow-100"
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
                  ? JSON.stringify(JSON.parse(response.data), null, 2)
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
              🚀
            </div>
            <p className="font-medium">Ready to launch your request!</p>
            <p className="text-sm mt-1">
              Hit that Send button to see magic happen ✨
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

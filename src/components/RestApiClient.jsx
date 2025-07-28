import { useState } from "react";

// REST API Component
const RestApiClient = ({ isDark, loading, onSendRequest }) => {
  const [request, setRequest] = useState({
    method: "GET",
    url: "https://pokeapi.co/api/v2/pokemon/pikachu",
    headers: [{ key: "Content-Type", value: "application/json" }],
    params: [{ key: "", value: "" }],
    body: "",
    auth: {
      type: "none",
      bearer: "",
      basic: { username: "", password: "" },
      apiKey: { key: "", value: "", location: "header" },
    },
  });

  const [activeTab, setActiveTab] = useState("headers");
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);

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

  const addParam = () => {
    setRequest((prev) => ({
      ...prev,
      params: [...prev.params, { key: "", value: "" }],
    }));
  };

  const updateParam = (index, field, value) => {
    setRequest((prev) => ({
      ...prev,
      params: prev.params.map((p, i) =>
        i === index ? { ...p, [field]: value } : p
      ),
    }));
  };

  const removeParam = (index) => {
    setRequest((prev) => ({
      ...prev,
      params: prev.params.filter((_, i) => i !== index),
    }));
  };

  const updateAuth = (field, value) => {
    setRequest((prev) => ({
      ...prev,
      auth: { ...prev.auth, [field]: value },
    }));
  };

  const updateAuthNested = (section, field, value) => {
    setRequest((prev) => ({
      ...prev,
      auth: {
        ...prev.auth,
        [section]: { ...prev.auth[section], [field]: value },
      },
    }));
  };

  const buildUrlWithParams = () => {
    const validParams = request.params.filter(
      (p) => p.key.trim() && p.value.trim()
    );
    if (validParams.length === 0) return request.url;

    const url = new URL(request.url);
    validParams.forEach((param) => {
      url.searchParams.set(param.key, param.value);
    });
    return url.toString();
  };

  const handleSend = () => {
    const requestWithParams = {
      ...request,
      url: buildUrlWithParams(),
    };
    onSendRequest("rest", requestWithParams);
  };

  const handleAuthSelection = (authType) => {
    updateAuth("type", authType);
    setAuthDropdownOpen(false);
  };

  const getAuthDisplayText = () => {
    switch (request.auth.type) {
      case "none":
        return "No Auth";
      case "bearer":
        return "Bearer Token";
      case "basic":
        return "Basic Auth";
      case "apiKey":
        return "API Key";
      default:
        return "Auth";
    }
  };

  return (
    <>
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
                ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-indigo-400/50 focus:bg-[#252525]"
                : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-indigo-400/50 focus:bg-gray-50"
            }`}
          />
          <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none bg-indigo-400/5" />
        </div>

        <button
          onClick={handleSend}
          disabled={loading}
          className="px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 shadow-lg bg-indigo-400 text-black hover:bg-emerald-400 shadow-indigo-500/25"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Sending</span>
            </div>
          ) : (
            "Send"
          )}
        </button>
      </div>

      {/* Final URL Preview */}
      {request.params.some((p) => p.key.trim() && p.value.trim()) && (
        <div
          className={`mb-4 p-3 rounded-lg border ${
            isDark
              ? "bg-[#1a1a1a] border-white/10 text-gray-300"
              : "bg-gray-50 border-gray-200 text-gray-600"
          }`}
        >
          <div className="text-xs font-semibold mb-1 opacity-70">
            Final URL:
          </div>
          <div className="font-mono text-sm break-all">
            {buildUrlWithParams()}
          </div>
        </div>
      )}

      {/* Tabs and Auth Dropdown */}
      <div className="flex gap-3 mb-6">
        <div
          className={`flex rounded-xl p-1 flex-1 ${
            isDark ? "bg-[#1f1f1f]" : "bg-gray-100"
          }`}
        >
          {["params", "headers", "body"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 text-sm font-semibold capitalize rounded-lg transition-all duration-300 relative overflow-hidden ${
                activeTab === tab
                  ? "text-black bg-indigo-400 shadow-lg"
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

        {/* Auth Dropdown */}
        <div className="relative">
          <button
            onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
            className={`px-4 py-3 rounded-xl border transition-all duration-300 hover:scale-105 focus:scale-105 outline-none flex items-center space-x-2 ${
              isDark
                ? "bg-[#1f1f1f] border-white/10 text-gray-300 hover:border-indigo-400/50 focus:border-indigo-400/50 focus:bg-[#252525]"
                : "bg-white border-gray-200/50 text-gray-700 hover:border-indigo-400/50 focus:border-indigo-400/50 focus:bg-gray-50"
            }`}
          >
            <span className="text-sm font-medium whitespace-nowrap">
              {getAuthDisplayText()}
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                authDropdownOpen ? "rotate-180" : ""
              } ${isDark ? "text-gray-400" : "text-gray-600"}`}
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
          </button>

          {authDropdownOpen && (
            <div
              className={`absolute top-full right-0 mt-2 w-48 rounded-xl border shadow-lg z-50 overflow-hidden ${
                isDark
                  ? "bg-[#1f1f1f] border-white/10"
                  : "bg-white border-gray-200/50"
              }`}
            >
              <button
                onClick={() => handleAuthSelection("none")}
                className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  request.auth.type === "none"
                    ? isDark
                      ? "bg-indigo-400/20 text-indigo-400"
                      : "bg-indigo-50 text-indigo-600"
                    : isDark
                    ? "text-white hover:bg-[#252525] hover:text-indigo-400"
                    : "text-gray-900 hover:bg-gray-50 hover:text-indigo-600"
                }`}
              >
                <span>🚫</span>
                <span>No Auth</span>
              </button>

              <div
                className={`px-4 py-3 text-left text-sm font-medium flex items-center space-x-2 opacity-50 cursor-not-allowed ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                <span>⏳</span>
                <span>Coming Soon</span>
              </div>

              <button
                onClick={() => handleAuthSelection("bearer")}
                className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  request.auth.type === "bearer"
                    ? isDark
                      ? "bg-indigo-400/20 text-indigo-400"
                      : "bg-indigo-50 text-indigo-600"
                    : isDark
                    ? "text-white hover:bg-[#252525] hover:text-indigo-400"
                    : "text-gray-900 hover:bg-gray-50 hover:text-indigo-600"
                }`}
              >
                <span>🔑</span>
                <span>Bearer Token</span>
              </button>
              <button
                onClick={() => handleAuthSelection("basic")}
                className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  request.auth.type === "basic"
                    ? isDark
                      ? "bg-indigo-400/20 text-indigo-400"
                      : "bg-indigo-50 text-indigo-600"
                    : isDark
                    ? "text-white hover:bg-[#252525] hover:text-indigo-400"
                    : "text-gray-900 hover:bg-gray-50 hover:text-indigo-600"
                }`}
              >
                <span>👤</span>
                <span>Basic Auth</span>
              </button>
              <button
                onClick={() => handleAuthSelection("apiKey")}
                className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  request.auth.type === "apiKey"
                    ? isDark
                      ? "bg-indigo-400/20 text-indigo-400"
                      : "bg-indigo-50 text-indigo-600"
                    : isDark
                    ? "text-white hover:bg-[#252525] hover:text-indigo-400"
                    : "text-gray-900 hover:bg-gray-50 hover:text-indigo-600"
                }`}
              >
                <span>🗝️</span>
                <span>API Key</span>
              </button>
            </div>
          )}

          {/* Click outside to close */}
          {authDropdownOpen && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setAuthDropdownOpen(false)}
            />
          )}
        </div>
      </div>

      {/* Auth Configuration (shows when auth type is not "none") */}
      {request.auth.type !== "none" && (
        <div className="mb-6">
          <div
            className={`p-4 rounded-lg border ${
              isDark
                ? "bg-[#1a1a1a] border-white/10"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 mb-3">
                <span className="font-semibold">Authentication</span>
              </div>
              <div className="text-sm opacity-70 mb-4">
                Current:{" "}
                <span className="font-medium capitalize">
                  {getAuthDisplayText()}
                </span>
              </div>
            </div>

            {request.auth.type === "bearer" && (
              <div className="space-y-3">
                <label className="block text-sm font-medium opacity-70">
                  Bearer Token
                </label>
                <input
                  type="password"
                  value={request.auth.bearer}
                  onChange={(e) => updateAuth("bearer", e.target.value)}
                  placeholder="Enter your bearer token"
                  className={`w-full px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-300 outline-none focus:scale-105 ${
                    isDark
                      ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-indigo-400/50 focus:bg-[#252525]"
                      : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-indigo-400/50 focus:bg-gray-50"
                  }`}
                />
              </div>
            )}

            {request.auth.type === "basic" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium opacity-70 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={request.auth.basic.username}
                    onChange={(e) =>
                      updateAuthNested("basic", "username", e.target.value)
                    }
                    placeholder="Enter username"
                    className={`w-full px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-300 outline-none focus:scale-105 ${
                      isDark
                        ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-indigo-400/50 focus:bg-[#252525]"
                        : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-indigo-400/50 focus:bg-gray-50"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium opacity-70 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={request.auth.basic.password}
                    onChange={(e) =>
                      updateAuthNested("basic", "password", e.target.value)
                    }
                    placeholder="Enter password"
                    className={`w-full px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-300 outline-none focus:scale-105 ${
                      isDark
                        ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-indigo-400/50 focus:bg-[#252525]"
                        : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-indigo-400/50 focus:bg-gray-50"
                    }`}
                  />
                </div>
              </div>
            )}

            {request.auth.type === "apiKey" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium opacity-70 mb-2">
                    Key
                  </label>
                  <input
                    type="text"
                    value={request.auth.apiKey.key}
                    onChange={(e) =>
                      updateAuthNested("apiKey", "key", e.target.value)
                    }
                    placeholder="e.g., X-API-Key, Authorization"
                    className={`w-full px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-300 outline-none focus:scale-105 ${
                      isDark
                        ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-indigo-400/50 focus:bg-[#252525]"
                        : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-indigo-400/50 focus:bg-gray-50"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium opacity-70 mb-2">
                    Value
                  </label>
                  <input
                    type="password"
                    value={request.auth.apiKey.value}
                    onChange={(e) =>
                      updateAuthNested("apiKey", "value", e.target.value)
                    }
                    placeholder="Enter your API key"
                    className={`w-full px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-300 outline-none focus:scale-105 ${
                      isDark
                        ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-indigo-400/50 focus:bg-[#252525]"
                        : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-indigo-400/50 focus:bg-gray-50"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium opacity-70 mb-2">
                    Add to
                  </label>
                  <select
                    value={request.auth.apiKey.location}
                    onChange={(e) =>
                      updateAuthNested("apiKey", "location", e.target.value)
                    }
                    className={`w-full px-4 py-2 rounded-lg border text-sm transition-all duration-300 outline-none focus:scale-105 ${
                      isDark
                        ? "bg-[#1f1f1f] border-white/10 text-white focus:border-indigo-400/50 focus:bg-[#252525]"
                        : "bg-white border-gray-200/50 text-[#141414] focus:border-indigo-400/50 focus:bg-gray-50"
                    }`}
                  >
                    <option value="header">Header</option>
                    <option value="query">Query Parameter</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === "params" && (
        <div className="space-y-3">
          {request.params.map((param, index) => (
            <div key={index} className="flex gap-3 group">
              <input
                type="text"
                value={param.key}
                onChange={(e) => updateParam(index, "key", e.target.value)}
                placeholder="Parameter name"
                className={`flex-1 px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-300 outline-none focus:scale-105 ${
                  isDark
                    ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-indigo-400/50 focus:bg-[#252525]"
                    : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-indigo-400/50 focus:bg-gray-50"
                }`}
              />
              <input
                type="text"
                value={param.value}
                onChange={(e) => updateParam(index, "value", e.target.value)}
                placeholder="Parameter value"
                className={`flex-1 px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-300 outline-none focus:scale-105 ${
                  isDark
                    ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-indigo-400/50 focus:bg-[#252525]"
                    : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-indigo-400/50 focus:bg-gray-50"
                }`}
              />
              <button
                onClick={() => removeParam(index)}
                className={`px-3 py-1 rounded-lg transition-all duration-300 hover:scale-110 opacity-30 group-hover:opacity-100 ${
                  isDark
                    ? "text-red-400 hover:text-red-300 hover:bg-red-500/80"
                    : "text-red-500 hover:text-red-400 hover:bg-red-100"
                }`}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={addParam}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-dashed transition-all duration-300 hover:scale-105 ${
              isDark
                ? "border-indigo-400/30 text-indigo-400 hover:border-indigo-400/50 hover:bg-indigo-400/10"
                : "border-indigo-400/30 text-indigo-400 hover:border-indigo-400/50 hover:bg-indigo-50"
            }`}
          >
            <span className="text-lg">+</span>
            <span className="font-medium">Add Parameter</span>
          </button>
        </div>
      )}

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
                    ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-indigo-400/50 focus:bg-[#252525]"
                    : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-indigo-400/50 focus:bg-gray-50"
                }`}
              />
              <input
                type="text"
                value={header.value}
                onChange={(e) => updateHeader(index, "value", e.target.value)}
                placeholder="Header value"
                className={`flex-1 px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-300 outline-none focus:scale-105 ${
                  isDark
                    ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-indigo-400/50 focus:bg-[#252525]"
                    : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-indigo-400/50 focus:bg-gray-50"
                }`}
              />
              <button
                onClick={() => removeHeader(index)}
                className={`px-3 py-2 rounded-lg transition-all duration-300 hover:scale-110 opacity-30 group-hover:opacity-100 ${
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
                ? "border-indigo-400/30 text-indigo-400 hover:border-indigo-400/50 hover:bg-indigo-400/10"
                : "border-indigo-400/30 text-indigo-400 hover:border-indigo-400/50 hover:bg-indigo-50"
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
                ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-indigo-400/50 focus:bg-[#252525]"
                : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-indigo-400/50 focus:bg-gray-50"
            }`}
          />
          <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none bg-indigo-400/5" />
        </div>
      )}
    </>
  );
};

export default RestApiClient;

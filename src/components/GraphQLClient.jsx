import { useState } from "react";

// GraphQL Client Component
const GraphQLClient = ({ isDark, loading, onSendRequest }) => {
  const [graphqlRequest, setGraphqlRequest] = useState({
    url: "https://beta.pokeapi.co/graphql/v1beta",
    headers: [{ key: "Authorization", value: "Bearer YOUR_TOKEN" }],
    query: `query {
      pokemon_v2_pokemon(limit: 5) {
        id
        name
        height
        weight
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }`,
    variables: "{}",
    operationName: "",
    auth: {
      type: "none",
      bearer: "",
      basic: { username: "", password: "" },
      apiKey: { key: "", value: "", location: "header" }
    }
  });

  const [activeTab, setActiveTab] = useState("query");
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);

  const addHeader = () => {
    setGraphqlRequest((prev) => ({
      ...prev,
      headers: [...prev.headers, { key: "", value: "" }],
    }));
  };

  const updateHeader = (index, field, value) => {
    setGraphqlRequest((prev) => ({
      ...prev,
      headers: prev.headers.map((h, i) =>
        i === index ? { ...h, [field]: value } : h
      ),
    }));
  };

  const removeHeader = (index) => {
    setGraphqlRequest((prev) => ({
      ...prev,
      headers: prev.headers.filter((_, i) => i !== index),
    }));
  };

  const updateAuth = (field, value) => {
    setGraphqlRequest((prev) => ({
      ...prev,
      auth: { ...prev.auth, [field]: value }
    }));
  };

  const updateAuthNested = (section, field, value) => {
    setGraphqlRequest((prev) => ({
      ...prev,
      auth: {
        ...prev.auth,
        [section]: { ...prev.auth[section], [field]: value }
      }
    }));
  };

  const handleAuthSelection = (authType) => {
    updateAuth("type", authType);
    setAuthDropdownOpen(false);
  };

  const getAuthDisplayText = () => {
    switch (graphqlRequest.auth.type) {
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

  const handleSend = () => {
    onSendRequest("graphql", graphqlRequest);
  };

  return (
    <>
      {/* GraphQL URL */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative group">
          <input
            type="text"
            value={graphqlRequest.url}
            onChange={(e) =>
              setGraphqlRequest((prev) => ({
                ...prev,
                url: e.target.value,
              }))
            }
            placeholder="Enter your GraphQL endpoint..."
            className={`w-full px-4 py-3 rounded-xl border font-mono text-sm transition-all duration-300 outline-none focus:scale-[1.02] ${
              isDark
                ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:bg-[#252525]"
                : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-yellow-400/50 focus:bg-gray-50"
            }`}
          />
          <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none bg-yellow-400/5" />
        </div>

        <button
          onClick={handleSend}
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

      {/* GraphQL Tabs and Auth Dropdown */}
      <div className="flex gap-3 mb-6">
        <div
          className={`flex rounded-xl p-1 flex-1 ${
            isDark ? "bg-[#1f1f1f]" : "bg-gray-100"
          }`}
        >
          {["query", "variables", "headers"].map((tab) => (
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

        {/* Auth Dropdown */}
        <div className="relative">
          <button
            onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
            className={`px-4 py-3 rounded-xl border transition-all duration-300 hover:scale-105 focus:scale-105 outline-none flex items-center space-x-2 ${
              isDark
                ? "bg-[#1f1f1f] border-white/10 text-gray-300 hover:border-yellow-400/50 focus:border-yellow-400/50 focus:bg-[#252525]"
                : "bg-white border-gray-200/50 text-gray-700 hover:border-yellow-400/50 focus:border-yellow-400/50 focus:bg-gray-50"
            }`}
          >
            <span className="text-sm font-medium whitespace-nowrap">{getAuthDisplayText()}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${authDropdownOpen ? 'rotate-180' : ''} ${
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
          </button>
          
          {authDropdownOpen && (
            <div className={`absolute top-full right-0 mt-2 w-48 rounded-xl border shadow-lg z-50 overflow-hidden ${
              isDark 
                ? "bg-[#1f1f1f] border-white/10" 
                : "bg-white border-gray-200/50"
            }`}>
              <button
                onClick={() => handleAuthSelection("none")}
                className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  graphqlRequest.auth.type === "none" 
                    ? (isDark ? "bg-yellow-400/20 text-yellow-400" : "bg-yellow-50 text-yellow-600")
                    : (isDark ? "text-white hover:bg-[#252525] hover:text-yellow-400" : "text-gray-900 hover:bg-gray-50 hover:text-yellow-600")
                }`}
              >
                <span>🚫</span>
                <span>No Auth</span>
              </button>
              
              <div className={`px-4 py-3 text-left text-sm font-medium flex items-center space-x-2 opacity-50 cursor-not-allowed ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}>
                <span>⏳</span>
                <span>Coming Soon</span>
              </div>
              
              <button
                onClick={() => handleAuthSelection("bearer")}
                className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  graphqlRequest.auth.type === "bearer" 
                    ? (isDark ? "bg-yellow-400/20 text-yellow-400" : "bg-yellow-50 text-yellow-600")
                    : (isDark ? "text-white hover:bg-[#252525] hover:text-yellow-400" : "text-gray-900 hover:bg-gray-50 hover:text-yellow-600")
                }`}
              >
                <span>🔑</span>
                <span>Bearer Token</span>
              </button>
              <button
                onClick={() => handleAuthSelection("basic")}
                className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  graphqlRequest.auth.type === "basic" 
                    ? (isDark ? "bg-yellow-400/20 text-yellow-400" : "bg-yellow-50 text-yellow-600")
                    : (isDark ? "text-white hover:bg-[#252525] hover:text-yellow-400" : "text-gray-900 hover:bg-gray-50 hover:text-yellow-600")
                }`}
              >
                <span>👤</span>
                <span>Basic Auth</span>
              </button>
              <button
                onClick={() => handleAuthSelection("apiKey")}
                className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  graphqlRequest.auth.type === "apiKey" 
                    ? (isDark ? "bg-yellow-400/20 text-yellow-400" : "bg-yellow-50 text-yellow-600")
                    : (isDark ? "text-white hover:bg-[#252525] hover:text-yellow-400" : "text-gray-900 hover:bg-gray-50 hover:text-yellow-600")
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
      {graphqlRequest.auth.type !== "none" && (
        <div className="mb-6">
          <div className={`p-4 rounded-lg border ${
            isDark 
              ? "bg-[#1a1a1a] border-white/10" 
              : "bg-gray-50 border-gray-200"
          }`}>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-lg">🔐</span>
              <span className="font-semibold">Authentication</span>
            </div>
            <div className="text-sm opacity-70 mb-4">
              Current: <span className="font-medium capitalize">{getAuthDisplayText()}</span>
            </div>
            
            {graphqlRequest.auth.type === "bearer" && (
              <div className="space-y-3">
                <label className="block text-sm font-medium opacity-70">Bearer Token</label>
                <input
                  type="password"
                  value={graphqlRequest.auth.bearer}
                  onChange={(e) => updateAuth("bearer", e.target.value)}
                  placeholder="Enter your bearer token"
                  className={`w-full px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-300 outline-none focus:scale-105 ${
                    isDark
                      ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:bg-[#252525]"
                      : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-yellow-400/50 focus:bg-gray-50"
                  }`}
                />
              </div>
            )}

            {graphqlRequest.auth.type === "basic" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium opacity-70 mb-2">Username</label>
                  <input
                    type="text"
                    value={graphqlRequest.auth.basic.username}
                    onChange={(e) => updateAuthNested("basic", "username", e.target.value)}
                    placeholder="Enter username"
                    className={`w-full px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-300 outline-none focus:scale-105 ${
                      isDark
                        ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:bg-[#252525]"
                        : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-yellow-400/50 focus:bg-gray-50"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium opacity-70 mb-2">Password</label>
                  <input
                    type="password"
                    value={graphqlRequest.auth.basic.password}
                    onChange={(e) => updateAuthNested("basic", "password", e.target.value)}
                    placeholder="Enter password"
                    className={`w-full px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-300 outline-none focus:scale-105 ${
                      isDark
                        ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:bg-[#252525]"
                        : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-yellow-400/50 focus:bg-gray-50"
                    }`}
                  />
                </div>
              </div>
            )}

            {graphqlRequest.auth.type === "apiKey" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium opacity-70 mb-2">Key</label>
                  <input
                    type="text"
                    value={graphqlRequest.auth.apiKey.key}
                    onChange={(e) => updateAuthNested("apiKey", "key", e.target.value)}
                    placeholder="e.g., X-API-Key, Authorization"
                    className={`w-full px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-300 outline-none focus:scale-105 ${
                      isDark
                        ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:bg-[#252525]"
                        : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-yellow-400/50 focus:bg-gray-50"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium opacity-70 mb-2">Value</label>
                  <input
                    type="password"
                    value={graphqlRequest.auth.apiKey.value}
                    onChange={(e) => updateAuthNested("apiKey", "value", e.target.value)}
                    placeholder="Enter your API key"
                    className={`w-full px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-300 outline-none focus:scale-105 ${
                      isDark
                        ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:bg-[#252525]"
                        : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-yellow-400/50 focus:bg-gray-50"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium opacity-70 mb-2">Add to</label>
                  <select
                    value={graphqlRequest.auth.apiKey.location}
                    onChange={(e) => updateAuthNested("apiKey", "location", e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border text-sm transition-all duration-300 outline-none focus:scale-105 ${
                      isDark
                        ? "bg-[#1f1f1f] border-white/10 text-white focus:border-yellow-400/50 focus:bg-[#252525]"
                        : "bg-white border-gray-200/50 text-[#141414] focus:border-yellow-400/50 focus:bg-gray-50"
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
      {activeTab === "query" && (
        <div className="space-y-4">
          <div className="relative group">
            <textarea
              value={graphqlRequest.query}
              onChange={(e) =>
                setGraphqlRequest((prev) => ({
                  ...prev,
                  query: e.target.value,
                }))
              }
              placeholder="Enter your GraphQL query..."
              className={`w-full h-40 px-4 py-3 rounded-xl border font-mono text-sm transition-all duration-300 outline-none focus:scale-[1.02] resize-none ${
                isDark
                  ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:bg-[#252525]"
                  : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-yellow-400/50 focus:bg-gray-50"
              }`}
            />
            <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none bg-yellow-400/5" />
          </div>

          <div className="relative group">
            <input
              type="text"
              value={graphqlRequest.operationName}
              onChange={(e) =>
                setGraphqlRequest((prev) => ({
                  ...prev,
                  operationName: e.target.value,
                }))
              }
              placeholder="Operation Name (optional)"
              className={`w-full px-4 py-3 rounded-xl border font-mono text-sm transition-all duration-300 outline-none focus:scale-[1.02] ${
                isDark
                  ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:bg-[#252525]"
                  : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-yellow-400/50 focus:bg-gray-50"
              }`}
            />
            <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none bg-yellow-400/5" />
          </div>
        </div>
      )}

      {activeTab === "variables" && (
        <div className="relative group">
          <textarea
            value={graphqlRequest.variables}
            onChange={(e) =>
              setGraphqlRequest((prev) => ({
                ...prev,
                variables: e.target.value,
              }))
            }
            placeholder="Enter GraphQL variables (JSON format)..."
            className={`w-full h-32 px-4 py-3 rounded-xl border font-mono text-sm transition-all duration-300 outline-none focus:scale-[1.02] resize-none ${
              isDark
                ? "bg-[#1f1f1f] border-white/10 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:bg-[#252525]"
                : "bg-white border-gray-200/50 text-[#141414] placeholder-gray-500 focus:border-yellow-400/50 focus:bg-gray-50"
            }`}
          />
          <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none bg-yellow-400/5" />
        </div>
      )}

      {activeTab === "headers" && (
        <div className="space-y-3">
          {graphqlRequest.headers.map((header, index) => (
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
                ? "border-yellow-400/30 text-yellow-400 hover:border-yellow-400/50 hover:bg-yellow-400/10"
                : "border-yellow-400/30 text-yellow-400 hover:border-yellow-400/50 hover:bg-yellow-50"
            }`}
          >
            <span className="text-lg">+</span>
            <span className="font-medium">Add Header</span>
          </button>
        </div>
      )}
    </>
  );
};

export default GraphQLClient;
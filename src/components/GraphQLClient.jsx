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
  });

  const [activeTab, setActiveTab] = useState("query");

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

      {/* GraphQL Tabs */}
      <div
        className={`flex rounded-xl p-1 mb-6 ${
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

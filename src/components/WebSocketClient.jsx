// WebSocket Client Component (Placeholder)
const WebSocketClient = ({ isDark }) => {
  return (
    <div
      className={`text-center py-8 rounded-xl border-2 border-dashed transition-all duration-300 ${
        isDark
          ? "border-white/10 text-gray-400"
          : "border-gray-200/50 text-gray-500"
      }`}
    >
      <div className={`text-4xl mb-2 ${isDark ? "text-white/20" : "text-gray-300"}`}>
        🔌
      </div>
      <p className="font-medium">WebSocket support coming soon!</p>
      <p className="text-sm mt-1">Stay tuned for real-time communication features 🔥</p>
    </div>
  );
};

export default WebSocketClient;
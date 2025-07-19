import { useState } from "react";

const PinIcon = ({ isActive, className }) => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {isActive ? (
      // Unpin icon
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-pin-off-icon lucide-pin-off"
        >
          <path d="M12 17v5" />
          <path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89" />
          <path d="m2 2 20 20" />
          <path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11" />
        </svg>
      </>
    ) : (
      // Pin icon
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-pin-icon lucide-pin"
        >
          <path d="M12 17v5" />
          <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
        </svg>
      </>
    )}
  </svg>
);

const ThemeIcon = ({ isActive, className }) => (
  <svg
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
    {isActive ? (
      // Light mode icon (sun)
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-sun-icon lucide-sun"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </>
    ) : (
      // Dark mode icon (moon)
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-moon-icon lucide-moon"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    )}
  </svg>
);

const ExportIcon = ({ className }) => (
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   width="18"
  //   height="18"
  //   viewBox="0 0 24 24"
  //   fill="none"
  //   stroke="currentColor"
  //   stroke-width="2"
  //   stroke-linecap="round"
  //   stroke-linejoin="round"
  //   class={className}
  // >
  //   <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
  //   <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  //   <path d="M12 12v6" />
  //   <path d="m15 15-3-3-3 3" />
  // </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class={className}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

function App() {
  const [activeStates, setActiveStates] = useState({
    pin: false,
    theme: false,
  });

  const toggleState = (key) => {
    setActiveStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col bg-[#141414] w-md min-h-[550px]">
      {/* Header */}
      <header className="text-white text-center py-2 flex justify-between items-center px-4 fixed w-full">
        <p className="text-xl font-bold">zapi</p>
        <nav className="flex space-x-2">
          <button
            onClick={() => toggleState("pin")}
            className="p-2 rounded-full border border-yellow-400 transition-all duration-200"
          >
            <PinIcon
              isActive={activeStates.pin}
              className="transition-all duration-200 text-yellow-400"
            />
          </button>
          <button
            onClick={() => toggleState("theme")}
            className="p-2 rounded-full border border-yellow-400 transition-all duration-200"
          >
            <ThemeIcon
              isActive={activeStates.theme}
              className="transition-all duration-200 text-yellow-400"
            />
          </button>
          <button className="p-2 rounded-full border border-yellow-400 bg-transparent transition-all duration-200">
            <ExportIcon className="transition-all duration-200 text-yellow-400" />
          </button>
        </nav>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <p className="text-lg text-gray-400 mb-6 text-center max-w-md">
          This is a extension using React & Tailwind CSS.
        </p>
        <button
          onClick={() => {
            alert(
              "New Note button clicked! This is the functionality to create a new note."
            );
          }}
          className="px-4 py-1.5 flex items-center font-semibold justify-between bg-yellow-300 text-black hover:bg-transparent hover:text-yellow-300 border border-yellow-300 transition-colors rounded-full"
        >
          New Note
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="ml-1"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </button>
      </main>
    </div>
  );
}

export default App;

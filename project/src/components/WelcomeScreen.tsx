import { useEffect, useState } from 'react';

export function WelcomeScreen() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Set a timer to hide the welcome screen after 2 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    // Cleanup timer if component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (!showWelcome) return null;

  return (
    <div className="fixed inset-0 bg-teal-900 flex items-center justify-center z-50">
      <h1 className="text-4xl font-bold text-amber-400 animate-fade-in">
        Your Manga Tracking App
      </h1>
    </div>
  );
}

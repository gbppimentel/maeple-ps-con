import { useState, useEffect } from "react";

export default function MobileGate({ children }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => {
      const hasTouch =
        navigator.maxTouchPoints > 0 || "ontouchend" in document;
      const isLargeScreen = window.innerWidth > 1024;
      setIsDesktop(!hasTouch && isLargeScreen);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isDesktop) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center text-white font-body space-y-3">
          <p className="text-lg">Hi Mae 👋</p>
          <p className="text-lg">
            Mobile device required xori wahshdaha 🥹
          </p>
          <p className="text-lg">
            Open mo nalang yung link sa phone mo or sa iPad hehe ❤️
          </p>
        </div>
      </div>
    );
  }

  return children;
}
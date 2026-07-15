import { useState, useRef } from "react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const NO_TEXTS = [
  "No",
  "NO",
  "sabi ko na eto pipindutin mo e",
  "sure kaa?",
  "ayaw nga?",
  "please grr",
  "aba aba...",
  "22o bayan??",
  "naur",
  "nakakailan ka na kaya?",
  "HAHA HOY",
  "awa na,, aq na to mae oh",
  "plssss",
  "hmp",
  "weh???",
  "huhhhhh",
  "wag naman :(",
  "cmonnn",
  "retry??",
  "ikaw talaga eh",
  "loko ka HAHAHA",
  "behave pls",
  "di counted yan",
  "invalid answer detected",
  "system says NO to your NO",
  "error 404: rejection not found",
  "this button disagrees",
  "ayusin mo nga",
  "sige nga ulit",
  "promise last reject?",
  "Lord... tulungan Mo ako",
  "srsly??",
  "mae pls",
  "sobra naman",
  "ok lang yan pero no",
  "wait lang",
  "loading rejection...",
  "[REDACTED]",
  "???",
  "hmm",
  "sige na please",
  "one more chance?",
  "di na pwede NO",
  "NO button under maintenance",
  "pwede YES na lang?",
  "feeling ko YES talaga dapat",
  "press YES na please",
  "ayoko na mag NO",
  "eto na, last na talaga",
  "sige YES na, please?",
  "mae... YES na?",
  "ok fine, NO is broken. try YES",
];

const SPEECH_BUBBLES = [
  "sige pa?",
  "HAHA mae",
  "think again~",
  "mag YES ka na",
  "bawal ang NO dito",
  "nice try though",
  "awat na",
  "YES na kasi",
  "hala ka",
  "dedma mode? no",
  "sige, i-deny mo pa",
];

const ANIM_EFFECTS = [
  { x: [0, -12, 12, -8, 8, -4, 4, 0], transition: { duration: 0.5 } },
  { x: [0, -3, 3, -3, 3, -3, 3, 0], transition: { duration: 0.3 } },
  { rotate: [0, -15, 15, -10, 10, 0], transition: { duration: 0.6 } },
  { y: [0, -30, 0, -20, 0, -10, 0], transition: { duration: 0.5 } },
  { scale: [1, 1.3, 0.9, 1.2, 1], transition: { duration: 0.4 } },
  { opacity: [1, 0.2, 1, 0.3, 1, 0.1, 1], transition: { duration: 0.4 } },
  { scaleX: [1, 1.8, 0.7, 1.3, 1], transition: { duration: 0.4 } },
  { scaleY: [1, 0.4, 1.3, 0.8, 1], transition: { duration: 0.4 } },
  { rotate: [0, 360], transition: { duration: 0.5 } },
  { rotateY: [0, 180, 360], transition: { duration: 0.5 } },
  { scale: [1, 0.3, 1.2, 1], transition: { duration: 0.4 } },
  { rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 0.95, 1.05, 1], transition: { duration: 0.5 } },
];

const STYLE_VARIANTS = [
  { borderRadius: "50%" },
  { borderRadius: "4px" },
  { borderRadius: "30px 4px 30px 4px" },
  { borderRadius: "50% 20% 50% 20%" },
  { borderRadius: "0px" },
  { borderRadius: "80px", boxShadow: "0 0 40px rgba(204,255,0,0.3)" },
  { borderRadius: "16px 48px 16px 48px" },
  { borderRadius: "9999px" },
];

const SPECIAL_EFFECTS = [
  "loading",
  "hidden",
  "tiny",
  "frozen",
  "confetti",
  "swap",
  "glitch",
  "transform_yes",
];

export default function NoButtonMechanic({ onYes }) {
  const [noClicks, setNoClicks] = useState(0);
  const [noText, setNoText] = useState(NO_TEXTS[0]);
  const [yesScale, setYesScale] = useState(1);
  const [noStyle, setNoStyle] = useState({});
  const [specialEffect, setSpecialEffect] = useState(null);
  const [speechBubble, setSpeechBubble] = useState(null);
  const [swapped, setSwapped] = useState(false);
  const [noDisabled, setNoDisabled] = useState(false);
  const [noHidden, setNoHidden] = useState(false);
  const [tinyMode, setTinyMode] = useState(false);

  const noControls = useAnimationControls();
  const noBtnRef = useRef(null);

  const triggerSpecial = (name) => {
    switch (name) {
      case "loading":
        setNoDisabled(true);
        setSpecialEffect("loading");
        setTimeout(() => {
          setNoDisabled(false);
          setSpecialEffect(null);
        }, 1400);
        break;
      case "hidden":
        setNoHidden(true);
        setSpecialEffect("hidden");
        setTimeout(() => {
          setNoHidden(false);
          setSpecialEffect(null);
        }, 1000);
        break;
      case "tiny":
        setTinyMode(true);
        setSpecialEffect("tiny");
        setTimeout(() => {
          setTinyMode(false);
          setSpecialEffect(null);
        }, 1200);
        break;
      case "frozen":
        setNoDisabled(true);
        setSpecialEffect("frozen");
        setTimeout(() => {
          setNoDisabled(false);
          setSpecialEffect(null);
        }, 1600);
        break;
      case "confetti":
        if (noBtnRef.current) {
          const rect = noBtnRef.current.getBoundingClientRect();
          confetti({
            particleCount: 20,
            spread: 360,
            startVelocity: 25,
            origin: {
              x: (rect.left + rect.width / 2) / window.innerWidth,
              y: (rect.top + rect.height / 2) / window.innerHeight,
            },
            colors: ["#CCFF00", "#FF6B9D", "#FFFFFF"],
            scalar: 0.7,
          });
        }
        break;
      case "swap":
        setSwapped(true);
        setTimeout(() => setSwapped(false), 2000);
        break;
      case "glitch":
        noControls.start({
          x: [0, -8, 8, -4, 4, 0],
          opacity: [1, 0.3, 1, 0.5, 1],
          filter: ["blur(0px)", "blur(3px)", "blur(0px)"],
          transition: { duration: 0.4 },
        });
        break;
      case "transform_yes":
        setSpecialEffect("transform_yes");
        setTimeout(() => setSpecialEffect(null), 1500);
        break;
    }
  };

  const handleNoClick = () => {
    if (noDisabled || noHidden) return;

    const count = noClicks + 1;
    setNoClicks(count);
    setNoText(NO_TEXTS[Math.min(count, NO_TEXTS.length - 1)]);
    setYesScale(Math.min(1 + count * 0.035, 1.55));

    // Style change
    setNoStyle(STYLE_VARIANTS[count % STYLE_VARIANTS.length]);

    // Special effect every 3rd click
    if (count % 3 === 0) {
      const effectIdx = Math.floor(count / 3) - 1;
      const effectName = SPECIAL_EFFECTS[effectIdx % SPECIAL_EFFECTS.length];
      triggerSpecial(effectName);
    } else {
      // Regular animation
      const anim = ANIM_EFFECTS[count % ANIM_EFFECTS.length];
      noControls.start(anim);

      // Random dodge (20% chance)
      if (Math.random() > 0.8) {
        const dx = (Math.random() - 0.5) * 140;
        const dy = (Math.random() - 0.5) * 70;
        noControls
          .start({
            x: dx,
            y: dy,
            transition: { type: "spring", stiffness: 300, damping: 15 },
          })
          .then(() =>
            noControls.start({ x: 0, y: 0, transition: { duration: 0.4 } })
          );
      }
    }

    // Speech bubble (40% chance)
    if (Math.random() > 0.6) {
      setSpeechBubble(
        SPEECH_BUBBLES[Math.floor(Math.random() * SPEECH_BUBBLES.length)]
      );
      setTimeout(() => setSpeechBubble(null), 1800);
    }
  };

  const handleYes = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#CCFF00", "#FF6B9D", "#FFFFFF", "#9966FF"],
    });
    setTimeout(() => onYes(), 600);
  };

  const getNoButtonContent = () => {
    if (specialEffect === "loading") return "⏳";
    if (specialEffect === "frozen") return "❄️";
    if (specialEffect === "transform_yes") return "YES?";
    if (specialEffect === "hidden") return "...";
    return noText;
  };

  const yesButton = (
    <motion.button
      animate={{ scale: yesScale }}
      whileHover={{ scale: yesScale * 1.06 }}
      whileTap={{ scale: yesScale * 0.94 }}
      onClick={handleYes}
      className="flex-1 py-5 rounded-2xl font-heading font-extrabold text-xl text-[#050505] bg-gradient-to-br from-[#CCFF00] to-[#A8D900] shadow-[0_0_30px_rgba(204,255,0,0.4)] transition-shadow"
      style={{
        boxShadow: `0 0 ${20 + noClicks * 4}px rgba(204, 255, 0, ${Math.min(
          0.2 + noClicks * 0.03,
          0.6
        )})`,
      }}
    >
      YES
    </motion.button>
  );

  const noButton = (
    <motion.div
      animate={{
        opacity: noHidden ? 0 : 1,
        scale: tinyMode ? 0.2 : 1,
      }}
      transition={{ duration: 0.3 }}
      className="flex-1 relative"
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {speechBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/10 backdrop-blur-md text-white text-xs px-3 py-2 rounded-xl border border-white/15 z-20"
          >
            {speechBubble}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/10 rotate-45 border-r border-b border-white/15" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={noBtnRef}
        animate={noControls}
        style={{
          ...noStyle,
          cursor: noDisabled ? "not-allowed" : "pointer",
        }}
        disabled={noDisabled}
        onClick={handleNoClick}
        className="w-full py-5 rounded-2xl font-heading font-bold text-lg text-white bg-white/8 border border-white/15 backdrop-blur-sm"
      >
        {getNoButtonContent()}
      </motion.button>
    </motion.div>
  );

  return (
    <div className="relative">
      <div className="flex flex-row gap-3 items-stretch">
        {swapped ? (
          <>
            {noButton}
            {yesButton}
          </>
        ) : (
          <>
            {yesButton}
            {noButton}
          </>
        )}
      </div>

    </div>
  );
}
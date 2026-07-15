import MobileGate from "@/components/MobileGate";
import Decorations from "@/components/Decorations";
import Hero from "@/components/Hero";
import ConcertSection from "@/components/ConcertSection";
import PlanetboomSection from "@/components/PlanetboomSection";
import SVIPSection from "@/components/SVIPSection";
import NotesSection from "@/components/NotesSection";
import DecisionSection from "@/components/DecisionSection";

export default function InvitePage() {
  return (
    <MobileGate>
      <div className="relative min-h-screen bg-[#050505] overflow-x-hidden">
        <Decorations />
        <div className="relative z-10">
          <Hero />
          <ConcertSection />
          <PlanetboomSection />
          <SVIPSection />
          <NotesSection />
          <DecisionSection />
        </div>
      </div>
    </MobileGate>
  );
}
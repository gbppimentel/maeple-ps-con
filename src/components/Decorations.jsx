import { inviteContent } from "@/data/inviteContent";

export default function Decorations() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <img
        src={inviteContent.concert.images.bg}
        alt=""
        className="w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-[#050505]/75" />
    </div>
  );
}
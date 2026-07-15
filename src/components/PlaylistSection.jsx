import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { inviteContent } from "@/data/inviteContent";

export default function PlaylistSection() {
  const { playlist } = inviteContent;

  return (
    <motion.a
      href={playlist.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-4 rounded-2xl p-4 bg-[#1DB954] shadow-lg w-full"
    >
      <img
        src={playlist.spotifyLogo}
        alt="Spotify"
        className="w-11 h-11 rounded-xl flex-shrink-0"
      />
      <span className="text-white font-semibold text-base flex-1 text-left">
        Open on Spotify
      </span>
      <Play className="text-white/80" size={18} fill="currentColor" />
    </motion.a>
  );
}
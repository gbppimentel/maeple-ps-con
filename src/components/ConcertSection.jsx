import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { inviteContent } from "@/data/inviteContent";

export default function ConcertSection() {
  const { concert } = inviteContent;

  return (
    <section className="relative px-6 py-20 z-10">
      <div className="max-w-md mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/50 text-sm mb-4"
        >
          {concert.beforePicture}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-8 rounded-3xl overflow-hidden glass max-w-[200px] mx-auto"
        >
          <img
            src={concert.images.textLayer}
            alt="Planetshakers Live in Manila"
            className="w-full"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading font-extrabold text-2xl text-center text-white mb-2 leading-tight"
        >
          {concert.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-white/50 text-sm mb-10"
        >
          {concert.beforeDetails}
        </motion.p>

        <div className="relative">
          <DetailCard icon={Calendar} label={concert.date} delay={0} zIndex={10} />
          <DetailCard
            icon={MapPin}
            label={concert.venue}
            delay={0.15}
            zIndex={20}
            overlap
          />
          <DetailCard
            icon={Clock}
            label={concert.time}
            delay={0.3}
            zIndex={30}
            overlap
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/50 text-sm mt-8 italic leading-relaxed"
        >
          {concert.note}
        </motion.p>
      </div>
    </section>
  );
}

function DetailCard({ icon: Icon, label, delay, zIndex, overlap }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ zIndex }}
      className="relative glass rounded-3xl p-5 flex items-center gap-4 neon-glow mb-5"
    >
      <div className="w-10 h-10 rounded-full bg-[#CCFF00]/10 flex items-center justify-center flex-shrink-0">
        <Icon className="text-[#CCFF00]" size={18} />
      </div>
      <p className="text-white/90 text-sm font-body">{label}</p>
    </motion.div>
  );
}
import { motion } from "framer-motion";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import { inviteContent } from "@/data/inviteContent";

export default function SVIPSection() {
  const { svip, concert } = inviteContent;

  return (
    <ScrollRevealSection className="relative px-6 py-20 z-10">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-heading font-extrabold text-xl text-white leading-snug">
            {svip.title}
          </h2>
        </motion.div>

        {/* Seat map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden glass mb-8"
        >
          <img
            src={concert.images.seatMap}
            alt="SM MOA Arena seating map"
            className="w-full"
          />
          <div className="absolute inset-0 ring-2 ring-[#CCFF00]/30 rounded-3xl pointer-events-none" />
        </motion.div>

        <div className="space-y-4">
          {svip.lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="text-white/70 text-sm text-center font-body"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
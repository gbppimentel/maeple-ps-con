import { motion } from "framer-motion";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import { inviteContent } from "@/data/inviteContent";

export default function PlanetboomSection() {
  const { planetboom } = inviteContent;

  return (
    <ScrollRevealSection className="relative px-6 py-20 z-10">
      <div className="max-w-md mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-heading font-extrabold text-2xl text-white mb-4"
        >
          {planetboom.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-white/60 text-sm leading-relaxed font-body"
        >
          {planetboom.description}
        </motion.p>
      </div>
    </ScrollRevealSection>
  );
}
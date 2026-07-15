import { motion } from "framer-motion";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import { inviteContent } from "@/data/inviteContent";

export default function NotesSection() {
  const { notes } = inviteContent;

  return (
    <ScrollRevealSection className="relative px-6 py-20 z-10">
      <div className="max-w-md mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading font-extrabold text-2xl text-white mb-8"
        >
          {notes.title}
        </motion.h2>

        <div className="space-y-5">
          {notes.lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.2 }}
              className="text-white/75 text-base font-body leading-relaxed"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
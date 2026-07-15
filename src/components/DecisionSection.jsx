import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NoButtonMechanic from "@/components/NoButtonMechanic";

export default function DecisionSection() {
  const navigate = useNavigate();

  return (
    <section className="relative px-6 py-32 z-10">
      <div className="max-w-md mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 150, damping: 12 }}
          className="font-heading font-extrabold text-4xl text-white mb-16 text-glow"
        >
          sooo,, will you go with me?
        </motion.h2>

        <NoButtonMechanic onYes={() => navigate("/celebration")} />
      </div>
    </section>
  );
}
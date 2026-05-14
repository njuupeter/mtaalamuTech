import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export default function WhatsAppButton() {
  const phoneNumber = "0716040796";
  const message = "Hello MtaalamuTech, I'm interested in your services.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-28 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/40 transition-transform hover:scale-110 active:scale-95"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
    </motion.a>
  );
}

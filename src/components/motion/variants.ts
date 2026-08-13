export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const cardHover = {
  whileHover: { y: -4, scale: 1.015 },
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};

export const cardHoverClassName =
  "rounded-2xl border border-gray-200 bg-white shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-accent hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.12)]";

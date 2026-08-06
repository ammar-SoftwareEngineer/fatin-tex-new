"use client";

/**
 * Full-screen video modal.
 * Closes when the user clicks the backdrop or presses Escape.
 */
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type VideoModalProps = {
  videoUrl: string | null;
  onClose: () => void;
};

export default function VideoModal({ videoUrl, onClose }: VideoModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!videoUrl) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [videoUrl, onClose]);

  return (
    <AnimatePresence>
      {videoUrl ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-9999 bg-black/90 flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.video
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            src={videoUrl}
            controls
            autoPlay
            className="max-w-4xl w-full rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

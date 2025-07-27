import { motion } from "framer-motion";

import { createPortal } from "react-dom";

export default function Modal({ children, onClose }) {
  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black opacity-0 z-50"
        onClick={onClose}
      />
      <motion.dialog
        variants={{
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        open
        className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-[90%] sm:w-[30rem] max-h-[80vh] bg-gray-800 text-white border-none rounded-lg shadow-xl z-50 flex flex-col p-6 overflow-auto"
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-[-0.5rem] right-[-0.5rem] text-gray-400 hover:text-gray-200 focus:outline-none text-lg cursor-pointer"
          >
            ✕
          </button>
          <div className="flex flex-col space-y-4">{children}</div>
        </div>
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}

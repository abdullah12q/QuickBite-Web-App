import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();

    const handleCancel = (event) => {
      event.preventDefault();
      onClose();
    };

    modal.addEventListener("cancel", handleCancel); //3shan lw das esc, "cancel" -> esc

    return () => {
      modal.removeEventListener("cancel", handleCancel);
      if (modal.open) {
        modal.close();
      }
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === dialog.current) {
      onClose();
    }
  };

  return createPortal(
    <dialog
      className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-[90%] sm:w-[30rem] max-h-[80vh] bg-gray-800 text-white border-none rounded-lg shadow-xl z-50 flex flex-col p-6 overflow-auto animate-slide-down-fade-in"
      ref={dialog}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
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
      <style>
        {`
          dialog::backdrop {
            height: 100vh;
            width: 100%;
            background: rgba(0, 0, 0, 0.5);
            position: fixed;
            top: 0;
            left: 0;
          }

          @keyframes slide-down-fade-in {
            from {
              opacity: 0;
              transform: translateY(-2rem);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          dialog {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; 
          }

          dialog::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </dialog>,
    document.getElementById("modal")
  );
}

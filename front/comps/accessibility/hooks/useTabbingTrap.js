import { useEffect } from "react";

const useTabTrap = (modalOpen, modalId) => {
  useEffect(() => {
    if (modalOpen) {
      const modal = document.getElementById(modalId);
      const handleKeyDown = (event) => {
        // Get a list of all focusable elements in the modal
        const focusableEls = Array.from(
          modal.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
          )
        );

        const firstEl = focusableEls.at(0);
        const lastEl = focusableEls.at(-1);

        const shiftKey = event.shiftKey;

        if (shiftKey && document.activeElement === firstEl) {
          lastEl.focus();
          event.preventDefault();
        } else if (!shiftKey && document.activeElement === lastEl) {
          firstEl.focus();
          event.preventDefault();
        }
      };

      modal.addEventListener("keydown", handleKeyDown);

      return () => {
        modal.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [modalOpen, modalId]);
};

export default useTabTrap;

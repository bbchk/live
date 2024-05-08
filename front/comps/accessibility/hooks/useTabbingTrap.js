import { useEffect } from "react";

const useTabTrap = (modalOpen, modalId, firstElementId, lastElementId) => {
  useEffect(() => {
    if (modalOpen) {
      const modal = document.getElementById(modalId);
      const handleKeyDown = (event) => {
        if (event.key !== "Tab" && event.keyCode !== 9) {
          return;
        }

        // Get a list of all focusable elements in the modal
        const focusableEls = Array.from(
          modal.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
          )
        );

        const firstEl =
          document.getElementById(firstElementId) || focusableEls.at(0);
        const lastEl =
          document.getElementById(lastElementId) || focusableEls.at(-1);

        event.preventDefault();

        if (event.shiftKey && document.activeElement === firstEl) {
          lastEl.focus();
        } else if (!event.shiftKey && document.activeElement === lastEl) {
          firstEl.focus();
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

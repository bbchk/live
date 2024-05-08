import { useEffect } from "react";

const useDoOnKey = (key, action, dependencies) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === key || event.keyCode === key) {
        action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, dependencies);
};

export default useDoOnKey;

import { useRouter } from "next/router";
import { useHotkeys } from "react-hotkeys-hook";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleHotkeysModalOpen,
  toggleCartModal,
  toggleSignUpModal,
  toggleSignInModal,
  toggleMainOffcanvas,
} from "store/modalSlice";

const CustomHotkeys = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  function open(openModal) {
    dispatch(openModal());
  }

  function navigateTo(path) {
    router.push(path);
  }

  function focusOn(id) {
    const element = document.getElementById(id);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  //general
  useHotkeys("shift+?", () => open(toggleHotkeysModalOpen), [dispatch]);

  //navigation
  useHotkeys("shift+h", () => navigateTo("/"));
  useHotkeys("shift+p", () => navigateTo("/profile/personal_data"));

  useHotkeys("shift+c", () => open(toggleCartModal), [dispatch]);
  useHotkeys("alt+shift+i", () => open(toggleSignInModal), [dispatch]);
  useHotkeys("alt+shift+u", () => open(toggleSignUpModal), [dispatch]);
  useHotkeys("alt+shift+o", () => open(toggleMainOffcanvas), [dispatch]);

  //focus management
  useHotkeys("ctrl+alt+f", () => focusOn("search_bar_input"));
  useHotkeys("ctrl+alt+m", () => focusOn("main_content"));

  // Shopping Cart Shortcuts: These can help users manage their shopping cart.
  // ctrl + shift + a: Add selected product to the cart
  // ctrl + shift + r: Remove selected product from the cart
  // ctrl + shift + c: Clear the cart
  // Product Viewing Shortcuts: These can enhance the product viewing experience.
  // ctrl + →: View the next product image
  // ctrl + ←: View the previous product image
  // Accessibility Shortcuts: These can improve accessibility for users with disabilities.
  // alt + shift + p: Play product description audio
  // alt + shift + s: Stop product description audio
  // Miscellaneous Shortcuts: These can provide additional functionality.
  // ctrl + b: Bookmark a product
  // ctrl + shift + b: View bookmarked produc

  return null;
};

export default CustomHotkeys;

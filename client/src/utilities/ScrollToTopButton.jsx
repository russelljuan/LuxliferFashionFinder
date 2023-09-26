import React, { useState } from "react";
import { FaArrowUp, FaChevronRight, FaChevronUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <button
      onClick={handleClick}
      className={`fixed right-4 bottom-4 p-3 outline-none border-none rounded-full transition-colors ${
        showButton ? "bg-gray-600 hover:bg-gray-700" : "bg-transparent"
      }`}
    >
      <FaChevronUp size="20"
      className={`${
        showButton ? "text-white" : "hidden"
      }`}/>
    </button>
  );
};

export default ScrollToTopButton;
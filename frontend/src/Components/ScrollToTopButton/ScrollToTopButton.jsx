
import React from 'react';
import'./ScrollButton.css';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button onClick={scrollToTop} className="scrollToTopButton">
      ↑
    </button>
  );
}


export default ScrollToTopButton;
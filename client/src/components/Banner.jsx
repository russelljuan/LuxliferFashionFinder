import React, { useState, useEffect } from "react";

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "/images/banner1.png",
    "/images/banner2.png",
    "/images/banner3.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide, images.length]);

  return (
    <div className="carousel w-full h-full relative overflow-hidden">
      <div
        className="w-full h-full flex transition-transform duration-1000 ease-in-out transform"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          transitionDelay: currentSlide === 3 ? "3s" : "0s",
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-item w-full h-full">
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-[750px] object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;

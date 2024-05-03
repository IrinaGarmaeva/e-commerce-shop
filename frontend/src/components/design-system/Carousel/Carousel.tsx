import { useState, FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

type CarouselProps = {
  slides: {
    src: string;
    alt: string;
    link: string;
  }[];
};

const Carousel: FC<CarouselProps> = ({ slides }) => {
  const [current, setCurrent] = useState<number>(0);
  const navigate = useNavigate();

  const goToPreviousSlide = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  const goToNextSlide = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition ease-out duration-400"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => {
          return (
            <img
              src={slide.src}
              key={slide.src}
              alt={slide.alt}
              className="w-full"
              onClick={() => {
                console.log("Navigating to:", slide.link);
                navigate(slide.link);
              }}
            />
          );
        })}
      </div>
      <button
        onClick={goToPreviousSlide}
        className="absolute top-1/2 left-0 shadow text-white hover:bg-white hover:rounded-sm hover:text-pink p-2"
      >
        <SlArrowLeft size={30} />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-0 shadow text-white hover:bg-white hover:rounded-sm hover:text-pink p-2"
      >
        <SlArrowRight size={30} />
      </button>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`transition-all w-1.5 h-1.5 bg-white rounded-full  ${
                current === index ? "p-0.5" : "bg-opacity-50"
              }`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

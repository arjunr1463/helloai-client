import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

// Custom Arrow Component
const CustomPrevArrow = ({ className, onClick }) => (
  <div
    className={`${className} custom-arrow left-[-25px] hover:scale-125 transition-all duration-300 ease-in-out bg-[#17181c] p-2 rounded-full`}
    onClick={onClick}
    style={{ zIndex: 1 }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-6 h-6 text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  </div>
);

const CustomNextArrow = ({ className, onClick }) => (
  <div
    className={`${className} custom-arrow right-[-25px] hover:scale-125 transition-all duration-300 ease-in-out bg-[#17181c] p-2 rounded-full`}
    onClick={onClick}
    style={{ zIndex: 1 }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-6 h-6 text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  </div>
);

const Carousel = ({ subject, selectedSubject, setSelectedSubject }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3, // Default slides for larger screens (>=1024px)
    slidesToScroll: 1,
    autoplay: false,
    prevArrow: <CustomPrevArrow />, // Use custom prev arrow
    nextArrow: <CustomNextArrow />, // Use custom next arrow
    responsive: [
      {
        breakpoint: 1024, // For screens <1024px
        settings: {
          slidesToShow: 2, // Display 2 slides for screens smaller than 1024px
        },
      },
      {
        breakpoint: 600, // For screens <600px
        settings: {
          slidesToShow: 2, // Display 2 slides for screens smaller than 600px
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="flex py-3  w-[90%] xl:w-[60%] !p-0 !m-0">
      {subject?.data?.map((subject, i) => (
        <div
          key={i}
          onClick={() => {
            if (selectedSubject === subject.name) {
              setSelectedSubject("");
            } else {
              setSelectedSubject(subject?.name);
            }
          }}
          className={`bg-[#17181c] text-[10px] md:text-[12px] font-monasans tracking-widest cursor-pointer border-[1px] border-[#353945] rounded-[10px] overflow-hidden shadow-lg transition-transform transform hover:scale-105 ${
            selectedSubject === subject.name &&
            "border-[#6c8afd] !shadow-[0_4px_15px_rgba(108,138,253,0.5)]"
          }`}
        >
          <div
            style={{
              background:
                i % 5 === 0
                  ? "linear-gradient(to right, #FFCDD2, #EF9A9A, #E57373)"
                  : i % 5 === 1
                  ? "linear-gradient(to right, #C8E6C9, #A5D6A7, #81C784)"
                  : i % 5 === 2
                  ? "linear-gradient(to right, #FFECB3, #FFD54F, #FFCA28)"
                  : i % 5 === 3
                  ? "linear-gradient(to right, #B39DDB, #9575CD, #7E57C2)"
                  : "linear-gradient(to right, #B2EBF2, #4DD0E1, #26C6DA)",
            }}
            className="h-[80px] relative shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
          ></div>
          <div className="px-1 md:px-2 py-3 text-center">
            <span className="capitalize font-semibold">{subject.name}</span>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;

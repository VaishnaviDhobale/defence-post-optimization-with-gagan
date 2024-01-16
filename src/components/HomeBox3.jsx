import { Text, Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Slide } from "./Slide";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../BaseUrl";

export function HomeBox3({ allReview, bestReview }) {
  const maxIterations = 10;
  const [swiper, setSwiper] = useState(null);

  const handleMouseEnter = () => {
    if (swiper) {
      swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiper) {
      swiper.autoplay.start();
    }
  };

  return (
    <>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Text
          textAlign={"left"}
          fontWeight={"bold"}
          fontSize={"30px"}
          marginBottom={"30px"}
          fontFamily={"Barlow"}
        >
          Students <span style={{ color: "#28a4de" }}>Testimonial</span>
        </Text>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          breakpoints={{
            1000: {
              slidesPerView: 2.5,
              spaceBetween: 50,
            },
            // when window width is less than 1000px, show 1 slide
            0: {
              slidesPerView: 1,
              spaceBetween: 750,
            },
          }}
          scrollbar={{ draggable: true }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 100, // Autoplay with a 100ms delay
            disableOnInteraction: false,
            stopOnLastSlide: false,
          }}
          loop={true} // Enables continuous loop
          speed={2000} // Adjust the speed of the transition (2 seconds per slide)
          onSlideChange={() => console.log("slide change")}
          onSwiper={setSwiper}
        >
          <Box>
            {bestReview.map((ele, index) => {
              if (index < maxIterations) {
                return (
                  <SwiperSlide key={index}>
                    <Slide data={ele} />
                  </SwiperSlide>
                );
              }
            })}
          </Box>
        </Swiper>
      </Box>
    </>
  );
}

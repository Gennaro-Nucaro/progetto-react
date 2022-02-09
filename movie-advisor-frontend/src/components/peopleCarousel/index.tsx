import React, { memo } from "react";
import css from "./style.module.css";
//COMP EST
import Card from "./components/card";
//LIB
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
//REDUX
import { ICastCreditsMovie } from "@redux-rtkQueries";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 12,
  },
  largeDesktop: {
    breakpoint: { max: 3000, min: 1500 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 1500, min: 1024 },
    items: 9,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 8,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface CardCarouselProps {
  title?: string;
  data: ICastCreditsMovie[];
}

const PeopleCarousel: React.VFC<CardCarouselProps> = ({ title = "", data }) => {
  return (
    <div className={css.cardCarousel}>
      <h1 className={css.title}>{title}</h1>
      <Carousel
        responsive={responsive}
        swipeable={false}
        infinite={true}
        transitionDuration={500}
        keyBoardControl={true}
        arrows={true}
      >
        {data &&
          data.map((ele: ICastCreditsMovie) => (
            <Card key={ele.id} data={ele} />
          ))}
      </Carousel>
      ;
    </div>
  );
};

export default memo(PeopleCarousel);

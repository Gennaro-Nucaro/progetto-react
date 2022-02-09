import React from "react";
import css from "./style.module.css";
//COMP EST
import Card from "./components/card";
//LIB
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  largeDesktop: {
    breakpoint: { max: 3000, min: 1500 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1500, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface IElement {
  name: string;
  img?: string;
  id?: string;
  count: number;
}

interface CardCarouselProps {
  title?: string;
  data: IElement[];
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
        {data && data.map((ele) => <Card key={ele.name} element={ele} />)}
      </Carousel>
      ;
    </div>
  );
};

export default PeopleCarousel;

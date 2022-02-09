import React, { memo } from "react";
import css from "./style.module.css";
import Card from "./components/card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IMovieResult } from "@redux-rtkQueries";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
    slidesToSlide: 8,
  },
  largeDesktop: {
    breakpoint: { max: 3000, min: 1500 },
    items: 6,
    slidesToSlide: 6,
  },
  desktop: {
    breakpoint: { max: 1500, min: 1024 },
    items: 5,
    slidesToSlide: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface CardCarouselProps {
  title?: string;
  data: IMovieResult[];
}

const FilmCarousel: React.VFC<CardCarouselProps> = ({ title = "", data }) => {
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
          data.map((ele: IMovieResult) => <Card key={ele.id} data={ele} />)}
      </Carousel>
      ;
    </div>
  );
};

export default memo(FilmCarousel);

import React, { useContext } from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  CarouselContext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

interface ImageData {
  src: string;
  alt: string;
}

interface ImageSlideshowProps {
  images: ImageData[];
}

const SlideIndicator: React.FC<{ totalSlides: number }> = ({ totalSlides }) => {
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = React.useState(
    carouselContext?.state?.currentSlide ?? 0
  );

  React.useEffect(() => {
    if (!carouselContext) return;

    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  return (
    <div>
      {currentSlide + 1} of {totalSlides}
    </div>
  );
};

export default function ImageSlideshow({ images }: ImageSlideshowProps) {
  const totalSlides = images.length;

  if (totalSlides === 0) {
    return null;
  }

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={60}
      totalSlides={totalSlides}
    >
      <ButtonBack>←</ButtonBack>
      <ButtonNext>→</ButtonNext>
      <SlideIndicator totalSlides={totalSlides} />

      <Slider>
        {images.map((image, index) => (
          <Slide index={index} key={index}>
            <img src={image.src} alt={image.alt} />
          </Slide>
        ))}
      </Slider>
    </CarouselProvider>
  );
}

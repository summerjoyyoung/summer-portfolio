import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { iconPaths } from './IconPaths';

interface ImageData {
  src: string;
  alt: string;
}

interface ImageSlideshowProps {
  images: ImageData[];
}

export default function ImageSlideshow({ images }: ImageSlideshowProps) {
  const totalSlides = images.length;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (totalSlides === 0) return null;

  return (
    <div style={styles.root}>
      <div style={styles.controls}>
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous slide"
          style={styles.button}
        >
          <svg width="32" height="32" viewBox="0 0 256 256" aria-hidden="true">
            <g dangerouslySetInnerHTML={{ __html: iconPaths['arrow-left'] }} />
          </svg>
        </button>
        <span style={styles.indicator}>
          {selectedIndex + 1} of {totalSlides}
        </span>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next slide"
          style={styles.button}
        >
          <svg width="32" height="32" viewBox="0 0 256 256" aria-hidden="true">
            <g dangerouslySetInnerHTML={{ __html: iconPaths['arrow-right'] }} />
          </svg>
        </button>
      </div>

      <div ref={emblaRef} style={styles.viewport}>
        <div style={styles.container}>
          {images.map((image, index) => (
            <div key={index} style={styles.slide}>
              <img
                src={image.src}
                alt={image.alt}
                style={styles.image}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.5rem',
    height: '2.5rem',
    border: '1px solid var(--gray-800)',
    borderRadius: '50%',
    background: 'var(--gray-999)',
    color: 'var(--gray-300)',
    cursor: 'pointer',
    transition: 'background 0.15s, color 0.15s',
  },
  indicator: {
    fontVariantNumeric: 'tabular-nums',
    fontSize: '0.875rem',
    color: 'var(--gray-400)',
    minWidth: '4rem',
    textAlign: 'center' as const,
  },
  viewport: {
    overflow: 'hidden',
    borderRadius: 'var(--radius-3)',
  },
  container: {
    display: 'flex',
  },
  slide: {
    flex: '0 0 100%',
    minWidth: 0,
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
};

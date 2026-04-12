import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

interface ImageData {
  src: string;
  alt: string;
}

interface ImageSlideshowProps {
  images: ImageData[];
  height?: string;
}

export default function ImageSlideshow({ images, height }: ImageSlideshowProps) {
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
      <style>{`
        .slideshow-btn:hover:not(:disabled) {
          color: var(--accent-regular);
          border-color: var(--accent-regular);
        }
        .slideshow-btn:disabled {
          opacity: 0.4;
          cursor: default;
        }
      `}</style>
      <div style={styles.controls}>
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous slide"
          style={styles.button}
          className="slideshow-btn"
        >
          <ArrowLeftIcon width="32" height="32" aria-hidden="true" />
        </button>
        <span style={styles.indicator}>
          {selectedIndex + 1} of {totalSlides}
        </span>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next slide"
          style={styles.button}
          className="slideshow-btn"
        >
          <ArrowRightIcon width="32" height="32" aria-hidden="true" />
        </button>
      </div>

      <div ref={emblaRef} style={styles.viewport}>
        <div style={styles.container}>
          {images.map((image, index) => (
            <div key={index} style={height ? { ...styles.slide, display: 'flex', justifyContent: 'center' } : styles.slide}>
              <img
                src={image.src}
                alt={image.alt}
                style={height ? { height, width: 'auto', maxWidth: '100%', display: 'block' } : styles.image}
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
    gap: '8px',
    margin: '24px 0',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    border: '1px solid var(--gray-800)',
    borderRadius: '9999px',
    background: 'var(--gray-999)',
    color: 'var(--gray-300)',
    cursor: 'pointer',
    transition: 'color var(--theme-transition), border-color var(--theme-transition)',
  },
  indicator: {
    fontVariantNumeric: 'tabular-nums',
    fontSize: 'var(--text-sm)',
    color: 'var(--gray-400)',
    minWidth: '64px',
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

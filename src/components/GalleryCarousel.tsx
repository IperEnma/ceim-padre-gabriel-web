"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gallerySlides } from "@/lib/gallery-images";

const slides = gallerySlides;

export function GalleryCarousel() {
  const [cur, setCur] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const total = slides.length;
  const trackStyle = useMemo(
    () => ({ transform: `translateX(-${cur * 100}%)` }),
    [cur],
  );

  function goTo(i: number) {
    setCur(((i % total) + total) % total);
  }
  function next() {
    goTo(cur + 1);
  }
  function prev() {
    goTo(cur - 1);
  }

  function stop() {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function start() {
    stop();
    intervalRef.current = window.setInterval(() => {
      setCur((c) => (c + 1) % total);
    }, 5000);
  }

  useEffect(() => {
    start();
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="carousel-root"
      onMouseEnter={stop}
      onMouseLeave={start}
      aria-label="Carrusel de galería"
    >
      <div className="carousel-wrap">
        <div className="carousel-track" style={trackStyle}>
          {slides.map((s) => (
            <div
              key={s.title}
              className="carousel-slide"
              style={{ background: s.bg }}
            >
              <img
                className="slide-img"
                src={s.src}
                alt={s.alt}
                width={1080}
                height={566}
                loading="eager"
                decoding="async"
              />
              <div className="slide-overlay" />
              <div className="slide-caption">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-btn prev" onClick={prev} aria-label="Anterior">
          ←
        </button>
        <button className="carousel-btn next" onClick={next} aria-label="Siguiente">
          →
        </button>
      </div>

      <div className="carousel-dots" aria-label="Indicador del carrusel">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === cur ? "active" : ""}`}
            aria-label={`Ir a slide ${i + 1}`}
            onClick={() => {
              goTo(i);
              start();
            }}
          />
        ))}
      </div>
      <p className="upload-hint">
        Imágenes de referencia — pronto fotografías de nuestras instalaciones y actividades
      </p>
    </div>
  );
}


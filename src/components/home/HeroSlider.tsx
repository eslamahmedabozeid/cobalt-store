'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HERO_SLIDES_DATA } from '@/data/heroSlides';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES_DATA[currentSlide];

  return (
    <section className="store-hero reveal-fade-up">
      <div className="container">
        <div className="hero-slider-box">
          {/* Left / Text Side */}
          <div className="hero-content-side">
            <div id="heroSlideTag" className="hero-tag">
              {slide.tag}
            </div>

            <h1 id="heroSlideTitle" className="hero-title">
              {slide.title}
            </h1>

            <p id="heroSlideSub" className="hero-subtitle">
              {slide.subtitle}
            </p>

            <div className="hero-cta-group">
              <Link href={slide.link} id="heroCtaBtn" className="btn-primary">
                ▶ {slide.ctaText || 'اطلب خدمتك الآن'}
              </Link>
              <Link href="/#calculatorSection" className="btn-outline">
                🧮 احسب تكلفتك فوراً
              </Link>
            </div>

            <div id="heroSliderDots" className="slider-dots">
              {HERO_SLIDES_DATA.map((s, index) => (
                <button
                  key={s.id}
                  className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  title={s.title}
                  type="button"
                  aria-label={`الشريحة ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right / Visual Side */}
          <div className="hero-visual-side">
            <img
              id="heroSlideImg"
              src={slide.image}
              alt={slide.title}
              className="hero-3d-poster"
              style={{
                width: '100%',
                maxHeight: '420px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                border: '2px solid var(--border-active)',
                transition: 'opacity 0.3s ease'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

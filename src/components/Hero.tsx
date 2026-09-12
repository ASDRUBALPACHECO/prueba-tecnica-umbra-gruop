import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { HERO_IMAGE } from '../data';
import { MagneticButton } from './MagneticButton';
import { TextReveal } from './TextReveal';
import { useLanguage } from '../context/LanguageContext';
import './Hero.css';

interface HeroProps {
  onDiscoverResidences: () => void;
  onScrollNext: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onDiscoverResidences,
  onScrollNext,
}) => {
  const { content } = useLanguage();
  const heroText = content.hero;
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Bind scroll position to vertical parallax translation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Vertical parallax movement (disabled if reduced motion requested)
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['0%', '28%']
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['0%', '16%']
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    shouldReduceMotion ? [1, 1] : [1, 0.1]
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="hero-section"
    >
      {/* Contenedor de fondo con efecto parallax */}
      <motion.div
        style={{ y: imageY }}
        className="hero-parallax-bg"
      >
        <img
          src={HERO_IMAGE}
          alt="Ohana Beach House coastal estate"
          referrerPolicy="no-referrer"
          className="hero-bg-image"
        />
      </motion.div>
      
      {/* Viñeta de iluminación editorial */}
      <div className="hero-vignette-overlay" />

      {/* Contenido principal del Hero */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="hero-content-wrapper"
      >
        <span className="hero-eyebrow-badge">
          {heroText.eyebrow}
        </span>

        {/* Título principal con máscara TextReveal */}
        <TextReveal className="mb-3 sm:mb-4">
          <h1 className="hero-main-title">
            Ohana Beach House
          </h1>
        </TextReveal>

        <p className="hero-description">
          {heroText.tagline}
        </p>

        {/* Grupo de botones CTA con microinteracción magnética */}
        <div className="hero-actions-row">
          <MagneticButton
            id="hero-discover-btn"
            strength={0.25}
            onClick={onDiscoverResidences}
            className="hero-primary-btn"
          >
            {heroText.discoverResidences}
          </MagneticButton>
        </div>

        {/* Indicador para explorar hacia abajo */}
        <button
          onClick={onScrollNext}
          aria-label={heroText.explore || "Explorar el proyecto"}
          className="hero-explore-scroll-btn group"
        >
          <span className="hero-explore-text">
            {heroText.explore || 'Explorar'}
          </span>
          <span className="material-symbols-outlined hero-explore-icon animate-bounce">
            keyboard_arrow_down
          </span>
        </button>
      </motion.div>
    </section>
  );
};

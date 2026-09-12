import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { EXPERIENCIA_IMAGE } from '../data';
import { MagneticButton } from './MagneticButton';
import { TextReveal } from './TextReveal';
import { useLanguage } from '../context/LanguageContext';
import './Experiencia.css';

interface ExperienciaProps {
  onOpenBooking?: () => void;
}

export const Experiencia: React.FC<ExperienciaProps> = ({ onOpenBooking }) => {
  const { content } = useLanguage();
  const expText = content.experiencia;
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Parallax scroll linkage
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Vertical parallax movement: background moves at a distinct rate as user scrolls past
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['-18%', '18%']
  );

  return (
    <section
      id="experiencia"
      ref={containerRef}
      className="experiencia-section"
    >
      {/* Contenedor de fondo con desplazamiento parallax */}
      <motion.div
        style={{ y: imageY }}
        className="experiencia-parallax-wrapper"
      >
        <img
          src={EXPERIENCIA_IMAGE}
          alt="Cliffside Mediterranean luxury infinity pool during magical colorful sunset"
          referrerPolicy="no-referrer"
          className="experiencia-bg-image"
        />
      </motion.div>

      {/* Máscara de oscurecimiento ambiental */}
      <div className="experiencia-tint-overlay" />

      {/* Contenedor de contenido interactivo */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="experiencia-content-box"
      >
        <span className="experiencia-eyebrow">
          {expText.eyebrow}
        </span>

        {/* Título de sección con efecto TextReveal */}
        <TextReveal className="mb-4">
          <h2 className="experiencia-headline">
            {expText.headline}
          </h2>
        </TextReveal>

        <p className="experiencia-description">
          {expText.description}
        </p>

        {onOpenBooking && (
          <MagneticButton
            id="cta-experiencia-booking-btn"
            strength={0.25}
            onClick={onOpenBooking}
            className="experiencia-cta-btn"
          >
            {expText.ctaButton}
          </MagneticButton>
        )}
      </motion.div>
    </section>
  );
};

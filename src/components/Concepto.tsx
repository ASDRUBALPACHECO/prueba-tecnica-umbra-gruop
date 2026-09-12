import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import { INTERIOR_AWARD_IMAGE, ARCHITECTURAL_PILLARS } from '../data';
import { TextReveal } from './TextReveal';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useLanguage } from '../context/LanguageContext';
import './Concepto.css';

export const Concepto: React.FC = () => {
  const { content } = useLanguage();
  const conceptoText = content.concepto;
  const [showAwardDetails, setShowAwardDetails] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useBodyScrollLock(showAwardDetails);

  // Escape key listener
  useEffect(() => {
    if (!showAwardDetails) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowAwardDetails(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAwardDetails]);

  return (
    <section id="proyecto" className="concepto-section">
      {/* Encabezado narrativo editorial con TextReveal */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="concepto-narrative-header"
      >
        <span className="concepto-eyebrow">
          {conceptoText.eyebrow}
        </span>

        <TextReveal className="mb-4">
          <h2 className="concepto-title">
            {conceptoText.title}
          </h2>
        </TextReveal>

        <p className="concepto-description">
          {conceptoText.description1}
        </p>

        {/* Cuadrícula de Pilares Arquitectónicos */}
        <div className="concepto-pillars-grid">
          {(conceptoText.pillars || ARCHITECTURAL_PILLARS).map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="concepto-pillar-card"
            >
              <span className="material-symbols-outlined concepto-pillar-icon">
                {pillar.icon}
              </span>
              <div>
                <span className="concepto-pillar-title">
                  {pillar.title}
                </span>
                <span className="concepto-pillar-detail">
                  {pillar.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contenedor de Fotografía Interior y Galardón */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 35 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="concepto-imagery-container group"
      >
        <img
          src={INTERIOR_AWARD_IMAGE}
          alt="Ohana Interior living room with travertine finishes and panoramic ocean view"
          referrerPolicy="no-referrer"
          className="concepto-imagery-photo"
        />

        {/* Badge de Galardón Flotante interactivo */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20, scale: 0.96 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          onClick={() => setShowAwardDetails(true)}
          className="concepto-award-badge"
        >
          <div className="concepto-award-icon-box">
            <span className="material-symbols-outlined text-[26px]">workspace_premium</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="concepto-award-category">
                {conceptoText.awardBadge?.category || 'Galardón Internacional'}
              </p>
              <span className="concepto-award-link">
                {conceptoText.awardBadge?.link || 'Ver Certificación'}
              </span>
            </div>
            <p className="concepto-award-title">
              {conceptoText.awardBadge?.title || 'Mejor Proyecto Residencial Costero 2025'}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Modal de Detalle del Galardón */}
      {showAwardDetails && createPortal(
        <div
          className="concepto-modal-backdrop animate-fadeIn"
          onClick={() => setShowAwardDetails(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="concepto-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="concepto-modal-header">
              <span className="concepto-modal-eyebrow">
                {conceptoText.awardModal?.eyebrow || 'Jurado Arquitectónico Internacional'}
              </span>
              <button
                onClick={() => setShowAwardDetails(false)}
                className="concepto-modal-close-btn"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <h3 className="concepto-modal-title">
              {conceptoText.awardModal?.title || 'World Architecture & Coastal Estate Award 2025'}
            </h3>
            <p className="concepto-modal-description">
              {conceptoText.awardModal?.description || 'Otorgado por el comité de diseño biofílico y sostenibilidad de Ginebra...'}
            </p>
            <div className="concepto-modal-info-box">
              <div><strong>{conceptoText.awardModal?.categoryLabel || 'Categoría:'}</strong> {conceptoText.awardModal?.categoryVal}</div>
              <div><strong>{conceptoText.awardModal?.materialsLabel || 'Materiales:'}</strong> {conceptoText.awardModal?.materialsVal}</div>
            </div>
            <button
              onClick={() => setShowAwardDetails(false)}
              className="concepto-modal-btn"
            >
              {conceptoText.awardModal?.closeBtn || 'Cerrar Detalle'}
            </button>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

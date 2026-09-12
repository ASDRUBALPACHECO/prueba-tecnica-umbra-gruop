import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AnimatedCounter } from './AnimatedCounter';
import { useLanguage } from '../context/LanguageContext';
import './Cifras.css';

export const Cifras: React.FC = () => {
  const { content } = useLanguage();
  const cifrasText = content.cifras;
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="cifras" className="cifras-section">
      <div className="cifras-inner-container">
        {/* Cabecera de la sección Dimensiones */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="cifras-header"
        >
          <span className="cifras-eyebrow">
            {cifrasText.eyebrow}
          </span>
          <h3 className="cifras-title">
            {cifrasText.title}
          </h3>
        </motion.div>

        {/* 4 Tarjetas de Dimensiones con contador animado */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="cifras-cards-grid"
        >
          {cifrasText.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="cifra-stat-card group"
            >
              <span className="cifra-stat-number">
                <AnimatedCounter valueStr={stat.value} duration={1.8} />
              </span>
              <span className="cifra-stat-title">
                {stat.title}
              </span>
              <span className="cifra-stat-subtitle">
                {stat.subtitle}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Residence, TypologyFilter } from '../types';
import { ApiService } from '../services/api';
import { DossierModal } from './DossierModal';
import { CalculadoraInversion } from './CalculadoraInversion';
import { useLanguage } from '../context/LanguageContext';
import './Tipologias.css';

interface TipologiasProps {
  onSelectForBooking?: (residenceName: string) => void;
  onSelectFor3D?: (residenceCategory: string) => void;
}

export const Tipologias: React.FC<TipologiasProps> = ({
  onSelectForBooking,
  onSelectFor3D,
}) => {
  const { content, language } = useLanguage();
  const tipoText = content.tipologias;
  const [activeFilter, setActiveFilter] = useState<TypologyFilter>('all');
  const [residences, setResidences] = useState<Residence[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedResidence, setSelectedResidence] = useState<Residence | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const loadResidences = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ApiService.getResidences(language);
      setResidences(data);
    } catch (err: any) {
      setError(err?.message || 'Error al obtener la colección residencial.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResidences();
  }, [language]);

  const filteredResidences = residences.filter((r) => {
    if (activeFilter === 'all') return true;
    return r.category === activeFilter;
  });

  const filterTabs = [
    { key: 'all', label: tipoText.filters.all },
    { key: 'garden', label: tipoText.filters.garden },
    { key: 'ocean', label: tipoText.filters.ocean },
    { key: 'penthouse', label: tipoText.filters.penthouse },
    { key: 'estate', label: tipoText.filters.estate },
  ];

  return (
    <section id="tipologias" className="tipologias-section">
      <div className="tipologias-inner-container">
        {/* Cabecera de la sección Tipologías */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="tipologias-header"
        >
          <span className="tipologias-eyebrow">
            {tipoText.eyebrow}
          </span>
          <h2 className="tipologias-title">
            {tipoText.title}
          </h2>
        </motion.div>

        {/* Barra de pestañas de filtrado (Mínimo 4 tipologías según requerimiento) */}
        <motion.div
          id="typology-filter-bar"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="tipologias-filter-bar"
        >
          {filterTabs.map((tab) => {
            const isTabActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key as any)}
                className={`filter-tab-button ${
                  isTabActive ? 'filter-tab-button-active' : ''
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Estado de Carga: Skeleton Loaders */}
        {isLoading && (
          <div className="tipologias-cards-grid">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="tipologia-skeleton-card">
                <div className="tipologia-skeleton-image">
                  <div className="tipologia-skeleton-shimmer" />
                </div>
                <div className="tipologia-skeleton-line" />
                <div className="tipologia-skeleton-line tipologia-skeleton-line-short" />
                <div className="tipologia-skeleton-line" style={{ marginTop: 'auto' }} />
              </div>
            ))}
          </div>
        )}

        {/* Estado de Error con Botón de Reintento */}
        {!isLoading && error && (
          <div className="tipologias-error-state">
            <span className="material-symbols-outlined tipologias-error-icon">error</span>
            <p className="tipologias-error-msg">{error}</p>
            <button onClick={loadResidences} className="tipologias-retry-btn">
              Reintentar Conexión
            </button>
          </div>
        )}

        {/* Estado Vacío (Empty State) */}
        {!isLoading && !error && filteredResidences.length === 0 && (
          <div className="tipologias-empty-state">
            <span className="material-symbols-outlined tipologias-empty-icon">search_off</span>
            <p className="tipologias-empty-text">
              No se encontraron residencias disponibles en esta categoría actualmente.
            </p>
            <button onClick={() => setActiveFilter('all')} className="tipologias-retry-btn">
              Ver Todas las Tipologías
            </button>
          </div>
        )}

        {/* Cuadrícula de tarjetas con filtro animado */}
        {!isLoading && !error && filteredResidences.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.97 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="tipologias-cards-grid"
            >
              {filteredResidences.map((residence, idx) => (
                <motion.div
                  key={residence.id}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: shouldReduceMotion ? 0 : idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="residence-card group"
                >
                  <div className="residence-image-wrapper">
                    <img
                      src={residence.image}
                      alt={residence.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="residence-photo"
                    />
                    <span className="residence-badge">
                      {residence.badge}
                    </span>
                  </div>

                  <h4 className="residence-name">
                    {residence.name}
                  </h4>
                  <p className="residence-dimensions">
                    {residence.dimensions}
                  </p>

                  {/* Especificaciones clave en 3 columnas */}
                  <div className="residence-specs-row">
                    <div>
                      <span className="residence-spec-value">
                        {residence.suites}
                      </span>
                      <span className="residence-spec-label">
                        Suites
                      </span>
                    </div>
                    <div>
                      <span className="residence-spec-value">
                        {residence.bathrooms}
                      </span>
                      <span className="residence-spec-label">
                        Baños
                      </span>
                    </div>
                    <div>
                      <span className="residence-spec-value">
                        {residence.feature}
                      </span>
                      <span className="residence-spec-label">
                        {residence.featureLabel}
                      </span>
                    </div>
                  </div>

                  {/* Precio y botón de Dossier */}
                  <div className="residence-card-footer">
                    <div>
                      <span className="residence-price-label">Inversión</span>
                      <span className="residence-price-value">
                        {residence.price}
                      </span>
                    </div>
                    <div className="residence-card-actions">
                      <button
                        type="button"
                        onClick={() => onSelectFor3D && onSelectFor3D(residence.category)}
                        className="residence-3d-btn"
                        title="Inspeccionar maqueta 3D interactiva"
                      >
                        <span className="material-symbols-outlined text-[14px]">view_in_ar</span>
                        <span>Ver 3D</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedResidence(residence)}
                        className="residence-dossier-btn"
                      >
                        Dossier
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Simulador Financiero & ROI de Ultra-Lujo */}
        <CalculadoraInversion onSelectForBooking={onSelectForBooking} />
      </div>

      {/* Modal interactivo de Dossier */}
      <DossierModal
        residence={selectedResidence}
        onClose={() => setSelectedResidence(null)}
        onSelectForBooking={onSelectForBooking}
      />
    </section>
  );
};

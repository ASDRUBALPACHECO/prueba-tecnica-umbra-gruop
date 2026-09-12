import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Amenity } from '../types';
import { ApiService } from '../services/api';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useLanguage } from '../context/LanguageContext';
import './Amenidades.css';

export const Amenidades: React.FC = () => {
  const { content, language } = useLanguage();
  const amenidadesText = content.amenidades;
  const trackRef = useRef<HTMLDivElement>(null);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  useBodyScrollLock(!!selectedAmenity);

  // Escape key listener
  useEffect(() => {
    if (!selectedAmenity) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          setSelectedAmenity(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAmenity, lightboxOpen]);

  const loadAmenities = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ApiService.getAmenities(language);
      setAmenities(data);
    } catch (err: any) {
      setError(err?.message || 'Error al obtener las amenidades de club privado.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAmenities();
  }, [language]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = 340;
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="amenidades" className="amenidades-section">
      <div className="amenidades-header">
        <div>
          <span className="amenidades-eyebrow">
            {amenidadesText.eyebrow}
          </span>
          <h2 className="amenidades-title">
            {amenidadesText.title}
          </h2>
        </div>

        {/* Controles de navegación */}
        <div className="amenidades-nav-group">
          <button
            id="amenity-prev"
            aria-label="Anterior amenidad"
            onClick={() => handleScroll('left')}
            className="amenidades-nav-button"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <button
            id="amenity-next"
            aria-label="Siguiente amenidad"
            onClick={() => handleScroll('right')}
            className="amenidades-nav-button"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Estado de Carga: Skeletons en Carrusel */}
      {isLoading && (
        <div className="amenidades-carousel-track no-scrollbar">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="amenidad-skeleton-card">
              <div>
                <div className="amenidad-skeleton-icon" />
                <div className="amenidad-skeleton-line amenidad-skeleton-line-short" />
                <div className="amenidad-skeleton-line" />
                <div className="amenidad-skeleton-line amenidad-skeleton-line-desc" />
              </div>
              <div className="amenidad-skeleton-line amenidad-skeleton-line-short" style={{ marginTop: 'auto' }} />
            </div>
          ))}
        </div>
      )}

      {/* Estado de Error con Reintento */}
      {!isLoading && error && (
        <div className="amenidades-error-container">
          <span className="material-symbols-outlined text-[#b91c1c] text-[36px]">sync_problem</span>
          <p className="amenidades-error-text">{error}</p>
          <button onClick={loadAmenities} className="amenidades-retry-btn">
            Reintentar Conexión
          </button>
        </div>
      )}

      {/* Pista del carrusel de tarjetas */}
      {!isLoading && !error && (
        <div
          ref={trackRef}
          id="amenity-track"
          className="amenidades-carousel-track no-scrollbar"
        >
          {amenities.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedAmenity(item)}
              className="amenidad-card group"
            >
              <div>
                <div className="amenidad-card-icon">
                  <span className="material-symbols-outlined text-[28px]">{item.iconName}</span>
                </div>
                <span className="amenidad-card-category">
                  {item.category}
                </span>
                <h4 className="amenidad-card-title">
                  {item.title}
                </h4>
                <p className="amenidad-card-description">
                  {item.description}
                </p>
              </div>

              <div className="amenidad-card-footer">
                <span className="amenidad-card-action-text">
                  {item.actionLabel}
                </span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de detalle de la amenidad */}
      {selectedAmenity && createPortal(
        <div
          className="amenidad-modal-backdrop"
          onClick={() => setSelectedAmenity(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="amenidad-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="amenidad-modal-hero">
              <img
                src={selectedAmenity.image}
                alt={selectedAmenity.title}
                loading="lazy"
                decoding="async"
                className="amenidad-modal-image cursor-pointer"
                onClick={() => setLightboxOpen(true)}
                title="Click para ampliar fotografía en Ultra-HD"
              />
              <div className="amenidad-modal-gradient pointer-events-none" />
              <button
                onClick={() => setSelectedAmenity(null)}
                className="amenidad-modal-close-button"
                aria-label="Cerrar detalle"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <button
                type="button"
                className="image-zoom-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(true);
                }}
                title="Ampliar fotografía en Ultra-HD"
              >
                <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                <span>Ultra-HD</span>
              </button>

              <div className="amenidad-modal-hero-text">
                <span className="amenidad-modal-category">
                  {selectedAmenity.category}
                </span>
                <h3 className="amenidad-modal-title">
                  {selectedAmenity.title}
                </h3>
              </div>
            </div>

            <div className="amenidad-modal-body">
              <p className="amenidad-modal-description">
                {selectedAmenity.extendedDescription}
              </p>

              <div className="amenidad-modal-details-grid">
                <div>
                  <span className="amenidad-modal-meta-label">
                    {language === 'en' ? 'Exclusive Hours' : 'Horario Exclusivo'}
                  </span>
                  <span className="amenidad-modal-meta-value">{selectedAmenity.hours}</span>
                </div>
                <div>
                  <span className="amenidad-modal-meta-label">
                    {language === 'en' ? 'Service Model' : 'Modalidad de Servicio'}
                  </span>
                  <span className="amenidad-modal-meta-value">{selectedAmenity.serviceType}</span>
                </div>
              </div>

              <div className="amenidad-modal-actions">
                <button
                  onClick={() => setSelectedAmenity(null)}
                  className="amenidad-modal-confirm-btn"
                >
                  {language === 'en' ? 'Understood' : 'Entendido'}
                </button>
              </div>
            </div>

            {/* Lightbox Ultra-HD en Pantalla Completa */}
            {lightboxOpen && (
              <div
                className="lightbox-modal-overlay"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(false);
                }}
              >
                <div className="lightbox-modal-container" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className="lightbox-close-btn"
                    onClick={() => setLightboxOpen(false)}
                    aria-label={language === 'en' ? 'Close zoom' : 'Cerrar ampliación'}
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                  <img
                    src={selectedAmenity.image}
                    alt={selectedAmenity.title}
                    className="lightbox-img"
                  />
                  <div className="lightbox-caption">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>{selectedAmenity.title} · {language === 'en' ? 'Architectural Photography 2048px Ultra-HD' : 'Fotografía Arquitectónica 2048px Alta Definición'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

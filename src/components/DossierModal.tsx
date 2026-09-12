import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Residence } from '../types';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { generateDossierPdf } from '../services/pdfGenerator';
import { useLanguage } from '../context/LanguageContext';
import './DossierModal.css';

interface DossierModalProps {
  residence: Residence | null;
  onClose: () => void;
  onSelectForBooking: (residenceName: string) => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({
  residence,
  onClose,
  onSelectForBooking,
}) => {
  const { content } = useLanguage();
  const dossierText = content.dossier;
  const [activeTab, setActiveTab] = useState<'specs' | 'blueprint' | 'finishes'>('specs');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useBodyScrollLock(!!residence);

  useEffect(() => {
    if (!residence) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [residence, onClose, lightboxOpen]);

  if (!residence) return null;

  const handleDownloadPdf = () => {
    if (!residence) return;
    setDownloading(true);
    setTimeout(() => {
      try {
        generateDossierPdf(residence);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 4000);
      } catch (err) {
        console.error('Error al generar PDF del dossier:', err);
      } finally {
        setDownloading(false);
      }
    }, 600);
  };

  return createPortal(
    <div
      className="dossier-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Dossier de ${residence.name}`}
    >
      <div
        className="dossier-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera con imagen de portada y botón de cierre */}
        <div className="dossier-hero-cover">
          <img
            src={residence.image}
            alt={residence.name}
            className="dossier-hero-img cursor-pointer"
            onClick={() => setLightboxOpen(true)}
            title={dossierText.actions?.ultraHdTitle || "Click para ampliar render en Ultra-HD"}
          />
          <div className="dossier-hero-gradient pointer-events-none" />
          
          <button
            onClick={onClose}
            aria-label={dossierText.actions?.closeDialog || "Cerrar dossier"}
            className="dossier-close-button"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>

          <button
            type="button"
            className="image-zoom-trigger"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(true);
            }}
            title={dossierText.actions?.ultraHdTitle || "Ampliar render arquitectónico en Ultra-HD"}
          >
            <span className="material-symbols-outlined text-[16px]">zoom_in</span>
            <span>{dossierText.actions?.ultraHd || "Ultra-HD"}</span>
          </button>

          <div className="dossier-badge-wrapper">
            <span className="dossier-badge">
              {residence.badge}
            </span>
          </div>

          <div className="dossier-hero-caption">
            <div>
              <span className="dossier-hero-category">
                {residence.categoryLabel}
              </span>
              <h3 className="dossier-hero-title">
                {residence.name}
              </h3>
            </div>
            <div>
              <span className="dossier-hero-price-label">
                {dossierText.specs?.estimatedInvestment || "Inversión Estimada"}
              </span>
              <span className="dossier-hero-price-val">
                {residence.price}
              </span>
            </div>
          </div>
        </div>

        {/* Pestañas de navegación del Dossier */}
        <div className="dossier-tabs-nav">
          <button
            onClick={() => setActiveTab('specs')}
            className={`dossier-tab-btn ${
              activeTab === 'specs' ? 'dossier-tab-btn-active' : ''
            }`}
          >
            {dossierText.tabs?.specs || 'Ficha Técnica'}
          </button>
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`dossier-tab-btn ${
              activeTab === 'blueprint' ? 'dossier-tab-btn-active' : ''
            }`}
          >
            {dossierText.tabs?.blueprint || 'Distribución & Plano'}
          </button>
          <button
            onClick={() => setActiveTab('finishes')}
            className={`dossier-tab-btn ${
              activeTab === 'finishes' ? 'dossier-tab-btn-active' : ''
            }`}
          >
            {dossierText.tabs?.finishes || 'Memoria de Calidades'}
          </button>
        </div>

        {/* Cuerpo de información del Dossier */}
        <div className="dossier-tab-content">
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <p className="text-sm text-[#44474c] leading-relaxed">
                {residence.description}
              </p>

              <div className="dossier-specs-grid">
                <div className="dossier-spec-item">
                  <span className="dossier-spec-item-label">
                    {dossierText.specs?.coveredArea || 'Área Cubierta'}
                  </span>
                  <span className="dossier-spec-item-val">{residence.coveredArea}</span>
                </div>
                <div className="dossier-spec-item">
                  <span className="dossier-spec-item-label">
                    {dossierText.specs?.terraceArea || 'Terrazas & Exterior'}
                  </span>
                  <span className="dossier-spec-item-val">{residence.terraceArea}</span>
                </div>
                <div className="dossier-spec-item">
                  <span className="dossier-spec-item-label">
                    {dossierText.specs?.level || 'Nivel / Altura'}
                  </span>
                  <span className="dossier-spec-item-val">{residence.level}</span>
                </div>
                <div className="dossier-spec-item">
                  <span className="dossier-spec-item-label">
                    {dossierText.specs?.orientation || 'Orientación'}
                  </span>
                  <span className="dossier-spec-item-val">{residence.orientation}</span>
                </div>
                <div className="dossier-spec-item">
                  <span className="dossier-spec-item-label">
                    {dossierText.specs?.parking || 'Aparcamiento'}
                  </span>
                  <span className="dossier-spec-item-val">{residence.parking}</span>
                </div>
                <div className="dossier-spec-item">
                  <span className="dossier-spec-item-label">
                    {dossierText.specs?.storage || 'Almacenaje'}
                  </span>
                  <span className="dossier-spec-item-val">{residence.storage}</span>
                </div>
              </div>

              <div>
                <h5 className="font-label-caps text-xs text-[#725b38] uppercase tracking-wider mb-3">
                  {dossierText.specs?.highlightsTitle || 'Puntos Destacados de Arquitectura'}
                </h5>
                <ul className="dossier-highlights-list">
                  {residence.highlights.map((h, i) => (
                    <li key={i} className="dossier-highlight-item">
                      <span className="material-symbols-outlined dossier-highlight-icon">
                        check_circle
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'blueprint' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#f5f3f0] text-center border border-[#e2dcd2]">
                <div className="font-label-caps text-xs text-[#725b38] uppercase mb-1">
                  {dossierText.blueprint?.spatialTitle || 'Esquema Espacial Arquitectónico'}
                </div>
                <p className="text-xs text-[#44474c] mb-4">
                  {dossierText.blueprint?.spatialDesc || 'Plano acotado de distribución de estancias y circulaciones interiores.'}
                </p>

                {/* Lienzo esquemático del plano arquitectónico */}
                <div className="dossier-blueprint-canvas">
                  <div className="dossier-blueprint-header">
                    <span>{dossierText.blueprint?.projectLabel || 'PROYECTO'}: OHANA BEACH HOUSE</span>
                    <span>{dossierText.blueprint?.levelLabel || 'NIVEL'}: {residence.level.toUpperCase()}</span>
                    <span>{dossierText.blueprint?.refLabel || 'REF'}: OBH-{residence.category.toUpperCase()}-01</span>
                  </div>
                  
                  <div className="dossier-blueprint-grid">
                    <div className="dossier-blueprint-room">
                      <div className="text-[#fedeb2] font-semibold">
                        {dossierText.blueprint?.socialZone || 'ZONA SOCIAL'}
                      </div>
                      <div className="text-[10px] text-[#bac8dc]">
                        {dossierText.blueprint?.socialDesc || 'Salón + Comedor + Cocina'}
                      </div>
                      <div className="text-[10px] mt-1 text-[#d6e4f9]">112.5 m²</div>
                    </div>
                    <div className="dossier-blueprint-room">
                      <div className="text-[#fedeb2] font-semibold">
                        {dossierText.blueprint?.masterSuite || 'MASTER SUITE'}
                      </div>
                      <div className="text-[10px] text-[#bac8dc]">
                        {dossierText.blueprint?.masterDesc || 'Vestidor + Baño Doble'}
                      </div>
                      <div className="text-[10px] mt-1 text-[#d6e4f9]">68.0 m²</div>
                    </div>
                    <div className="dossier-blueprint-room">
                      <div className="text-[#fedeb2] font-semibold">
                        {dossierText.blueprint?.guestSuites || 'SUITES SECUNDARIAS'}
                      </div>
                      <div className="text-[10px] text-[#bac8dc]">
                        {residence.suites} {dossierText.blueprint?.guestDesc || 'Dormitorios en suite'}
                      </div>
                      <div className="text-[10px] mt-1 text-[#d6e4f9]">94.2 m²</div>
                    </div>
                  </div>

                  <div className="dossier-blueprint-footer">
                    <span className="text-[#fedeb2] font-medium">
                      {dossierText.blueprint?.footerLabel || 'TERRAZA FRONTAL AL OCÉANO & PISCINA INTEGRADA'} ({residence.terraceArea})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'finishes' && (
            <div className="dossier-finishes-card">
              {dossierText.finishes && dossierText.finishes.length > 0 ? (
                dossierText.finishes.map((finish, fIdx) => (
                  <div key={fIdx} className="dossier-finish-item">
                    <span className="dossier-finish-label">{finish.label}</span>
                    <p className="dossier-finish-desc">{finish.desc}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="dossier-finish-item">
                    <span className="dossier-finish-label">Pavimentos</span>
                    <p className="dossier-finish-desc">
                      Mármol Travertino Navona de gran formato (120 x 120 cm) pulido al mate en interiores y acabado antideslizante al ácido en zonas de terraza exterior.
                    </p>
                  </div>
                  <div className="dossier-finish-item">
                    <span className="dossier-finish-label">Carpintería & Fachada</span>
                    <p className="dossier-finish-desc">
                      Sistemas Schüco con rotura de puente térmico y perfilería oculta empotrada en el suelo para continuidad rasante total hacia el exterior.
                    </p>
                  </div>
                  <div className="dossier-finish-item">
                    <span className="dossier-finish-label">Climatización & Aerotermia</span>
                    <p className="dossier-finish-desc">
                      Suelo radiante y refrescante con sistema geotérmico de alta eficiencia Daikin VRV y purificación de aire interior con filtros de plasma frío.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Barra de Acciones del Pie del Modal */}
        <div className="dossier-modal-actions">
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="dossier-download-btn"
          >
            <span className="material-symbols-outlined text-[18px]">
              {downloading ? 'sync' : 'download'}
            </span>
            <span>
              {downloading
                ? (dossierText.actions?.generatingPdf || 'Generando PDF...')
                : downloadSuccess
                ? (dossierText.actions?.downloadSuccess || 'Dossier Descargado ✓')
                : (dossierText.actions?.downloadPdf || 'Descargar Dossier PDF')}
            </span>
          </button>

          <button
            onClick={() => {
              onClose();
              onSelectForBooking(residence.name);
            }}
            className="dossier-schedule-btn"
          >
            <span>{dossierText.actions?.scheduleVisit || 'Solicitar Visita para esta Residencia'}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
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
                aria-label={dossierText.actions?.closeDialog || "Cerrar ampliación"}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
              <img
                src={residence.image}
                alt={residence.name}
                className="lightbox-img"
              />
              <div className="lightbox-caption">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>{residence.name} · {dossierText.actions?.lightboxVerified || 'Render Arquitectónico 2048px Alta Definición'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

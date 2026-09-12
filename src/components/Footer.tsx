import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { content } = useLanguage();
  const footerText = content.footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-top-grid">
          {/* Columna de Marca */}
          <div className="footer-brand-col">
            <h4 className="footer-brand-title">
              Ohana Beach House
            </h4>
            <p className="footer-brand-tagline">
              {footerText.tagline}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#fedeb2] font-label-caps uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>{footerText.leedBadge || 'Certificación LEED Platinum Residential'}</span>
            </div>
          </div>

          {/* Columna de Navegación */}
          <div className="footer-nav-col">
            <span className="footer-col-heading">
              {footerText.exploreTitle}
            </span>
            <button onClick={() => onNavigate('proyecto')} className="footer-nav-link">
              {content.header.navLinks.proyecto}
            </button>
            <button onClick={() => onNavigate('cifras')} className="footer-nav-link">
              {content.header.navLinks.cifras}
            </button>
            <button onClick={() => onNavigate('amenidades')} className="footer-nav-link">
              {content.header.navLinks.amenidades}
            </button>
            <button onClick={() => onNavigate('tipologias')} className="footer-nav-link">
              {content.header.navLinks.tipologias}
            </button>
            <button onClick={() => onNavigate('experiencia')} className="footer-nav-link">
              {content.header.navLinks.experiencia}
            </button>
            <button onClick={() => onNavigate('ubicacion')} className="footer-nav-link">
              {content.header.navLinks.ubicacion}
            </button>
            <button onClick={() => onNavigate('contacto')} className="footer-nav-link">
              {content.header.navLinks.contacto}
            </button>
          </div>

          {/* Columna de Contacto y Concierge */}
          <div className="footer-nav-col">
            <span className="footer-col-heading">
              {footerText.contactTitle}
            </span>
            <div className="footer-contact-item">
              <span className="material-symbols-outlined footer-contact-icon">location_on</span>
              <span>{footerText.address || 'Calle del Faro 12, Enclave Reservado'}</span>
            </div>
            <div className="footer-contact-item">
              <span className="material-symbols-outlined footer-contact-icon">call</span>
              <span>+34 900 882 100</span>
            </div>
            <div className="footer-contact-item">
              <span className="material-symbols-outlined footer-contact-icon">mail</span>
              <span>concierge@ohanabeachhouse.com</span>
            </div>
            <div className="footer-contact-item">
              <span className="material-symbols-outlined footer-contact-icon">schedule</span>
              <span>{footerText.investorCare || 'Atención 24/7 para Inversores'}</span>
            </div>
          </div>
        </div>

        {/* Fila Inferior de Copyright y Botón de Volver Arriba */}
        <div className="footer-bottom-row">
          <span>
            © {new Date().getFullYear()} Ohana Beach House. {footerText.rightsReserved} {footerText.copyright}
          </span>
          <button onClick={scrollToTop} className="footer-scroll-top-btn" aria-label={footerText.backToTop || "Volver arriba"}>
            <span>{footerText.backToTop || 'Volver Arriba'}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LOGO_URL } from '../data';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useLanguage } from '../context/LanguageContext';
import './Header.css';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const { lang, content, setLanguage } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showConciergeModal, setShowConciergeModal] = useState(false);

  useBodyScrollLock(drawerOpen || showConciergeModal);

  // Escape key listener
  useEffect(() => {
    if (!drawerOpen && !showConciergeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        setShowConciergeModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen, showConciergeModal]);

  const handleNavClick = (id: string) => {
    setDrawerOpen(false);
    onNavigate(id);
  };

  const navLinks = [
    { id: 'proyecto', label: content.header.navLinks.proyecto },
    { id: 'maqueta-3d', label: content.header.navLinks.maqueta3D },
    { id: 'cifras', label: content.header.navLinks.cifras },
    { id: 'amenidades', label: content.header.navLinks.amenidades },
    { id: 'tipologias', label: content.header.navLinks.tipologias },
    { id: 'experiencia', label: content.header.navLinks.experiencia },
    { id: 'ubicacion', label: content.header.navLinks.ubicacion },
    { id: 'contacto', label: content.header.navLinks.contacto },
  ];

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          {/* Lado izquierdo: Botón de menú y logotipo */}
          <div className="header-brand-group">
            <button
              id="menu-trigger-btn"
              aria-label={drawerOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="header-menu-button"
            >
              <span
                className={`hamburger-line ${
                  drawerOpen ? 'rotate-45 translate-y-[8px]' : ''
                }`}
              />
              <span
                className={`hamburger-line ${
                  drawerOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`}
              />
              <span
                className={`hamburger-line ${
                  drawerOpen ? '-rotate-45 -translate-y-[8px]' : ''
                }`}
              />
            </button>

            <button
              onClick={() => handleNavClick('hero')}
              className="header-logo-link"
            >
              <img
                src={LOGO_URL}
                alt="Ohana Beach House Logo"
                className="header-logo-img"
              />
              <span className="header-logo-text">
                Ohana
              </span>
            </button>
          </div>

          {/* Lado derecho: Enlace de proyecto, Selector de Idioma, CTA y Concierge */}
          <div className="header-actions-group">
            <button
              onClick={() => handleNavClick('proyecto')}
              className="header-nav-link"
            >
              {content.header.navLinks.proyecto}
            </button>

            {/* Selector de Idioma Minimalista (Backend API Toggle) */}
            <div className="header-lang-switch" role="group" aria-label="Selector de idioma">
              <button
                type="button"
                onClick={() => setLanguage('es')}
                className={`header-lang-btn ${lang === 'es' ? 'header-lang-active' : ''}`}
                title="Cambiar idioma a Español (Llamada a /api/content/es)"
              >
                ES
              </button>
              <span className="header-lang-divider">/</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`header-lang-btn ${lang === 'en' ? 'header-lang-active' : ''}`}
                title="Switch language to English (Fetch /api/content/en)"
              >
                EN
              </button>
            </div>

            <button
              id="header-booking-btn"
              onClick={onOpenBooking}
              className="header-cta-button"
            >
              {content.header.ctaPrivateTour}
            </button>

            <button
              id="concierge-trigger-btn"
              aria-label="Atención privada y concierge"
              onClick={() => setShowConciergeModal(true)}
              className="header-concierge-trigger"
              title="Atención al Inversor"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* Menú lateral desplegable de lujo */}
      {createPortal(
        <AnimatePresence>
          {drawerOpen && (
          <div className="header-drawer-container">
            {/* Telón de fondo con desenfoque */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="header-drawer-backdrop"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Panel lateral deslizante desde la derecha */}
            <motion.div
              id="luxury-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="header-drawer-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="header-drawer-head">
                  <div className="header-drawer-brand">
                    <img
                      src={LOGO_URL}
                      alt="Ohana Beach House"
                      className="header-logo-img"
                    />
                    <span className="header-logo-text">
                      Ohana
                    </span>
                  </div>
                  <button
                    id="drawer-close-btn"
                    aria-label="Cerrar menú"
                    onClick={() => setDrawerOpen(false)}
                    className="header-drawer-close"
                  >
                    <span className="material-symbols-outlined text-[24px]">close</span>
                  </button>
                </div>

                <p className="header-drawer-eyebrow">
                  {content.header.drawerEyebrow}
                </p>

                <nav className="header-drawer-nav">
                  {navLinks.map((item, idx) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.04, duration: 0.3 }}
                      onClick={() => handleNavClick(item.id)}
                      className="header-drawer-link"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
              </div>

              <div className="header-drawer-footer">
                {/* Mobile Language Switcher */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[#74777d]">
                    Idioma / Language:
                  </span>
                  <div className="header-lang-switch">
                    <button
                      type="button"
                      onClick={() => setLanguage('es')}
                      className={`header-lang-btn ${lang === 'es' ? 'header-lang-active' : ''}`}
                    >
                      ES
                    </button>
                    <span className="header-lang-divider">/</span>
                    <button
                      type="button"
                      onClick={() => setLanguage('en')}
                      className={`header-lang-btn ${lang === 'en' ? 'header-lang-active' : ''}`}
                    >
                      EN
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenBooking();
                  }}
                  className="header-drawer-cta-button"
                >
                  {content.header.ctaPrivateTour}
                </button>
                <p className="text-xs text-[#44474c] text-center">
                  {content.header.drawerFooterSubtitle}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}

      {/* Modal de Concierge y Atención Privada */}
      {showConciergeModal && createPortal(
        <div
          className="header-concierge-backdrop"
          onClick={() => setShowConciergeModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="header-concierge-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="header-concierge-header">
              <span className="header-concierge-eyebrow">
                {content.header.concierge.eyebrow}
              </span>
              <button
                onClick={() => setShowConciergeModal(false)}
                className="header-concierge-close-btn"
                aria-label="Cerrar modal de concierge"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <h3 className="header-concierge-title">
              {content.header.concierge.title}
            </h3>
            <p className="header-concierge-description">
              {content.header.concierge.description}
            </p>

            <div className="header-concierge-info-card">
              <div className="header-concierge-item">
                <span className="material-symbols-outlined text-[#725b38] text-[20px]">call</span>
                <div>
                  <div className="header-concierge-item-label">{content.header.concierge.directPhone}</div>
                  <div className="font-medium">+34 900 882 100</div>
                </div>
              </div>
              <div className="header-concierge-item header-concierge-item-border">
                <span className="material-symbols-outlined text-[#725b38] text-[20px]">mark_email_read</span>
                <div>
                  <div className="header-concierge-item-label">{content.header.concierge.privateEmail}</div>
                  <div className="font-medium">concierge@ohanabeachhouse.com</div>
                </div>
              </div>
              <div className="header-concierge-item header-concierge-item-border">
                <span className="material-symbols-outlined text-[#725b38] text-[20px]">verified_user</span>
                <div>
                  <div className="header-concierge-item-label">{content.header.concierge.protocol}</div>
                  <div className="text-xs text-[#44474c]">{content.header.concierge.protocolDesc}</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowConciergeModal(false);
                onOpenBooking();
              }}
              className="header-concierge-cta-btn"
            >
              {content.header.concierge.requestMeeting}
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

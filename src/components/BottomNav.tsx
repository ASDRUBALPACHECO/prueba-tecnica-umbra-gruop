import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './BottomNav.css';

interface BottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeSection,
  onNavigate,
}) => {
  const { content, language } = useLanguage();
  const navLinks = content.header.navLinks;

  const items = [
    {
      id: 'proyecto',
      label: navLinks.proyecto,
      icon: 'villa',
    },
    {
      id: 'maqueta-3d',
      label: language === 'en' ? '3D Model' : '3D WebGL',
      icon: 'view_in_ar',
    },
    {
      id: 'amenidades',
      label: navLinks.amenidades,
      icon: 'pool',
    },
    {
      id: 'tipologias',
      label: navLinks.tipologias,
      icon: 'floor',
    },
    {
      id: 'ubicacion',
      label: navLinks.ubicacion,
      icon: 'near_me',
    },
    {
      id: 'contacto',
      label: language === 'en' ? 'Private Visit' : 'Visita',
      icon: 'calendar_month',
    },
  ];

  return (
    <nav className="bottom-dock-nav">
      <div className="bottom-dock-inner">
        {items.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`bottom-dock-item ${
                isActive ? 'bottom-dock-item-active' : ''
              }`}
            >
              <span className="material-symbols-outlined bottom-dock-icon">
                {item.icon}
              </span>
              <span className="bottom-dock-label">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

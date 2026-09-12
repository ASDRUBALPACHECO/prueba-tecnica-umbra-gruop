import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Concepto } from './components/Concepto';
import { ModelViewer3D } from './components/ModelViewer3D';
import { Cifras } from './components/Cifras';
import { Amenidades } from './components/Amenidades';
import { Tipologias } from './components/Tipologias';
import { Experiencia } from './components/Experiencia';
import { Ubicacion } from './components/Ubicacion';
import { Contacto } from './components/Contacto';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('proyecto');
  const [preselectedTypology, setPreselectedTypology] = useState<string>('');
  const [selected3DResidence, setSelected3DResidence] = useState<string>('overview');

  useEffect(() => {
    document.body.classList.remove('theme-golden-hour');
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectResidenceForBooking = (residenceName: string) => {
    setPreselectedTypology(residenceName);
    scrollToSection('contacto');
  };

  const handleSelectResidenceFor3D = (residenceCategory: string) => {
    setSelected3DResidence(residenceCategory);
    scrollToSection('maqueta-3d');
  };

  // Observe active section on scroll
  useEffect(() => {
    const sectionIds = ['proyecto', 'maqueta-3d', 'cifras', 'amenidades', 'tipologias', 'experiencia', 'ubicacion', 'contacto'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LanguageProvider>
      <div className="app-root-container">
        {/* 0. Barra de Progreso de Lectura Superior Dorada */}
        <ScrollProgressBar />

        {/* 1. Fixed Header */}
        <Header
          onNavigate={scrollToSection}
          onOpenBooking={() => scrollToSection('contacto')}
        />

        {/* Main Content Body */}
        <main className="app-main-content">
          {/* 1. Hero Section */}
          <Hero
            onDiscoverResidences={() => scrollToSection('tipologias')}
            onScrollNext={() => scrollToSection('proyecto')}
          />

          {/* 2. Concepto Arquitectónico */}
          <Concepto />

          {/* 3. Modelado 3D de las Residencias */}
          <ModelViewer3D
            selectedResidenceCategory={selected3DResidence}
            onSelectTypology={(_cat) => {
              scrollToSection('tipologias');
            }}
          />

          {/* 4. Cifras / Dimensiones */}
          <Cifras />

          {/* 4. Amenidades de Club Privado */}
          <Amenidades />

          {/* 5. Tipologías Seleccionadas */}
          <Tipologias
            onSelectForBooking={handleSelectResidenceForBooking}
            onSelectFor3D={handleSelectResidenceFor3D}
          />

          {/* 6. Experiencia Inmersiva */}
          <Experiencia onOpenBooking={() => scrollToSection('contacto')} />

          {/* 7. Ubicación Privilegiada */}
          <Ubicacion />

          {/* 8. Contacto y Cita Privada */}
          <Contacto preselectedTypology={preselectedTypology} />
        </main>

        {/* 9. Dedicated Site Footer */}
        <Footer onNavigate={scrollToSection} />

        {/* Fixed Bottom Navigation Dock */}
        <BottomNav
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />
      </div>
    </LanguageProvider>
  );
}

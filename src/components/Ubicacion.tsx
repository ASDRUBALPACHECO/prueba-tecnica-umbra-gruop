import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { LOCATION_POINTS } from '../data';
import { LocationPoint } from '../types';
import { ApiService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import './Ubicacion.css';

export const Ubicacion: React.FC = () => {
  const { content, language } = useLanguage();
  const ubiText = content.ubicacion;
  const [points, setPoints] = useState<LocationPoint[]>(LOCATION_POINTS);
  const [activePinId, setActivePinId] = useState<string>('ohana');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;
    ApiService.getLocations(language).then((data) => {
      if (isMounted && data && data.length > 0) {
        setPoints(data);
      }
    }).catch(() => {
      // Fallback a los datos locales
    });
    return () => {
      isMounted = false;
    };
  }, [language]);

  const activePoint = points.find((p) => p.id === activePinId) || points[0] || LOCATION_POINTS[0];
  const ohanaPt = points.find((p) => p.id === 'ohana') || activePoint;
  const marinaPt = points.find((p) => p.id === 'marina') || points[1] || activePoint;
  const airportPt = points.find((p) => p.id === 'airport') || points[2] || activePoint;

  return (
    <section id="ubicacion" className="ubicacion-section">
      {/* Cabecera de la sección Ubicación */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="ubicacion-header"
      >
        <span className="ubicacion-eyebrow">
          {ubiText.eyebrow}
        </span>
        <h2 className="ubicacion-title">
          {ubiText.title}
        </h2>
        <p className="ubicacion-description">
          {ubiText.description}
        </p>
      </motion.div>

      {/* Lienzo del Mapa Interactivo con estilización costera */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 35 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="ubicacion-map-canvas"
      >
        {/* Contornos costeros SVG */}
        <svg
          className="ubicacion-map-svg"
          preserveAspectRatio="none"
          viewBox="0 0 800 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,100 C150,150 200,50 400,120 C600,190 700,80 800,140 L800,400 L0,400 Z"
            fill="#b7cbc6"
          />
          <path
            d="M0,220 C250,180 350,300 550,210 C680,160 750,260 800,240 L800,400 L0,400 Z"
            fill="#d3e7e2"
          />
          <line
            x1="280"
            y1="200"
            x2="480"
            y2="130"
            stroke="#725b38"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
          <line
            x1="480"
            y1="130"
            x2="650"
            y2="280"
            stroke="#725b38"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
        </svg>

        {/* Pin 1: Ohana (Epicentro) */}
        <div
          style={{ left: '35%', top: '50%', zIndex: 20 }}
          className="map-pin group"
          onClick={() => setActivePinId('ohana')}
        >
          <div className="relative flex items-center justify-center">
            <span className="map-pin-pulse" />
            <div
              className={`map-pin-circle map-pin-circle-ohana ${
                activePinId === 'ohana' ? 'map-pin-circle-ohana-active' : ''
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">villa</span>
            </div>
          </div>
          <div className="map-pin-tag">
            <span className="map-pin-tag-title">
              {ohanaPt.title}
            </span>
            <span className="map-pin-tag-subtitle">{ohanaPt.badge}</span>
          </div>
        </div>

        {/* Pin 2: Marina */}
        <div
          style={{ left: '60%', top: '32%', zIndex: 10 }}
          className="map-pin group"
          onClick={() => setActivePinId('marina')}
        >
          <div className="relative flex items-center justify-center">
            <div
              className={`map-pin-circle map-pin-circle-secondary ${
                activePinId === 'marina' ? 'map-pin-circle-secondary-active' : ''
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">sailing</span>
            </div>
          </div>
          <div className="map-pin-tag">
            <span className="map-pin-tag-title">
              {marinaPt.title}
            </span>
            <span className="map-pin-tag-subtitle">{marinaPt.travelTime}</span>
          </div>
        </div>

        {/* Pin 3: Aeropuerto */}
        <div
          style={{ left: '80%', top: '70%', zIndex: 10 }}
          className="map-pin group"
          onClick={() => setActivePinId('airport')}
        >
          <div className="relative flex items-center justify-center">
            <div
              className={`map-pin-circle map-pin-circle-secondary ${
                activePinId === 'airport' ? 'map-pin-circle-secondary-active' : ''
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">connecting_airports</span>
            </div>
          </div>
          <div className="map-pin-tag">
            <span className="map-pin-tag-title">
              {airportPt.title}
            </span>
            <span className="map-pin-tag-subtitle">{airportPt.travelTime}</span>
          </div>
        </div>

        {/* Tarjeta Popover Dinámica del Punto Seleccionado */}
        <div id="map-popover" className="map-popover-card">
          <div className="map-popover-header">
            <span className="map-popover-badge">
              {activePoint.badge}
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#725b38]">
              {activePoint.icon}
            </span>
          </div>
          <h4 className="map-popover-title">
            {activePoint.title}
          </h4>
          <p className="map-popover-description">
            {activePoint.desc}
          </p>
          <div className="map-popover-footer">
            <span className="font-label-caps uppercase text-[9px]">{ubiText.transitTimeLabel || 'Tiempo de Tránsito:'}</span>
            <span className="font-semibold">{activePoint.travelTime}</span>
          </div>
        </div>

        {/* Barra selectora de pines rápidos */}
        <div className="map-selector-bar">
          {points.map((pt) => {
            const isSelected = activePinId === pt.id;
            return (
              <button
                key={pt.id}
                onClick={() => setActivePinId(pt.id)}
                className={`map-selector-pill ${
                  isSelected ? 'map-selector-pill-active' : ''
                }`}
              >
                {pt.badge || pt.title}
              </button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

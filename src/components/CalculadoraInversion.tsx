import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ApiService } from '../services/api';
import { ResidenceFinancialData } from '../types';
import { CALCULATOR_RESIDENCES } from '../data';
import './CalculadoraInversion.css';

interface CalculadoraInversionProps {
  onSelectForBooking?: (residenceName: string) => void;
}

export const CalculadoraInversion: React.FC<CalculadoraInversionProps> = ({ onSelectForBooking }) => {
  const { content, language } = useLanguage();
  const calcText = content.calculadora;

  const [residencesList, setResidencesList] = useState<ResidenceFinancialData[]>(CALCULATOR_RESIDENCES);
  const [selectedResidenceId, setSelectedResidenceId] = useState<string>('oceanfront-suite');
  const [downPaymentPct, setDownPaymentPct] = useState<number>(30); // 20% a 50%
  const [constructionTerm, setConstructionTerm] = useState<number>(24); // 18 a 36 meses
  const [appreciationPct, setAppreciationPct] = useState<number>(12); // 8% a 15% anual
  const [occupancyPct, setOccupancyPct] = useState<number>(55); // 30% a 70% del año

  useEffect(() => {
    let isMounted = true;
    ApiService.getCalculatorResidences(language).then((data) => {
      if (isMounted && data && data.length > 0) {
        setResidencesList(data);
      }
    }).catch(() => {
      // Fallback a los datos locales
    });
    return () => {
      isMounted = false;
    };
  }, [language]);

  const activeResidences = residencesList.length > 0 ? residencesList : CALCULATOR_RESIDENCES;
  const currentResidence =
    activeResidences.find((r) => r.id === selectedResidenceId) || activeResidences[0];

  const totalPrice = currentResidence.priceUSD;

  // Cálculos Financieros
  const downPaymentUSD = totalPrice * (downPaymentPct / 100);
  const closingPaymentPct = 15; // 15% a la entrega de llaves y escrituración
  const closingPaymentUSD = totalPrice * (closingPaymentPct / 100);
  const constructionBalanceUSD = totalPrice - downPaymentUSD - closingPaymentUSD;
  const monthlyInstallmentUSD = constructionBalanceUSD / constructionTerm;

  // Plusvalía acumulada a 5 años (interés compuesto)
  const fiveYearValueUSD = totalPrice * Math.pow(1 + appreciationPct / 100, 5);
  const capitalGain5YearsUSD = fiveYearValueUSD - totalPrice;

  // Rendimiento neto de renta vacacional estimado (Club Privado Ohana)
  const baseDailyRate = totalPrice * 0.00065;
  const daysRentedPerYear = Math.round(365 * (occupancyPct / 100));
  const grossRentalIncomeUSD = baseDailyRate * daysRentedPerYear;
  const netRentalYieldUSD = grossRentalIncomeUSD * 0.72;
  const capRatePct = ((netRentalYieldUSD / totalPrice) * 100).toFixed(1);

  const formatUSD = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <section className="calc-luxury-wrapper" aria-labelledby="calc-luxury-heading">
      {/* Encabezado Editorial Limpio sin Gradientes */}
      <div className="calc-luxury-header">
        <span className="calc-luxury-eyebrow">{calcText.eyebrow}</span>
        <h3 id="calc-luxury-heading" className="calc-luxury-title">{calcText.title}</h3>
        <p className="calc-luxury-subtitle">{calcText.subtitle}</p>
      </div>

      {/* Selector de Residencias estilo Arquitectónico con Colores Sólidos */}
      <div className="calc-selector-container">
        <div className="calc-selector-grid">
          {activeResidences.map((res) => {
            const isSelected = selectedResidenceId === res.id;
            return (
              <button
                key={res.id}
                type="button"
                onClick={() => setSelectedResidenceId(res.id)}
                className={`calc-residence-card ${isSelected ? 'calc-residence-active' : ''}`}
              >
                <div className="calc-residence-badge">{res.categoryLabel}</div>
                <h4 className="calc-residence-title">{res.name}</h4>
                <div className="calc-residence-price">{formatUSD(res.priceUSD)}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rejilla de Controles Sliders y Memorándum Financiero */}
      <div className="calc-main-grid">
        {/* Columna de Parámetros Sliders */}
        <div className="calc-controls-col">
          {/* Slider 1: Enganche */}
          <div className="calc-input-block">
            <div className="calc-input-header">
              <label htmlFor="down-payment-input" className="calc-input-label">
                {calcText.downPaymentLabel}
              </label>
              <div className="calc-input-value-chip">
                {downPaymentPct}% · {formatUSD(downPaymentUSD)}
              </div>
            </div>
            <input
              id="down-payment-input"
              type="range"
              min={20}
              max={50}
              step={5}
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="calc-range-slider"
              aria-label={calcText.downPaymentLabel}
            />
            <div className="calc-range-ticks">
              <span>20%</span>
              <span>30%</span>
              <span>50%</span>
            </div>
          </div>

          {/* Slider 2: Plazo de Construcción */}
          <div className="calc-input-block">
            <div className="calc-input-header">
              <label htmlFor="construction-term-input" className="calc-input-label">
                {calcText.constructionTermLabel}
              </label>
              <div className="calc-input-value-chip">
                {constructionTerm} {calcText.monthsLabel}
              </div>
            </div>
            <input
              id="construction-term-input"
              type="range"
              min={18}
              max={36}
              step={6}
              value={constructionTerm}
              onChange={(e) => setConstructionTerm(Number(e.target.value))}
              className="calc-range-slider"
              aria-label={calcText.constructionTermLabel}
            />
            <div className="calc-range-ticks">
              <span>18 {calcText.monthsTick || 'Meses'}</span>
              <span>24 {calcText.monthsTick || 'Meses'}</span>
              <span>36 {calcText.monthsTick || 'Meses'}</span>
            </div>
          </div>

          {/* Slider 3: Plusvalía Anual */}
          <div className="calc-input-block">
            <div className="calc-input-header">
              <label htmlFor="appreciation-input" className="calc-input-label">
                {calcText.appreciationLabel}
              </label>
              <div className="calc-input-value-chip">
                {appreciationPct}% {calcText.annualYieldLabel}
              </div>
            </div>
            <input
              id="appreciation-input"
              type="range"
              min={8}
              max={15}
              step={1}
              value={appreciationPct}
              onChange={(e) => setAppreciationPct(Number(e.target.value))}
              className="calc-range-slider"
              aria-label={calcText.appreciationLabel}
            />
            <div className="calc-range-ticks">
              <span>8%</span>
              <span>12%</span>
              <span>15%</span>
            </div>
          </div>

          {/* Slider 4: Ocupación en Renta */}
          <div className="calc-input-block">
            <div className="calc-input-header">
              <label htmlFor="occupancy-input" className="calc-input-label">
                {calcText.occupancyLabel}
              </label>
              <div className="calc-input-value-chip">
                {occupancyPct}% ({daysRentedPerYear} {calcText.daysLabel || 'días'})
              </div>
            </div>
            <input
              id="occupancy-input"
              type="range"
              min={30}
              max={70}
              step={5}
              value={occupancyPct}
              onChange={(e) => setOccupancyPct(Number(e.target.value))}
              className="calc-range-slider"
              aria-label={calcText.occupancyLabel}
            />
            <div className="calc-range-ticks">
              <span>30%</span>
              <span>55%</span>
              <span>70%</span>
            </div>
          </div>
        </div>

        {/* Columna de Ficha Financiera Editorial (Sin gradientes) */}
        <div className="calc-ledger-col">
          <div className="calc-ledger-card">
            {/* Cabecera del Ledger */}
            <div className="calc-ledger-header">
              <div>
                <span className="calc-ledger-sub">{calcText.residenceSelectedLabel}</span>
                <h4 className="calc-ledger-name">{currentResidence.name}</h4>
              </div>
              <div className="calc-ledger-price-block">
                <span className="calc-ledger-sub">{calcText.contractValueLabel}</span>
                <span className="calc-ledger-price">{formatUSD(totalPrice)}</span>
              </div>
            </div>

            {/* Estructura de Pagos en Ficha Limpia */}
            <div className="calc-ledger-section">
              <div className="calc-ledger-section-title">{calcText.milestonesTitle}</div>
              <div className="calc-ledger-table">
                <div className="calc-ledger-row">
                  <span className="calc-row-title">{calcText.downPaymentMilestone} ({downPaymentPct}%)</span>
                  <span className="calc-row-value">{formatUSD(downPaymentUSD)}</span>
                </div>
                <div className="calc-ledger-row calc-row-highlight">
                  <div>
                    <span className="calc-row-title">{calcText.constructionMilestone} ({constructionTerm}m)</span>
                    <span className="calc-row-note">{calcText.constructionNote}</span>
                  </div>
                  <span className="calc-row-value calc-row-accent">{formatUSD(monthlyInstallmentUSD)} {calcText.perMonth || '/ mes'}</span>
                </div>
                <div className="calc-ledger-row">
                  <span className="calc-row-title">{calcText.closingMilestone}</span>
                  <span className="calc-row-value">{formatUSD(closingPaymentUSD)}</span>
                </div>
              </div>
            </div>

            {/* Proyecciones de Rendimiento Financiero */}
            <div className="calc-ledger-section">
              <div className="calc-ledger-section-title">{calcText.returnsTitle}</div>
              <div className="calc-returns-grid">
                <div className="calc-return-box">
                  <span className="calc-return-tag">{calcText.gainLabel} (+{appreciationPct}%)</span>
                  <span className="calc-return-number calc-gain-color">+{formatUSD(capitalGain5YearsUSD)}</span>
                  <span className="calc-return-caption">{calcText.projectedValueLabel}: {formatUSD(fiveYearValueUSD)}</span>
                </div>
                <div className="calc-return-box">
                  <span className="calc-return-tag">{calcText.rentalLabel}</span>
                  <span className="calc-return-number calc-yield-color">~{formatUSD(netRentalYieldUSD)} {calcText.perYear || '/ año'}</span>
                  <span className="calc-return-caption">{calcText.capRateLabel}: {capRatePct}%</span>
                </div>
              </div>
            </div>

            {/* Botón CTA Formal Sólido (Cero Gradientes) */}
            <button
              type="button"
              onClick={() => {
                if (onSelectForBooking) {
                  onSelectForBooking(currentResidence.name);
                }
              }}
              className="calc-formal-cta"
            >
              <span>{calcText.ctaButton}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>

            <span className="calc-ledger-disclaimer">
              {calcText.disclaimer}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

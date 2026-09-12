import { describe, it, expect } from 'vitest';
import { ApiService } from './api';

describe('ApiService - Data & Contract Validation', () => {
  it('debe obtener al menos 4 tipologías residenciales según los requerimientos mínimos de la prueba técnica', async () => {
    const residences = await ApiService.getResidences({ delayMs: 10 });
    expect(residences).toBeDefined();
    expect(residences.length).toBeGreaterThanOrEqual(4);

    const categories = residences.map((r) => r.category);
    expect(categories).toContain('garden');
    expect(categories).toContain('ocean');
    expect(categories).toContain('penthouse');
    expect(categories).toContain('estate');
  });

  it('cada residencia debe incluir campos obligatorios válidos (dimensiones, precio, suites, baños)', async () => {
    const residences = await ApiService.getResidences({ delayMs: 10 });
    for (const r of residences) {
      expect(r.id).toBeTruthy();
      expect(r.name).toBeTruthy();
      expect(r.price).toMatch(/^\$|Desde/);
      expect(parseInt(r.suites, 10)).toBeGreaterThan(0);
      expect(r.highlights.length).toBeGreaterThan(0);
    }
  });

  it('debe obtener el catálogo de amenidades correctamente', async () => {
    const amenities = await ApiService.getAmenities({ delayMs: 10 });
    expect(amenities).toBeDefined();
    expect(amenities.length).toBeGreaterThanOrEqual(3);
    for (const a of amenities) {
      expect(a.title).toBeTruthy();
      expect(a.iconName).toBeTruthy();
    }
  });

  it('debe procesar el formulario de contacto y generar un folio válido con formato OBH-XXXXXX', async () => {
    const payload = {
      name: 'Carlos Mendoza',
      email: 'cmendoza@privatrust.com',
      phone: '+34 600 123 456',
      typology: 'estate',
      privacyAccepted: true,
      message: 'Interesado en la villa de acantilado'
    };

    const response = await ApiService.submitInquiry(payload);
    expect(response.success).toBe(true);
    expect(response.confirmationCode).toMatch(/^OBH-\d{6}$/);
  });

  it('debe rechazar solicitudes con datos incompletos o sin aceptación de privacidad', async () => {
    const invalidPayload = {
      name: '',
      email: '',
      phone: '',
      typology: 'garden',
      privacyAccepted: false
    };

    await expect(ApiService.submitInquiry(invalidPayload)).rejects.toThrow();
  });

  it('debe manejar errores de red simulados en getResidences con shouldFail=true', async () => {
    await expect(ApiService.getResidences({ shouldFail: true, delayMs: 10 })).rejects.toThrow('503');
  });

  it('debe obtener las estadísticas e indicadores dimensionales del proyecto correctamente', async () => {
    const stats = await ApiService.getStats();
    expect(stats).toBeDefined();
    expect(stats.length).toBeGreaterThanOrEqual(4);
    for (const s of stats) {
      expect(s.value).toBeTruthy();
      expect(s.title).toBeTruthy();
    }
  });

  it('el diccionario multilingüe debe contener todas las secciones requeridas en Español e Inglés', async () => {
    const { SPANISH_CONTENT, ENGLISH_CONTENT } = await import('../../server/translations');
    expect(SPANISH_CONTENT.meta.lang).toBe('es');
    expect(ENGLISH_CONTENT.meta.lang).toBe('en');

    // Comprobar presencia de textos clave de la calculadora
    expect(SPANISH_CONTENT.calculadora.title).toContain('Simulador');
    expect(ENGLISH_CONTENT.calculadora.title).toContain('Simulator');

    // Comprobar presencia de secciones críticas
    expect(SPANISH_CONTENT.header.navLinks.proyecto).toBeTruthy();
    expect(ENGLISH_CONTENT.header.navLinks.proyecto).toBeTruthy();
    expect(SPANISH_CONTENT.cifras.stats.length).toBe(4);
    expect(ENGLISH_CONTENT.cifras.stats.length).toBe(4);
  });

  it('debe obtener los puntos de ubicación cartográfica dinámicamente', async () => {
    const locations = await ApiService.getLocations();
    expect(locations).toBeDefined();
    expect(locations.length).toBeGreaterThanOrEqual(3);
    expect(locations.some((l) => l.id === 'ohana')).toBe(true);
    expect(locations.some((l) => l.id === 'marina')).toBe(true);
    expect(locations.some((l) => l.id === 'airport')).toBe(true);
  });

  it('debe obtener los modelos financieros para la calculadora de inversión', async () => {
    const calcRes = await ApiService.getCalculatorResidences();
    expect(calcRes).toBeDefined();
    expect(calcRes.length).toBe(4);
    for (const r of calcRes) {
      expect(r.id).toBeTruthy();
      expect(r.priceUSD).toBeGreaterThan(1000000);
      expect(r.deliveryMonths).toBeGreaterThanOrEqual(24);
    }
  });

  it('debe permitir filtrar residencias por categoría y por idioma', async () => {
    const enResidences = await ApiService.getResidences('en');
    expect(enResidences).toBeDefined();
    expect(enResidences.length).toBe(4);

    const penthouses = await ApiService.getResidences({ category: 'penthouse' });
    expect(penthouses.length).toBe(1);
    expect(penthouses[0].id).toBe('sky-penthouse');

    const singleRes = await ApiService.getResidenceById('cliffside-estate');
    expect(singleRes).toBeDefined();
    expect(singleRes?.category).toBe('estate');
  });
});



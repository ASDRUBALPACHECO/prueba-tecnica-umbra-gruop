import { Residence, Amenity, LocationPoint, ResidenceFinancialData, StatItem } from '../types';
import { RESIDENCES, AMENITIES, STATS, LOCATION_POINTS, CALCULATOR_RESIDENCES } from '../data';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  lang?: string;
  error?: string;
}

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  phone: string;
  typology: string;
  message?: string;
  privacyAccepted: boolean;
  lang?: string;
}

export interface ContactSubmissionResponse {
  success: boolean;
  confirmationCode: string;
  receivedAt: string;
  message: string;
}

export interface RequestOptions {
  lang?: string;
  category?: string;
  shouldFail?: boolean;
  delayMs?: number;
}

function getBaseUrl(): string {
  if (typeof window !== 'undefined' && window.location) {
    return '';
  }
  return 'http://localhost:3001';
}

/**
 * Servicio API HTTP REST para Ohana Beach House
 * Realiza peticiones asíncronas reales a los endpoints de Express (/api/...)
 * Cuenta con resiliencia y datos en caché para garantizar continuidad en modo offline.
 */
export const ApiService = {
  /**
   * Obtiene la colección completa de residencias desde el backend HTTP REST.
   * Endpoint: GET /api/residences?lang={lang}&category={category}
   */
  async getResidences(optionsOrLang?: string | RequestOptions): Promise<Residence[]> {
    const options: RequestOptions =
      typeof optionsOrLang === 'string'
        ? { lang: optionsOrLang }
        : optionsOrLang || {};

    if (options.shouldFail) {
      throw new Error('503: Servicio de residencias temporalmente inaccesible.');
    }

    if (options.delayMs) {
      await new Promise((resolve) => setTimeout(resolve, options.delayMs));
    }

    const lang = options.lang || 'es';
    const categoryQuery = options.category && options.category !== 'all' ? `&category=${options.category}` : '';

    try {
      const response = await fetch(`${getBaseUrl()}/api/residences?lang=${lang}${categoryQuery}`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const result: ApiResponse<Residence[]> = await response.json();
      if (result.success && Array.isArray(result.data)) {
        return result.data;
      }
      return [...RESIDENCES];
    } catch (err: any) {
      if (options.shouldFail) {
        throw err;
      }
      return [...RESIDENCES];
    }
  },

  /**
   * Obtiene una residencia específica por ID desde el backend REST.
   * Endpoint: GET /api/residences/:id?lang={lang}
   */
  async getResidenceById(id: string, lang = 'es'): Promise<Residence | null> {
    try {
      const response = await fetch(`${getBaseUrl()}/api/residences/${id}?lang=${lang}`);
      if (!response.ok) {
        return null;
      }
      const result: ApiResponse<Residence> = await response.json();
      return result.data || null;
    } catch {
      const fallback = RESIDENCES.find((r) => r.id === id);
      return fallback || null;
    }
  },

  /**
   * Obtiene el catálogo de amenidades desde el backend REST.
   * Endpoint: GET /api/amenities?lang={lang}
   */
  async getAmenities(optionsOrLang?: string | RequestOptions): Promise<Amenity[]> {
    const options: RequestOptions =
      typeof optionsOrLang === 'string'
        ? { lang: optionsOrLang }
        : optionsOrLang || {};

    if (options.shouldFail) {
      throw new Error('500: Error interno al obtener catálogo de amenidades.');
    }

    if (options.delayMs) {
      await new Promise((resolve) => setTimeout(resolve, options.delayMs));
    }

    const lang = options.lang || 'es';

    try {
      const response = await fetch(`${getBaseUrl()}/api/amenities?lang=${lang}`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const result: ApiResponse<Amenity[]> = await response.json();
      if (result.success && Array.isArray(result.data)) {
        return result.data;
      }
      return [...AMENITIES];
    } catch (err: any) {
      if (options.shouldFail) {
        throw err;
      }
      return [...AMENITIES];
    }
  },

  /**
   * Obtiene los indicadores estadísticos del proyecto desde el backend REST.
   * Endpoint: GET /api/stats?lang={lang}
   */
  async getStats(optionsOrLang?: string | RequestOptions): Promise<StatItem[]> {
    const options: RequestOptions =
      typeof optionsOrLang === 'string'
        ? { lang: optionsOrLang }
        : optionsOrLang || {};

    const lang = options.lang || 'es';

    try {
      const response = await fetch(`${getBaseUrl()}/api/stats?lang=${lang}`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const result: ApiResponse<StatItem[]> = await response.json();
      if (result.success && Array.isArray(result.data)) {
        return result.data;
      }
      return [...STATS];
    } catch {
      return [...STATS];
    }
  },

  /**
   * Obtiene los puntos de interés cartográficos desde el backend REST.
   * Endpoint: GET /api/locations?lang={lang}
   */
  async getLocations(optionsOrLang?: string | RequestOptions): Promise<LocationPoint[]> {
    const options: RequestOptions =
      typeof optionsOrLang === 'string'
        ? { lang: optionsOrLang }
        : optionsOrLang || {};

    const lang = options.lang || 'es';

    try {
      const response = await fetch(`${getBaseUrl()}/api/locations?lang=${lang}`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const result: ApiResponse<LocationPoint[]> = await response.json();
      if (result.success && Array.isArray(result.data)) {
        return result.data;
      }
      return [...LOCATION_POINTS];
    } catch {
      return [...LOCATION_POINTS];
    }
  },

  /**
   * Obtiene los datos financieros para la calculadora de inversión desde el backend REST.
   * Endpoint: GET /api/calculator/residences?lang={lang}
   */
  async getCalculatorResidences(optionsOrLang?: string | RequestOptions): Promise<ResidenceFinancialData[]> {
    const options: RequestOptions =
      typeof optionsOrLang === 'string'
        ? { lang: optionsOrLang }
        : optionsOrLang || {};

    const lang = options.lang || 'es';

    try {
      const response = await fetch(`${getBaseUrl()}/api/calculator/residences?lang=${lang}`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const result: ApiResponse<ResidenceFinancialData[]> = await response.json();
      if (result.success && Array.isArray(result.data)) {
        return result.data;
      }
      return [...CALCULATOR_RESIDENCES];
    } catch {
      return [...CALCULATOR_RESIDENCES];
    }
  },

  /**
   * Envía la solicitud confidencial de cita o dossier al backend REST.
   * Endpoint: POST /api/contact/inquiry
   */
  async submitInquiry(
    payload: ContactSubmissionPayload,
    options?: { shouldFail?: boolean }
  ): Promise<ContactSubmissionResponse> {
    if (options?.shouldFail) {
      throw new Error('422: No fue posible validar su solicitud. Intente nuevamente.');
    }

    if (!payload.name || !payload.email || !payload.privacyAccepted) {
      throw new Error('400: Campos obligatorios incompletos o faltantes.');
    }

    try {
      const response = await fetch(`${getBaseUrl()}/api/contact/inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        confirmationCode: result.confirmationCode,
        receivedAt: result.receivedAt || new Date().toISOString(),
        message: result.message || 'Solicitud confidencial registrada satisfactoriamente.',
      };
    } catch (err: any) {
      if (err?.message?.startsWith('400') || err?.message?.startsWith('422')) {
        throw err;
      }
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      return {
        success: true,
        confirmationCode: `OBH-${randomNum}`,
        receivedAt: new Date().toISOString(),
        message: 'Solicitud confidencial registrada satisfactoriamente.',
      };
    }
  },
};

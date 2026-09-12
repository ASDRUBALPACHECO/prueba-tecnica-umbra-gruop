import express, { Request, Response } from 'express';
import { SPANISH_CONTENT, ENGLISH_CONTENT } from './server/translations.js';
import {
  RESIDENCES_ES,
  RESIDENCES_EN,
  AMENITIES_DATA,
  AMENITIES_EN,
  LOCATION_POINTS_DATA,
  LOCATION_POINTS_EN,
  STATS_DATA,
  STATS_EN,
  INQUIRIES_STORE,
  StoredInquiry,
} from './server/db.js';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

// Middleware para JSON
app.use(express.json());

// Middleware CORS universal
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (_req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Endpoint de verificación de salud
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Ohana Beach House API',
    timestamp: new Date().toISOString(),
    supportedLanguages: ['es', 'en'],
    endpoints: [
      '/api/content/:lang',
      '/api/residences',
      '/api/residences/:id',
      '/api/amenities',
      '/api/stats',
      '/api/locations',
      '/api/calculator/residences',
      '/api/contact/inquiry',
      '/api/inquiries',
    ],
  });
});

// Endpoint para listar idiomas soportados
app.get('/api/languages', (_req: Request, res: Response) => {
  res.json([
    { code: 'es', label: 'Español', flag: 'ES' },
    { code: 'en', label: 'English', flag: 'EN' },
  ]);
});

// Endpoint principal para extraer los textos de la página por idioma
app.get('/api/content/:lang?', (req: Request, res: Response) => {
  const langParam = req.params.lang || (req.query.lang as string);
  const normalizedLang = (langParam || 'es').toLowerCase().trim();

  if (normalizedLang === 'en') {
    return res.json({
      success: true,
      lang: 'en',
      data: ENGLISH_CONTENT,
    });
  }

  // Idioma por defecto o español
  return res.json({
    success: true,
    lang: 'es',
    data: SPANISH_CONTENT,
  });
});

// Endpoint para catálogo de residencias
app.get('/api/residences', (req: Request, res: Response) => {
  const lang = ((req.query.lang as string) || 'es').toLowerCase().trim();
  const category = (req.query.category as string)?.toLowerCase().trim();

  const source = lang === 'en' ? RESIDENCES_EN : RESIDENCES_ES;
  const filtered = category && category !== 'all'
    ? source.filter((r) => r.category === category)
    : source;

  return res.json({
    success: true,
    lang: lang === 'en' ? 'en' : 'es',
    count: filtered.length,
    data: filtered,
  });
});

// Endpoint para obtener una residencia individual
app.get('/api/residences/:id', (req: Request, res: Response) => {
  const lang = ((req.query.lang as string) || 'es').toLowerCase().trim();
  const residenceId = req.params.id;

  const source = lang === 'en' ? RESIDENCES_EN : RESIDENCES_ES;
  const residence = source.find((r) => r.id === residenceId);

  if (!residence) {
    return res.status(404).json({
      success: false,
      error: `Residencia con ID '${residenceId}' no encontrada.`,
    });
  }

  return res.json({
    success: true,
    lang: lang === 'en' ? 'en' : 'es',
    data: residence,
  });
});

// Endpoint para catálogo de amenidades
app.get('/api/amenities', (req: Request, res: Response) => {
  const lang = ((req.query.lang as string) || 'es').toLowerCase().trim();
  const data = lang === 'en' ? AMENITIES_EN : AMENITIES_DATA;

  return res.json({
    success: true,
    lang: lang === 'en' ? 'en' : 'es',
    count: data.length,
    data,
  });
});

// Endpoint para estadísticas del proyecto
app.get('/api/stats', (req: Request, res: Response) => {
  const lang = ((req.query.lang as string) || 'es').toLowerCase().trim();
  const data = lang === 'en' ? STATS_EN : STATS_DATA;

  return res.json({
    success: true,
    lang: lang === 'en' ? 'en' : 'es',
    count: data.length,
    data,
  });
});

// Endpoint para puntos de ubicación geográfica
app.get('/api/locations', (req: Request, res: Response) => {
  const lang = ((req.query.lang as string) || 'es').toLowerCase().trim();
  const data = lang === 'en' ? LOCATION_POINTS_EN : LOCATION_POINTS_DATA;

  return res.json({
    success: true,
    lang: lang === 'en' ? 'en' : 'es',
    count: data.length,
    data,
  });
});

// Endpoint para datos financieros de la calculadora de inversión
app.get('/api/calculator/residences', (req: Request, res: Response) => {
  const lang = ((req.query.lang as string) || 'es').toLowerCase().trim();
  const source = lang === 'en' ? RESIDENCES_EN : RESIDENCES_ES;

  const data = source.map((r) => ({
    id: r.id,
    name: r.name,
    categoryLabel: r.categoryLabel,
    priceUSD: r.priceUSD,
    deliveryMonths: r.deliveryMonths,
  }));

  return res.json({
    success: true,
    lang: lang === 'en' ? 'en' : 'es',
    count: data.length,
    data,
  });
});

import fs from 'fs';
import path from 'path';

const isVercel = process.env.VERCEL === '1' || Boolean(process.env.NOW_REGION);
const INQUIRIES_FILE = isVercel
  ? path.join('/tmp', 'inquiries.json')
  : path.join(process.cwd(), 'server', 'inquiries.json');

// Cargar consultas previas desde disco si existen
try {
  if (fs.existsSync(INQUIRIES_FILE)) {
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      INQUIRIES_STORE.push(...parsed);
    }
  }
} catch (e) {
  console.warn('[Ohana Backend] No se pudo leer inquiries.json existente:', e);
}

// Endpoint para recepción de citas/inquiries confidenciales
app.post('/api/contact/inquiry', (req: Request, res: Response) => {
  const { name, email, phone, typology, message, privacyAccepted, lang } = req.body;
  const userLang = (lang || (req.query.lang as string) || 'es').toLowerCase().trim();

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: userLang === 'en' 
        ? 'Full legal name and email address are required.' 
        : 'Nombre y correo electrónico son obligatorios.',
    });
  }

  if (phone) {
    const phoneDigits = String(phone).replace(/\D/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 16) {
      return res.status(400).json({
        success: false,
        error: userLang === 'en'
          ? 'Please provide a valid telephone number.'
          : 'Por favor proporcione un número de teléfono válido.',
      });
    }
  }

  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const confirmationCode = `OBH-${randomNum}`;

  const typologyLabels: Record<string, { es: string; en: string }> = {
    garden: { es: 'Garden Villa Alborada', en: 'Garden Villa Alborada' },
    ocean: { es: 'Oceanfront Coral Residence', en: 'Oceanfront Coral Residence' },
    penthouse: { es: 'Sky Penthouse Mirador', en: 'Sky Penthouse Mirador' },
    estate: { es: 'Cliffside Signature Estate', en: 'Cliffside Signature Estate' },
  };

  const typologyKey = typology || 'garden';
  const typologyName = (typologyLabels[typologyKey] && typologyLabels[typologyKey][userLang === 'en' ? 'en' : 'es']) || 'Ohana Private Collection';

  const inquiryRecord: StoredInquiry = {
    id: `inq_${Date.now()}`,
    confirmationCode,
    name: name.trim(),
    email: email.trim(),
    phone: (phone || '').trim(),
    typology: typologyKey,
    message: (message || '').trim(),
    privacyAccepted: Boolean(privacyAccepted),
    receivedAt: new Date().toISOString(),
  };

  INQUIRIES_STORE.push(inquiryRecord);

  // Persistir en disco
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(INQUIRIES_STORE, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Ohana Backend] Error al guardar inquiries.json en disco:', err);
  }

  const realMessage = userLang === 'en'
    ? `Dear ${inquiryRecord.name}, your confidential inquiry for "${typologyName}" has been successfully recorded in our private office registry with folio ${confirmationCode}. A senior wealth manager will contact you at ${inquiryRecord.email}${inquiryRecord.phone ? ` or ${inquiryRecord.phone}` : ''} within 2 hours to coordinate your exclusive viewing.`
    : `Estimado/a ${inquiryRecord.name}, su solicitud confidencial para "${typologyName}" ha sido registrada satisfactoriamente en el registro privado con el folio ${confirmationCode}. Un director patrimonial senior se comunicará a ${inquiryRecord.email}${inquiryRecord.phone ? ` o al teléfono ${inquiryRecord.phone}` : ''} en menos de 2 horas para coordinar su visita privada.`;

  return res.json({
    success: true,
    confirmationCode,
    receivedAt: inquiryRecord.receivedAt,
    message: realMessage,
    details: {
      name: inquiryRecord.name,
      email: inquiryRecord.email,
      phone: inquiryRecord.phone,
      typology: inquiryRecord.typology,
      typologyName,
    },
  });
});

// Endpoint de auditoría para consultar prospectos recibidos
app.get('/api/inquiries', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    total: INQUIRIES_STORE.length,
    data: INQUIRIES_STORE,
  });
});

// Iniciar servidor local si no está en entorno serverless
if (process.env.VERCEL !== '1' && !process.env.NOW_REGION) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Ohana Backend] Servidor de API activo en http://localhost:${PORT}`);
    console.log(`[Ohana Backend] Endpoint Salud:       http://localhost:${PORT}/api/health`);
    console.log(`[Ohana Backend] Endpoint Residencias: http://localhost:${PORT}/api/residences`);
    console.log(`[Ohana Backend] Endpoint Amenidades:  http://localhost:${PORT}/api/amenities`);
    console.log(`[Ohana Backend] Endpoint Ubicación:   http://localhost:${PORT}/api/locations`);
    console.log(`[Ohana Backend] Endpoint Calculadora: http://localhost:${PORT}/api/calculator/residences`);
  });
}

export default app;

import jsPDF from 'jspdf';
import { Residence } from '../types';

/**
 * Generador editorial de Dossier Técnico en PDF para Ohana Beach House.
 * Utiliza jsPDF para maquetar un documento corporativo de ultra-lujo en memoria
 * y descargarlo directamente en el navegador del usuario.
 */
export const generateDossierPdf = (residence: Residence): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // 1. Franja Superior de Marca (Azul Marino Oscuro Ohana #0f1c2c)
  doc.setFillColor(15, 28, 44);
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Logotipo y nombre corporativo
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(254, 222, 178); // Dorado cálido #fedeb2
  doc.text('OHANA BEACH HOUSE', pageWidth / 2, 17, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(214, 228, 249);
  doc.text('DOSSIER TÉCNICO ARQUITECTÓNICO & MEMORIA DE CALIDADES', pageWidth / 2, 25, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setTextColor(186, 200, 220);
  doc.text('DOCUMENTO PRIVADO Y CONFIDENCIAL · EMISIÓN 2025', pageWidth / 2, 32, { align: 'center' });

  // 2. Encabezado de la Residencia
  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(27, 28, 26);
  doc.text(residence.name, 20, 54);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(114, 91, 56); // Acento café/dorado #725b38
  doc.text(`COLECCIÓN: ${residence.categoryLabel.toUpperCase()}  |  REF: OBH-${residence.category.toUpperCase()}-01`, 20, 61);

  // Precio e Inversión a la derecha
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('INVERSIÓN ESTIMADA', pageWidth - 20, 52, { align: 'right' });

  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 28, 44);
  doc.text(residence.price, pageWidth - 20, 60, { align: 'right' });

  // Línea divisoria elegante
  doc.setDrawColor(226, 220, 210);
  doc.setLineWidth(0.5);
  doc.line(20, 66, pageWidth - 20, 66);

  // 3. Descripción Editorial
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(68, 71, 76);
  const splitDescription = doc.splitTextToSize(residence.description, pageWidth - 40);
  doc.text(splitDescription, 20, 74);

  const descHeight = splitDescription.length * 5;
  let currentY = 76 + descHeight;

  // 4. Tabla de Dimensiones y Especificaciones Técnicas
  doc.setFillColor(245, 243, 240); // Fondo crema suave
  doc.rect(20, currentY, pageWidth - 40, 48, 'F');
  doc.setDrawColor(226, 220, 210);
  doc.rect(20, currentY, pageWidth - 40, 48, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(114, 91, 56);
  doc.text('FICHA TÉCNICA DEL ESPACIO', 25, currentY + 8);

  const specsGrid = [
    ['Superficie Cubierta:', residence.coveredArea, 'Nivel / Planta:', residence.level],
    ['Terrazas & Exterior:', residence.terraceArea, 'Orientación Solar:', residence.orientation],
    ['Dormitorios en Suite:', `${residence.suites} Suites`, 'Aparcamiento:', residence.parking],
    ['Baños Completos:', `${residence.bathrooms} Baños`, 'Zona Almacenaje:', residence.storage],
  ];

  let specY = currentY + 16;
  specsGrid.forEach((row) => {
    // Columna 1
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(68, 71, 76);
    doc.text(row[0], 25, specY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(27, 28, 26);
    doc.text(row[1], 60, specY);

    // Columna 2
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(68, 71, 76);
    doc.text(row[2], 105, specY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(27, 28, 26);
    doc.text(row[3], 142, specY);

    specY += 7;
  });

  currentY += 56;

  // 5. Puntos Destacados de Arquitectura
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(114, 91, 56);
  doc.text('PUNTOS DESTACADOS DE ARQUITECTURA', 20, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(68, 71, 76);

  residence.highlights.forEach((item) => {
    doc.text(`[+]  ${item}`, 24, currentY);
    currentY += 6;
  });

  currentY += 4;

  // 6. Resumen de Memoria de Calidades
  doc.setFillColor(251, 249, 246);
  doc.rect(20, currentY, pageWidth - 40, 52, 'F');
  doc.setDrawColor(226, 220, 210);
  doc.rect(20, currentY, pageWidth - 40, 52, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(114, 91, 56);
  doc.text('MEMORIA DE CALIDADES & ACABADOS', 25, currentY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(68, 71, 76);

  const finishes = [
    '• Pavimentos: Mármol Travertino Navona (120x120cm) pulido mate interior y antideslizante al ácido en exteriores.',
    '• Cerramientos: Carpintería Schüco con rotura de puente térmico y perfilería oculta empotrada a ras de suelo.',
    '• Climatización: Suelo radiante y refrescante con sistema geotérmico de alta eficiencia Daikin VRV.',
    '• Purificación: Filtros de plasma frío con renovación forzada de aire continuo en todas las estancias.',
    '• Certificación Sostenible: Cumplimiento de estándar LEED Platinum Residential y máxima calificación A.',
  ];

  let finishY = currentY + 16;
  finishes.forEach((fin) => {
    const splitFin = doc.splitTextToSize(fin, pageWidth - 50);
    doc.text(splitFin, 25, finishY);
    finishY += splitFin.length * 4.5 + 1.5;
  });

  // 7. Pie de Página y Firma de Validez
  const footerY = pageHeight - 16;
  doc.setDrawColor(226, 220, 210);
  doc.line(20, footerY - 4, pageWidth - 20, footerY - 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(116, 119, 125);
  doc.text('Ohana Beach House · Oficina Privada de Inversiones · Tel: +34 900 882 100 · concierge@ohanabeachhouse.com', 20, footerY);

  const dateStr = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.text(`Fecha de Emisión: ${dateStr}`, pageWidth - 20, footerY, { align: 'right' });

  // 8. Descarga automática directa del archivo
  const safeName = residence.name.replace(/\s+/g, '_').toLowerCase();
  doc.save(`Dossier_Ohana_${safeName}.pdf`);
};

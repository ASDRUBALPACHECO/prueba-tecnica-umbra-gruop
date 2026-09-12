import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ApiService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import './Contacto.css';

interface ContactoProps {
  preselectedTypology?: string;
}

export const Contacto: React.FC<ContactoProps> = ({ preselectedTypology }) => {
  const { content, language } = useLanguage();
  const contactoText = content.contacto;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    typology: 'garden',
    message: '',
    privacyAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessState, setIsSuccessState] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [serverRealMessage, setServerRealMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (preselectedTypology) {
      if (preselectedTypology.includes('Garden')) {
        setFormData((prev) => ({ ...prev, typology: 'garden' }));
      } else if (preselectedTypology.includes('Coral') || preselectedTypology.includes('Oceanfront')) {
        setFormData((prev) => ({ ...prev, typology: 'ocean' }));
      } else if (preselectedTypology.includes('Penthouse') || preselectedTypology.includes('Mirador')) {
        setFormData((prev) => ({ ...prev, typology: 'penthouse' }));
      } else if (preselectedTypology.includes('Cliffside') || preselectedTypology.includes('Estate')) {
        setFormData((prev) => ({ ...prev, typology: 'estate' }));
      }
    }
  }, [preselectedTypology]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAccepted) return;

    // Validación estricta: el teléfono solo debe contener números válidos
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setSubmitError(
        language === 'en'
          ? 'Please enter a valid telephone number (between 7 and 15 digits).'
          : 'Por favor, ingrese un número de teléfono válido (entre 7 y 15 dígitos).'
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await ApiService.submitInquiry({
        ...formData,
        lang: language,
      });
      setIsSubmitting(false);
      setIsSuccessState(true);
      setConfirmationCode(result.confirmationCode);
      if (result.message) {
        setServerRealMessage(result.message);
      }
      setShowToast(true);

      setTimeout(() => {
        setIsSubmitted(true);
      }, 700);
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(err?.message || (language === 'en' ? 'An error occurred while processing your request.' : 'Ocurrió un error al procesar su solicitud.'));
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setIsSuccessState(false);
    setShowToast(false);
    setServerRealMessage('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      typology: 'garden',
      message: '',
      privacyAccepted: false,
    });
  };

  // Restricción estricta: solo números de teléfono
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permitir teclas de navegación y edición estándar
    if (
      [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
      ].includes(e.key) ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }

    // Permitir '+' únicamente al inicio del campo
    if (e.key === '+') {
      const input = e.currentTarget;
      if (input.selectionStart === 0 && !input.value.includes('+')) {
        return;
      }
      e.preventDefault();
      return;
    }

    // Permitir dígitos 0-9, espacios o guiones
    if (/[\d\s-]/.test(e.key)) {
      return;
    }

    // Bloquear cualquier letra u otro símbolo
    e.preventDefault();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const hasLeadingPlus = raw.startsWith('+');
    // Filtrar cualquier carácter que no sea número, espacio o guión
    const digitsOnly = raw.replace(/[^\d\s-]/g, '');
    const cleanPhone = (hasLeadingPlus ? '+' : '') + digitsOnly.replace(/^\+/, '');
    setFormData((prev) => ({ ...prev, phone: cleanPhone }));
  };

  return (
    <section id="contacto" className="contacto-section">
      <div className="contacto-inner-container">
        {/* Cabecera de la sección Contacto */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="contacto-header"
        >
          <span className="contacto-eyebrow">
            {contactoText.eyebrow}
          </span>
          <h2 className="contacto-title">
            {contactoText.title}
          </h2>
          <p className="contacto-description">
            {contactoText.description}
          </p>
        </motion.div>

        {/* Tarjeta del formulario o comprobante de confirmación */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 35 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {!isSubmitted ? (
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="contacto-form-card"
            >
              <div className="form-fields-row">
                <div className="form-field-group">
                  <label
                    htmlFor="name"
                    className="form-field-label"
                  >
                    {contactoText.fullNameLabel} *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="p. ej. María Elena de la Vega"
                    className="form-input-text"
                  />
                </div>

                <div className="form-field-group">
                  <label
                    htmlFor="email"
                    className="form-field-label"
                  >
                    {contactoText.emailLabel} *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="melena@investment.com"
                    className="form-input-text"
                  />
                </div>
              </div>

              <div className="form-fields-row">
                <div className="form-field-group">
                  <label
                    htmlFor="phone"
                    className="form-field-label"
                  >
                    {contactoText.phoneLabel} *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onKeyDown={handlePhoneKeyDown}
                    onChange={handlePhoneChange}
                    placeholder="+34 612 345 678"
                    className="form-input-text"
                  />
                </div>

                <div className="form-field-group">
                  <label
                    htmlFor="typology-interest"
                    className="form-field-label"
                  >
                    {contactoText.typologyLabel}
                  </label>
                  <select
                    id="typology-interest"
                    value={formData.typology}
                    onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
                    className="form-select-dropdown"
                  >
                    <option value="garden">Garden Villa (350 m²)</option>
                    <option value="ocean">Oceanfront Residence (440 m²)</option>
                    <option value="penthouse">Sky Penthouse (680 m²)</option>
                    <option value="estate">Cliffside Signature Estate (540 m²)</option>
                    <option value="multiple">Portafolio / Múltiples Unidades</option>
                  </select>
                </div>
              </div>

              <div className="form-field-group">
                <label
                  htmlFor="message"
                  className="form-field-label"
                >
                  {contactoText.messageLabel}
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Deseo coordinar una visita presencial con traslado en helicóptero..."
                  className="form-textarea-box"
                />
              </div>

              {/* Checkbox de confidencialidad */}
              <div className="form-privacy-group">
                <input
                  id="privacy"
                  type="checkbox"
                  required
                  checked={formData.privacyAccepted}
                  onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                  className="form-privacy-checkbox"
                />
                <label
                  htmlFor="privacy"
                  className="form-privacy-label"
                >
                  {contactoText.privacyLabel}
                </label>
              </div>

              {submitError && (
                <div className="p-3 bg-red-900/20 border border-red-500/40 text-red-700 text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  <span>{submitError}</span>
                </div>
              )}

              {/* Botón de envío de solicitud */}
              <button
                id="submit-btn"
                type="submit"
                disabled={isSubmitting || isSuccessState}
                className={`form-submit-btn ${
                  isSuccessState
                    ? 'form-submit-btn-success'
                    : isSubmitting
                    ? 'form-submit-btn-loading'
                    : ''
                }`}
              >
                {isSuccessState ? (
                  <>
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>{contactoText.successTitle}</span>
                  </>
                ) : isSubmitting ? (
                  <>
                    <span className="submit-spinner" />
                    <span>{contactoText.submittingButton}</span>
                  </>
                ) : (
                  <span>{contactoText.submitButton}</span>
                )}
              </button>
            </form>
          ) : (
            /* Tarjeta de Recibo de Éxito */
            <div
              id="form-success"
              className="form-success-card animate-fadeIn"
            >
              <div className="form-success-icon-badge">
                <span className="material-symbols-outlined text-[36px]">verified</span>
              </div>

              <span className="form-success-eyebrow">
                {contactoText.successEyebrow || 'Solicitud Registrada Exitosamente'}
              </span>

              <h3 className="form-success-title">
                {contactoText.successCardTitle || 'Cita Privada en Gestión'}
              </h3>

              <p className="form-success-message">
                {serverRealMessage || contactoText.successMessage}
              </p>

              <div className="form-success-receipt">
                <div className="form-success-receipt-row form-success-receipt-divider">
                  <span className="form-success-receipt-label">{contactoText.receiptFolio || 'Código de Folio:'}</span>
                  <span className="font-mono font-bold text-sm">{confirmationCode}</span>
                </div>
                <div className="form-success-receipt-row form-success-receipt-divider">
                  <span className="form-success-receipt-label">{contactoText.receiptClient || 'Titular:'}</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="form-success-receipt-row">
                  <span className="form-success-receipt-label">{contactoText.receiptInterest || 'Interés:'}</span>
                  <span className="font-medium">
                    {formData.typology === 'garden'
                      ? 'Garden Villa'
                      : formData.typology === 'ocean'
                      ? 'Oceanfront Residence'
                      : formData.typology === 'penthouse'
                      ? 'Sky Penthouse'
                      : formData.typology === 'estate'
                      ? 'Cliffside Signature Estate'
                      : (language === 'en' ? 'Portfolio / Multiple Units' : 'Portafolio / Múltiples Unidades')}
                  </span>
                </div>
              </div>

              <button
                onClick={resetForm}
                className="form-success-reset-btn"
              >
                {contactoText.receiptReset || 'Realizar Otra Consulta'}
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Notificación Toast flotante de confirmación */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="contacto-floating-toast"
          >
            <div className="contacto-toast-icon-box">
              <span className="material-symbols-outlined text-[18px] text-[#fedeb2]">check</span>
            </div>
            <div className="contacto-toast-content">
              <p className="font-semibold text-sm text-[#fedeb2] m-0">
                {contactoText.successTitle || 'Solicitud Confirmada'}
              </p>
              <p className="text-[#e4e2df] font-light m-0">
                {contactoText.receiptFolio?.replace(':', '') || 'Folio'}: {confirmationCode}
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="contacto-toast-close-btn"
              aria-label={language === 'en' ? 'Close notification' : 'Cerrar notificación'}
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

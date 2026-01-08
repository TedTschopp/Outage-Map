/**
 * i18n (Internationalization) Utility
 * 
 * Simple dictionary-based translation system.
 * Ready to be extended with additional languages.
 */

type Language = 'en' | 'es'; // Add more languages as needed

interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  en: {
    'app.title': 'Outage Map',
    'app.loading': 'Loading...',
    'location.requesting': 'Requesting location permission...',
    'location.error': 'Unable to get your location. Please enable location services.',
    'location.denied': 'Location permission denied. Please enable location access to use this app.',
    'map.centerOnLocation': 'Center on my location',
    'outage.detected': 'Outage Detected',
    'outage.noOutage': 'No Outage Detected',
    'outage.checking': 'Checking outage status...',
    'outage.estimatedRestore': 'Estimated Restore',
    'outage.affectedCustomers': 'Affected Customers',
    'outage.outageId': 'Outage ID',
    'notifications.enable': 'Enable Notifications',
    'notifications.disable': 'Disable Notifications',
    'notifications.status': 'Notification Status',
    'notifications.enabled': 'Enabled',
    'notifications.disabled': 'Disabled',
    'notifications.notSupported': 'Push notifications are not supported in your browser',
    'notifications.permission': 'Permission',
    'notifications.granted': 'Granted',
    'notifications.denied': 'Denied',
    'notifications.default': 'Not yet requested',
    'notifications.selectAdvanceNotice': 'Get notified before outages',
    'notifications.advanceNotice.12': '12 hours in advance',
    'notifications.advanceNotice.24': '24 hours in advance',
    'notifications.advanceNotice.36': '36 hours in advance',
    'notifications.advanceNotice.48': '48 hours in advance',
    'notifications.advanceNotice.72': '72 hours in advance',
  },
  es: {
    // Spanish translations (placeholder - can be expanded)
    'app.title': 'Mapa de Interrupciones',
    'app.loading': 'Cargando...',
    'location.requesting': 'Solicitando permiso de ubicación...',
    'location.error': 'No se puede obtener su ubicación. Habilite los servicios de ubicación.',
    'location.denied': 'Permiso de ubicación denegado. Habilite el acceso a la ubicación para usar esta aplicación.',
    'outage.detected': 'Interrupción Detectada',
    'outage.noOutage': 'Sin Interrupciones',
    'outage.checking': 'Verificando estado de interrupción...',
    'notifications.enable': 'Habilitar Notificaciones',
    'notifications.disable': 'Deshabilitar Notificaciones',
    'notifications.status': 'Estado de Notificaciones',
    'notifications.enabled': 'Habilitadas',
    'notifications.disabled': 'Deshabilitadas',
  },
};

class I18nService {
  private currentLanguage: Language = 'en';

  constructor() {
    // Auto-detect language from browser
    this.detectLanguage();
  }

  /**
   * Detect language from browser settings
   */
  private detectLanguage(): void {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es') {
      this.currentLanguage = 'es';
    } else {
      this.currentLanguage = 'en';
    }
  }

  /**
   * Get current language
   */
  getLanguage(): Language {
    return this.currentLanguage;
  }

  /**
   * Set language
   */
  setLanguage(lang: Language): void {
    this.currentLanguage = lang;
  }

  /**
   * Translate a key
   */
  t(key: string): string {
    const translation = translations[this.currentLanguage][key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in language: ${this.currentLanguage}`);
      return key;
    }
    return translation;
  }
}

// Export singleton instance
export const i18n = new I18nService();

// Export hook for React components
export const useTranslation = () => {
  return {
    t: (key: string) => i18n.t(key),
    language: i18n.getLanguage(),
    setLanguage: (lang: Language) => i18n.setLanguage(lang),
  };
};

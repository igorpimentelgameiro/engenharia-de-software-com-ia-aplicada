export class TranslationService {
    constructor() {
        this.translator = null;
        this.languageDetector = null;
    }

    async checkRequirements() {
        const errors = [];

        if (!('Translator' in self)) {
            errors.push('⚠️ A API de Tradução não está ativa.');
        }

        if (!('LanguageDetector' in self)) {
            errors.push('⚠️ A API de Detecção de Idioma não está ativa.');
        }

        if (errors.length > 0) {
            return errors;
        }

        try {
            const [translatorAvailability, detectorAvailability] = await Promise.all([
                Translator.availability({
                    sourceLanguage: 'en',
                    targetLanguage: 'pt',
                }),
                LanguageDetector.availability(),
            ]);

            console.log('Translator Availability:', translatorAvailability);
            console.log('Language Detector Availability:', detectorAvailability);

            if (translatorAvailability === 'unavailable' || translatorAvailability === 'no') {
                errors.push('⚠️ Tradução de inglês para português não está disponível.');
            }

            if (detectorAvailability === 'unavailable' || detectorAvailability === 'no') {
                errors.push('⚠️ A detecção de idioma não está disponível.');
            }
        } catch (error) {
            console.error('Error checking translation APIs:', error);
            errors.push(`⚠️ Não foi possível consultar as APIs de tradução: ${error.message}`);
        }

        return errors;
    }

    async initialize(onProgress = () => {}) {
        try {
            // Start both creations while the click's user activation is still active.
            const translatorPromise = Translator.create({
                sourceLanguage: 'en',
                targetLanguage: 'pt',
                monitor(m) {
                    m.addEventListener('downloadprogress', (event) => {
                        const percent = Math.round(event.loaded * 100);
                        console.log(`Translator downloaded ${percent}%`);
                        onProgress(`Tradutor inglês → português: ${percent}%`);
                    });
                }
            });

            const detectorPromise = LanguageDetector.create({
                monitor(m) {
                    m.addEventListener('downloadprogress', (event) => {
                        const percent = Math.round(event.loaded * 100);
                        console.log(`Language Detector downloaded ${percent}%`);
                        onProgress(`Detector de idioma: ${percent}%`);
                    });
                },
            });

            [this.translator, this.languageDetector] = await Promise.all([
                translatorPromise,
                detectorPromise,
            ]);

            console.log('Translation services initialized');

            return true;
        } catch (error) {
            console.error('Error initializing translation:', error);
            throw new Error(`⚠️ Erro ao inicializar APIs de tradução: ${error.message}`, {
                cause: error,
            });
        }
    }

    async translateToPortuguese(text) {
        if (!this.translator) {
            console.warn('Translator not available, returning original text');
            return text;
        }

        try {
            // Detect language first
            if (this.languageDetector) {
                const detectionResults = await this.languageDetector.detect(text);
                console.log('Detected languages:', detectionResults);

                // If already in Portuguese, no need to translate
                if (detectionResults && detectionResults[0]?.detectedLanguage === 'pt') {
                    console.log('Text is already in Portuguese');
                    return text;
                }
            }

            const translated = await this.translator.translate(text);
            console.log('Translated text:', translated);
            return translated;
        } catch (error) {
            console.error('Translation error:', error);
            return text; // Return original text if translation fails
        }
    }
}

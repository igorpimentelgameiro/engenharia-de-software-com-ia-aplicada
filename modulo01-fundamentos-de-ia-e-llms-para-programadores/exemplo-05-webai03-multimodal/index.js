import { AIService } from './services/aiService.js';
import { TranslationService } from './services/translationService.js';
import { View } from './views/view.js';
import { FormController } from './controllers/formController.js';

(async function main() {
    // Initialize services and view
    const aiService = new AIService();
    const translationService = new TranslationService();
    const view = new View();
    
    // Set current year
    view.setYear();

    view.setDemoEnabled(false);

    try {
        const [aiErrors, translationErrors] = await Promise.all([
            aiService.checkRequirements(),
            translationService.checkRequirements(),
        ]);
        const errors = [...aiErrors, ...translationErrors];

        if (errors.length > 0) {
            view.showError(errors);
            view.showActivationUnavailable();
            return;
        }

        view.showActivationReady();
        view.onActivate(async () => {
            view.showActivationLoading('Preparando os modelos...');

            try {
                // Each create() starts directly from this click handler.
                await Promise.all([
                    aiService.initialize((message) => view.updateActivationProgress(message)),
                    translationService.initialize((message) => view.updateActivationProgress(message)),
                ]);

                const params = await aiService.getParams();
                view.initializeParameters(params);

                const controller = new FormController(aiService, translationService, view);
                controller.setupEventListeners();

                view.setDemoEnabled(true);
                view.showActivationComplete();
                console.log('Application initialized successfully');
            } catch (error) {
                console.error('Error activating Web AI:', error);
                view.showActivationError(error.message);
            }
        });
    } catch (error) {
        console.error('Error checking Web AI requirements:', error);
        view.showError([`⚠️ Erro ao verificar as APIs: ${error.message}`]);
        view.showActivationUnavailable();
    }
})();
